from sympy import Basic, Eq, Max, Min, Not, false, simplify, true, Expr
from sympy.logic.boolalg import Boolean
from sympy.core.relational import (
    GreaterThan,
    LessThan,
    Rel,
    Relational,
    StrictGreaterThan,
    StrictLessThan,
)
from sympy.core.sympify import sympify

from estimates.basic import Type, new_var, typeof
from estimates.order_of_magnitude import OrderMax, OrderMin, Theta
from estimates.proofstate import ProofState
from estimates.tactic import Tactic
from estimates.test import test
from estimates.bounded import is_fixed, is_bounded

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

    if isinstance(goal, Theta):
        if is_fixed(goal.args[0], hypotheses):
            return Theta(1) # Theta of a fixed quantity is Theta(1)
        elif is_bounded(goal.args[0], hypotheses) and goal.args[0].is_integer:
            return Theta(1) # Theta of a bounded integer is Theta(1)

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

    # TODO: makeSimpliestGoal is recursive also, may be merged with rsimp
    new_goal = makeSimpliestGoal(new_goal, hypotheses)

    new_goal = rsimp(new_goal, hypotheses, use_sympy)

    if Eq(new_goal, goal) is not true:
        print(f"Simplified {goal} to {new_goal} using {hypotheses}.")
    return new_goal

def makeSimpliestGoal(goal, hypotheses):
    new_goal = goal
    for hyp in hypotheses:
        if isinstance(hyp,Boolean):
            # If a hypothesis is a boolean, we can use it to simplify the goal further.
            new_goal = new_goal.subs(hyp, True)
            if isinstance(hyp, Not):
                new_goal = new_goal.subs(hyp.args[0], False)
    if new_goal != goal:
        return makeSimpliestGoal(new_goal, hypotheses)
    else:
        return goal

class SimpAll(Tactic):
    """
    Simplifies each hypothesis using other hypotheses, then the goal using the hypothesis.
    """

    def __init__(self, use_sympy:bool = False, repeat:bool = False) -> None:
        self.use_sympy = use_sympy
        self.repeat = repeat

    def activate(self, state: ProofState) -> list[ProofState]:
        newstate = state.copy()

        while True:
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
            
            if not self.repeat:
                break

            if newstate.eq(state):
                break  # if repeat is True, we keep simplifying until the goal stabilizes
    
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


class Calc(Tactic):
    """
    Splits an inequality goal into two or more subgoals, which chain together to recover the main goal.
    """

    relations : list[str]   # The list of relation operators ("<=", "==", etc.) used in the calc block
    terms : list[Expr]      # The list of terms used in the calc block
    name : str              # The name of the tactic call

    def __init__(self, *args: str|Expr) -> None:
        """
        Initialize a calc block with an alternating list of terms and relations.  For instance, 
        `Calc("<=", y, "<", "z", "==")` would convert a goal `x <= w` to three subgoals `x <= y`, `y < z`, and `z == w`. 
        """
        if len(args) % 2 == 0:
            raise ValueError("Calc block must have an odd number of arguments.")
        self.relations = []
        self.terms = []
        self.name = "calc _"

        for n in range(len(args)):
            if n % 2 == 0:   # this is a relation operator
                assert isinstance(args[n], str), f"Argument {args[n]} must be a string."
                assert args[n] in {"<=", "<", "==", ">=", ">", "!="}, f"Argument {args[n]} must be one of <, <=, >, >=, ==, !=."
                self.relations.append(args[n])
                self.name += " " + args[n]
            else:  # this is a term
                arg = sympify(args[n])
                assert isinstance(arg, Expr), f"Argument {arg} must be a sympy expression."
                self.terms.append(arg)
                self.name += " " + str(arg)
        self.name += " _"

    def activate(self, state: ProofState) -> list[ProofState]:
        """
        Activate the calc block.  This will split the goal into subgoals.
        """
        goal = state.goal
        assert isinstance(goal, Relational), f"Goal {goal} is not a relational expression."

        outcomes = set()
        # create the set of desirable outcomes (-1 is "less than", 0 is "equal to", 1 is "greater than")
        match goal.rel_op:
            case "<":
                outcomes = {-1}
            case "<=":
                outcomes = {0, -1}
            case ">":
                outcomes = {1}
            case ">=":
                outcomes = {0, 1}
            case "==":
                outcomes = {0}
            case "!=":
                outcomes = {-1, 1}

        # now, create the set of actual possible outcomes coming from iterating through the calc block
        actual_outcomes = {0}
        for n in range(len(self.relations)):
            new_outcomes = set()
            for outcome in actual_outcomes:
                match self.relations[n]:
                    case "<":
                        match outcome:
                            case -1:
                                new_outcomes.update({-1})
                            case 0:
                                new_outcomes.update({-1})
                            case 1:
                                new_outcomes.update({-1,0,1})
                    case "<=":
                        match outcome:
                            case -1:
                                new_outcomes.update({-1})
                            case 0:
                                new_outcomes.update({-1,0})
                            case 1:
                                new_outcomes.update({-1,0,1})
                    case ">":
                        match outcome:
                            case -1:
                                new_outcomes.update({-1,0,1})
                            case 0:
                                new_outcomes.update({1})
                            case 1:
                                new_outcomes.update({1})
                    case ">=":
                        match outcome:
                            case -1:
                                new_outcomes.update({-1,0,1})
                            case 0:
                                new_outcomes.update({0,1})
                            case 1:
                                new_outcomes.update({1})
                    case "==":
                        new_outcomes.add(outcome)
                    case "!=":
                        match outcome:
                            case -1:
                                new_outcomes.update({-1,0,1})
                            case 0:
                                new_outcomes.update({-1,1})
                            case 1:
                                new_outcomes.update({-1,0,1})
            actual_outcomes = new_outcomes

        assert actual_outcomes.issubset(outcomes), f"Calc block {self.name} will not imply the goal {goal}."

        # now, create the new goals
        new_states = []
        lhs = goal.args[0]
        goals = []
        for n in range(len(self.relations)):
            if n < len(self.terms):
                rhs = self.terms[n]
            else:
                rhs = goal.args[1]
            new_state = state.copy()
            new_state.set_goal(Rel(lhs, rhs, self.relations[n]))
            new_states.append(new_state)
            lhs = rhs
            goals.append(new_state.goal)
        if len(self.relations) == 1:
            if new_states[0].goal == goal:
                print(f"No change to goal.")
            else:
                print(f"Goal strengthened to {new_states[0].goal}.")
        else:
            print(f"Split into goals " + ", ".join([str(g) for g in goals]) + ".")
        return new_states

    def __str__(self) -> str:
        return self.name

                