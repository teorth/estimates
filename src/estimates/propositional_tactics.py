from sympy import (
    GreaterThan,
    LessThan,
    Max,
    Min,
    StrictGreaterThan,
    StrictLessThan,
    false,
    simplify_logic,
)
from sympy.core.relational import Rel

from estimates.basic import *
from estimates.littlewood_paley import *
from estimates.order_of_magnitude import *
from estimates.proposition import *
from estimates.tactic import *
from estimates.test import *

# Various tactics for handling propositional logic.


def get_conjuncts(expr: Expr) -> list[Expr]:
    """
    Get the conjuncts of an expression (after unpacking), or None if no conjuncts found.
    """
    conjuncts = []
    if isinstance(expr, And):
        return expr.args
    elif isinstance(expr, Eq):
        if isinstance(expr.args[1], Max | OrderMax):
            # x = Max(y,z) can be split into x >= y, x >= z, and (x == y) | (x == z)
            disjuncts = []
            for arg in expr.args[1].args:
                conjuncts.append(expr.args[0] >= arg)
                disjuncts.append(Eq(expr.args[0], arg))
            conjuncts.append(Or(*disjuncts))
            return conjuncts
        elif isinstance(expr.args[1], Min | OrderMin):
            # x = Min(y,z) can be split into x <= y, x <= z, and (x == y) | (x == z)
            disjuncts = []
            for arg in expr.args[1].args:
                conjuncts.append(expr.args[0] <= arg)
                disjuncts.append(Eq(expr.args[0], arg))
            conjuncts.append(Or(*disjuncts))
            return conjuncts
    elif isinstance(expr, LessThan | StrictLessThan):
        if isinstance(expr.args[1], Min | OrderMin):
            # x < Min(y,z) can be split into x < y and x < z
            for arg in expr.args[1].args:
                conjuncts.append(Rel(expr.args[0], arg, expr.rel_op))
            return conjuncts
        elif isinstance(expr.args[0], Max | OrderMax):
            # Max(x,y) < z can be split into x < z and y < z
            for arg in expr.args[0].args:
                conjuncts.append(Rel(arg, expr.args[1], expr.rel_op))
            return conjuncts
    elif isinstance(expr, GreaterThan | StrictGreaterThan):
        if isinstance(expr.args[1], Max | OrderMax):
            # x > Max(y,z) can be split into x > y and x > z
            for arg in expr.args[1].args:
                conjuncts.append(Rel(expr.args[0], arg, expr.rel_op))
            return conjuncts
        elif isinstance(expr.args[0], Min | OrderMin):
            # Min(x,y) > z can be split into x > z and y > z
            for arg in expr.args[0].args:
                conjuncts.append(Rel(arg, expr.args[1], expr.rel_op))
            return conjuncts
    return None


def get_disjuncts(expr: Expr) -> list[Expr]:
    """
    Get the disjuncts of an expression (after unpacking), or None if no disjuncts found
    """
    disjuncts = []
    if isinstance(expr, Or):
        return expr.args
    elif isinstance(expr, LessThan | StrictLessThan):
        if isinstance(expr.args[1], Max | OrderMax):
            # x < Max(y,z) can be split into x < y or x < z
            for arg in expr.args[1].args:
                disjuncts.append(Rel(expr.args[0], arg, expr.rel_op))
            return disjuncts
        elif isinstance(expr.args[0], Min | OrderMin):
            # Min(x,y) < z can be split into x < z and y < z
            for arg in expr.args[0].args:
                disjuncts.append(Rel(arg, expr.args[1], expr.rel_op))
            return disjuncts
    elif isinstance(expr, GreaterThan | StrictGreaterThan):
        if isinstance(expr.args[1], Min | OrderMin):
            # x > Min(y,z) can be split into x > y or x > z
            for arg in expr.args[1].args:
                disjuncts.append(Rel(expr.args[0], arg, expr.rel_op))
            return disjuncts
        elif isinstance(expr.args[0], Max | OrderMax):
            # Max(x,y) > z can be split into x > z and y > z
            for arg in expr.args[0].args:
                disjuncts.append(Rel(arg, expr.args[1], expr.rel_op))
            return disjuncts
    elif isinstance(expr, LittlewoodPaley):
        disjuncts = []
        n = len(expr.args)
        for i in range(n):
            disjuncts.append(
                Eq(expr.args[i], OrderMax(*[expr.args[j] for j in range(n) if j != i]))
            )
        return disjuncts

    return None


class SplitGoal(Tactic):
    """Split the goal into its conjuncts.  If the goal is a conjunction, split the goal into one goal for each conjunct."""

    def activate(self, state: ProofState) -> list[ProofState]:
        conjuncts = get_conjuncts(state.goal)
        if conjuncts is not None:
            print(
                f"Split goal into {', '.join([str(conjunct) for conjunct in conjuncts])}"
            )
            new_goals = []
            for conjunct in conjuncts:
                newstate = state.copy()
                newstate.set_goal(conjunct)
                new_goals.append(newstate)
            return new_goals
        else:
            print(f"{str(state.goal)} cannot be split.")
            return [state.copy()]

    def __str__(self):
        return "split_goal"


class Contrapose(Tactic):
    """
    Contrapose the goal and a hypothesis.  If the hypothesis is a proposition, replace the goal with the negation of the hypothesis, and the hypothesis with the negation of the goal.  If the hypothesis is not a proposition, this becomes a proof by contradiction, adding the negation of the goal as a hypothesis, and "false" as the goal."""

    def __init__(self, h: str = "this"):
        """
        :param h: The name of the hypothesis to use for contraposition.
        """
        self.h = h

    def activate(self, state: ProofState) -> list[ProofState]:
        if self.h in state.hypotheses:
            hyp = state.hypotheses[self.h]
            if not isinstance(hyp, Boolean):
                raise ValueError(f"{describe(self.h, hyp)} is not a proposition.")
            print(f"Contraposing {describe(self.h, hyp)} with {state.goal}.")
            newstate = state.copy()
            newstate.set_goal(simplify_logic(Not(hyp), force=True))
            newstate.hypotheses[self.h] = simplify_logic(Not(state.goal), force=True)
            return [newstate]
        else:
            print(f"Proving {state.goal} by contradiction.")
            newstate = state.copy()
            newstate.set_goal(Not(state.goal))
            newstate.hypotheses[self.h] = false
            return [newstate]

    def __str__(self):
        if self.h == "this":
            return "contrapose"
        else:
            return "contrapose " + self.h


class SplitHyp(Tactic):
    """
    Split a hypothesis into its conjuncts.  If the hypothesis is a conjunction, split the hypothesis into one hypothesis for each conjunct.  The new hypotheses will be named according to the names supplied in the constructor."""

    def __init__(self, h: str = "this", *names: str):
        """
        :param h: The name of the hypothesis to use for obtaining.
        :param names: A list of names to use for the new hypotheses.  If None, the default names will be used.
        """
        self.h = h
        self.names = names if names is not None else []

    def activate(self, state: ProofState) -> list[ProofState]:
        if self.h in state.hypotheses:
            hyp = state.hypotheses[self.h]
            conjuncts = get_conjuncts(hyp)
            if conjuncts is not None:
                print(
                    f"Splitting {describe(self.h, hyp)} into {', '.join([str(conjunct) for conjunct in conjuncts])}."
                )
                new_state = state.copy()
                new_state.remove_hypothesis(self.h)
                for i, conjunct in enumerate(conjuncts):
                    if len(self.names) > i:
                        name = self.names[i]
                    else:
                        name = self.h
                    new_state.new_hypothesis(name, conjunct)
                return [new_state]
            else:
                print(f"Cannot split {describe(self.h, hyp)}.")
                return [state.copy()]
        else:
            print(f"Cannot find hypothesis {self.h}.")
            return [state.copy()]

    def __str__(self):
        if self.h == "this":
            return "split_hyp"
        else:
            if len(self.names) == 0:
                return "split_hyp " + self.h
            else:
                return "split_hyp " + self.h + " " + ", ".join(self.names)


class Cases(Tactic):
    """
    Split a hypothesis into its disjuncts.  If the hypothesis is a disjunction, split the hypothesis into one goal for each disjunct."""

    def __init__(self, hyp: str = "this"):
        self.h = hyp

    def activate(self, state: ProofState) -> list[ProofState]:
        if self.h in state.hypotheses:
            hyp = state.hypotheses[self.h]
            disjuncts = get_disjuncts(hyp)
            if disjuncts == None:
                print(f"Unable to split {hyp} into cases.")
                return [state.copy()]
            print(
                f"Splitting {describe(self.h, hyp)} into cases {', '.join([str(disjunct) for disjunct in disjuncts])}."
            )
            new_goals = []
            for disjunct in disjuncts:
                new_state = state.copy()
                new_state.hypotheses[self.h] = disjunct
                new_goals.append(new_state)
            return new_goals
        else:
            print(f"Cannot find hypothesis {self.h}.")
            return [state.copy()]

    def __str__(self):
        return "cases " + self.h


class ByCases(Tactic):
    """
    Split into two cases, depending on whether an assertin is true or false."""

    def __init__(self, statement: Boolean, name: str = "this"):
        self.statement = statement
        self.name = name

    def activate(self, state: ProofState) -> list[ProofState]:
        if not isinstance(self.statement, Boolean):
            raise ValueError(f"{str(self.statement)} is not a proposition.")
        name = state.new(self.name)
        new_states = []
        new_state = state.copy()
        new_state.hypotheses[name] = self.statement
        new_states.append(new_state)
        new_state = state.copy()
        new_state.hypotheses[name] = Not(self.statement)
        new_states.append(new_state)
        print(
            f"Splitting into cases {describe(name, self.statement)} and {describe(name, Not(self.statement))}."
        )
        return new_states

    def __str__(self):
        if self.name == "this":
            return "by_cases " + str(self.statement)
        else:
            return "by_cases " + describe(str.name, self.statement)


class Option(Tactic):
    """
    If the goal is a disjunction, replace it with one of its disjuncts."""

    def __init__(self, n: int = 1):
        assert n > 0, f"Argument {n} of Option() must be positive."
        self.n = n

    def activate(self, state: ProofState) -> list[ProofState]:
        disjuncts = get_disjuncts(state.goal)
        if disjuncts is None:
            raise ValueError(f"Goal {state.goal} did not split into a disjunction.")
        if self.n > len(disjuncts):
            raise ValueError(f"Goal {state.goal} only hhad {len(disjuncts)} disjuncts.")
        print(
            f"Replacing goal {state.goal} with option {self.n}: {disjuncts[self.n - 1]}."
        )
        new_state = state.copy()
        new_state.set_goal(disjuncts[self.n - 1])
        return [new_state]

    def __str__(self):
        return "option " + str(self.n)


class Claim(Tactic):
    """
    Similar to the `have` tactic in Lean.  Add a subgoal to prove, and then prove the original goal assuming the subgoal."""

    def __init__(self, expr: Boolean, name: str = "this"):
        self.name = name
        self.expr = expr

    def activate(self, state: ProofState) -> list[ProofState]:
        if not is_defined(self.expr, state.get_all_vars()):
            raise ValueError(
                f"{str(self.expr)} is not defined in the current proof state."
            )
        if not isinstance(self.expr, Boolean):
            raise ValueError(f"{str(self.expr)} is not a proposition.")
        first_state = state.copy()
        first_state.set_goal(self.expr)
        second_state = state.copy()
        name = state.new(self.name)
        second_state.hypotheses[name] = self.expr

        if first_state.test(first_state.goal, verbose=false):
            if second_state.test(second_state.goal, verbose=false):
                print(f"Goal follows trivially after observing {self.expr}.")
                return []
            else:
                print(f"Observe that {self.expr} holds.")
                return [second_state]
        else:
            if second_state.test(second_state.goal, verbose=false):
                print(f"Clearly, it suffices to show {self.expr}.")
                return [first_state]
            else:
                print(f"We claim that {self.expr}.")
                return [first_state, second_state]

    def __str__(self):
        if self.name == "this":
            return "claim " + str(self.expr)
        else:
            return "claim " + self.name + ": " + str(self.expr)
