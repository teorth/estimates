from sympy import Basic, Eq, Max, Min, Not, false, simplify, true
from sympy.logic.boolalg import Boolean
from sympy.core.relational import (
    GreaterThan,
    LessThan,
    Rel,
    Relational,
    StrictGreaterThan,
    StrictLessThan,
)

from estimates.basic import Type, new_var, typeof
from estimates.order_of_magnitude import OrderMax, OrderMin
from estimates.proofstate import ProofState
from estimates.tactic import Tactic
from estimates.test import test

#  The simplifier


def rsimp(goal: Basic, hypotheses: set[Basic] = set(), use_sympy = False) -> Basic:
    """
    Recursively simplifies the goal using a set of hypotheses.  If `use_sympy` is True, it uses sympy's simplifier."""

    new_args = [rsimp(arg, hypotheses) for arg in goal.args]

    if use_sympy:  # Use sympy's simplifier.  Note that this may have unwanted behavior.
        goal = simplify(goal)
        hypotheses = {simplify(hyp) for hyp in hypotheses}

    if goal in hypotheses:
        return true

    if Not(goal) in hypotheses:
        return false

    for hyp in hypotheses:
        if isinstance(goal, Relational) and isinstance(hyp, Relational):
            if goal.args[0] == hyp.args[0] and goal.args[1] == hyp.args[1]:
                s = 1
            elif goal.args[0] == hyp.args[1] and goal.args[1] == hyp.args[0]:
                s = -1
            else:
                s = 0
            if s != 0:
                sign = {
                    "<=": {0, 1},
                    "<": {1},
                    "==": {0},
                    ">=": {-1, 0},
                    ">": {-1},
                    "!=": {-1, 1},
                }
                goalset = sign[goal.rel_op]
                hypset = {s * i for i in sign[hyp.rel_op]}
                if hypset.issubset(goalset):  # hypothesis implies goal
                    return true
                elif hypset.isdisjoint(goalset):  # hypothesis contradicts goal
                    return false
                else:
                    goalset = goalset.intersection(hypset)
                    for rel, signset in sign.items():  # hypothesis refines goal
                        if goalset == signset:
                            return Rel(goal.args[0], goal.args[1], rel)

        if isinstance(hyp, LessThan | StrictLessThan | GreaterThan | StrictGreaterThan):
            if hyp.lts != hyp.gts and hyp.lts in goal.args and hyp.gts in goal.args:
                if isinstance(goal, Max | OrderMax):
                    # can remove a copy of hyp.lts
                    l = list(goal.args)
                    l.remove(hyp.lts)
                    return goal.func(*l)
                if isinstance(goal, Min | OrderMin):
                    # can remove a copy of hyp.gts
                    l = list(goal.args)
                    l.remove(hyp.gts)
                    return goal.func(*l)


    if goal.args == ():
        return goal
    else:
        return goal.func(*new_args).doit()


def simp(goal: Basic, hypotheses:set[Basic] = set(), use_sympy = False) -> Basic:
    """
    Simplifies the goal using the hypothesis.  If `use_sympy` is True, it uses sympy's simplifier.
    """

    if isinstance(goal, Type):
        # do not attempt to simplify variable declarations.  This is done by a separate tactic.
        return goal
    
    if goal == true or goal == false:
        return goal  # no need to simplify

    if use_sympy:
        new_goal = simplify(goal)
        hypotheses = {simplify(hyp) for hyp in hypotheses}
    else:
        new_goal = goal

    if test(hypotheses, new_goal):
        print(f"Simplified {goal} to True using {hypotheses}.")
        return true
    if test(hypotheses, Not(new_goal)):
        print(f"Simplified {goal} to False using {hypotheses}.")
        return false

    for hyp in hypotheses:
        if isinstance(hyp,Boolean):
            # If a hypothesis is a boolean, we can use it to simplify the goal further.
            new_goal = new_goal.subs(hyp, True)
            if isinstance(hyp, Not):
                new_goal = new_goal.subs(hyp.args[0], False)

    new_goal = rsimp(new_goal, hypotheses, use_sympy)

    if Eq(new_goal, goal) is not true:
        print(f"Simplified {goal} to {new_goal} using {hypotheses}.")
    return new_goal


class SimpAll(Tactic):
    """
    Simplifies each hypothesis using other hypotheses, then the goal using the hypothesis.
    """

    def __init__(self, use_sympy:bool = False) -> None:
        self.use_sympy = use_sympy


    def activate(self, state: ProofState) -> list[ProofState]:
        newstate = state.copy()
        for name, hyp in state.hypotheses.items():
            other_hypotheses = set()
            for other_name, other_hyp in newstate.hypotheses.items():
                if other_name != name:  # Cannot use a hypothesis to simplify itself!
                    other_hypotheses.add(other_hyp)
            hyp = simp(hyp, other_hypotheses, self.use_sympy)
            newstate.hypotheses[name] = hyp

            if hyp == true:
                newstate.remove_hypothesis(name)

            if hyp == false:
                print("Goal solved by _ex falso quodlibet_.")
                return []

        goal = newstate.goal
        goal = simp(goal, set(newstate.hypotheses.values()), self.use_sympy)
        newstate.set_goal(goal)

        if goal == true:
            print("Goal solved!")
            return []
        else:
            return [newstate]

    def __str__(self) -> str:
        return "simp_all"


class IsPositive(Tactic):
    """
    Makes a variable positive by searching for hypotheses that imply positivity.
    """

    def __init__(self, name: str | Basic = "this") -> None:
        self.name = name

    def activate(self, state: ProofState) -> list[ProofState]:
        if isinstance(self.name, str):
            name = self.name
            var = state.get_var(name)
        else:
            var = self.name
            name = state.get_var_name(var)
        if var.is_positive:
            print(f"{name} is already a positive type.")
            return [state.copy()]

        if not state.test(var > 0):
            print(f"Cannot prove {name} is positive.")
            return [state.copy()]

        if var.is_integer:
            newvar = new_var("pos_int", name)
        elif var.is_rational:
            newvar = new_var("pos_rat", name)
        elif var.is_real:
            newvar = new_var("pos_real", name)
        else:
            raise ValueError(
                f"INCONSISTENCY: {name}:{typeof} was somehow proven positive, which is impossible."
            )

        print(f"{name} is now of type {typeof(newvar)}.")
        newstate = state.copy()
        for other_name, other_var in state.hypotheses.items():
            if other_name == name:
                newstate.hypotheses[name] = Type(newvar)
            else:
                newstate.hypotheses[other_name] = other_var.subs(var, newvar)
        newstate.set_goal(state.goal.subs(var, newvar))

        if newstate.goal == true:
            print("Goal solved!")
            return []
        else:
            return [newstate]

    def __str__(self) -> str:
        return f"is_positive {self.name}"


class IsNonnegative(Tactic):
    """
    Makes a variable nonnegative by searching for hypotheses that imply nonnegativity.
    """

    def __init__(self, name: str | Basic = "this") -> None:
        self.name = name

    def activate(self, state: ProofState) -> list[ProofState]:
        if isinstance(self.name, str):
            name = self.name
            var = state.get_var(name)
        else:
            var = self.name
            name = state.get_var_name(var)
        if var.is_nonnegative:
            print(f"{name} is already a nonnegative type.")
            return [state.copy()]

        if not state.test(var >= 0):
            print(f"Cannot prove {name} is nonnegative.")
            return [state.copy()]

        if var.is_integer:
            newvar = new_var("nonneg_int", name)
        elif var.is_rational:
            newvar = new_var("nonneg_rat", name)
        elif var.is_real:
            newvar = new_var("nonneg_real", name)
        else:
            raise ValueError(
                f"INCONSISTENCY: {name}:{typeof} was somehow proven nonnegative, which is impossible."
            )

        print(f"{name} is now of type {typeof(newvar)}.")
        newstate = state.copy()
        for other_name, other_var in state.hypotheses.items():
            if other_name == name:
                newstate.hypotheses[name] = Type(newvar)
            else:
                newstate.hypotheses[other_name] = other_var.subs(var, newvar)
        newstate.set_goal(newstate.goal.subs(var, newvar))

        if newstate.goal == true:
            print("Goal solved!")
            return []
        else:
            return [newstate]

    def __str__(self) -> str:
        return f"is_nonnegative {self.name}"


class IsNonzero(Tactic):
    """
    Makes a variable nonzero by searching for hypotheses that imply nonvanishing.
    """

    def __init__(self, name: str | Basic = "this") -> None:
        self.name = name

    def activate(self, state: ProofState) -> list[ProofState]:
        if isinstance(self.name, str):
            name = self.name
            var = state.get_var(name)
        else:
            var = self.name
            name = state.get_var_name(var)
        if var.is_nonzero:
            print(f"{name} is already a nonzero type.")
            return [state.copy()]

        if not state.test(var != 0):
            print(f"Cannot prove {name} is nonzero.")
            return [state.copy()]

        if var.is_integer:
            newvar = new_var("nonzero_int", name)
        elif var.is_rational:
            newvar = new_var("nonzero_rat", name)
        elif var.is_real:
            newvar = new_var("nonzero_real", name)
        else:
            raise ValueError(
                f"INCONSISTENCY: {name}:{typeof} was somehow proven positive, which is impossible."
            )

        print(f"{name} is now of type {typeof(newvar)}.")
        newstate = state.copy()
        for other_name, other_var in state.hypotheses.items():
            if other_name == name:
                newstate.hypotheses[name] = Type(newvar)
            else:
                newstate.hypotheses[other_name] = other_var.subs(var, newvar)
        newstate.set_goal(newstate.goal.subs(var, newvar))

        if newstate.goal == true:
            print("Goal solved!")
            return []
        else:
            return [newstate]

    def __str__(self) -> str:
        return f"is_nonzero {self.name}"
