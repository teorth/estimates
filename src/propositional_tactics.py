from proposition import *
from basic import *
from tactic import *
from sympy import false, simplify_logic, Max, Min
from order_of_magnitude import *

# Various tactics for handling propositional logic.

def get_conjuncts(expr: Expr) -> list[Expr]:
    """
    Get the conjuncts of an expression (after unpacking), or None if no conjuncts found
    """
    if isinstance(expr, And):
        return expr.args
    elif isinstance(expr, Eq):
        conjuncts = []
        if isinstance(expr.args[1], Max|OrderMax):
            # x = Max(y,z) can be split into x >= y, x >= z, and (x == y) | (x == z)
            disjuncts = []
            for arg in expr.args[1].args:
                conjuncts.append(expr.args[0] >= arg)
                disjuncts.append(Eq(expr.args[0],arg))
            conjuncts.append(Or(*disjuncts))
            return conjuncts
        elif isinstance(expr.args[1], Min|OrderMin):
            # x = Min(y,z) can be split into x <= y, x <= z, and (x == y) | (x == z)
            disjuncts = []
            for arg in expr.args[1].args:
                conjuncts.append(expr.args[0] <= arg)
                disjuncts.append(Eq(expr.args[0],arg))
            conjuncts.append(Or(*disjuncts))
            return conjuncts
    return None

class SplitGoal(Tactic):
    """Split the goal into its conjuncts.  If the goal is a conjunction, split the goal into one goal for each conjunct."""

    def activate(self, state: ProofState) -> list[ProofState]:
        conjuncts = get_conjuncts(state.goal)
        if conjuncts is not None:
            print(f"Split goal into {", ".join([str(conjunct) for conjunct in conjuncts])}")
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
            print(f"Contraposing {describe(self.h,hyp)} with {state.goal}.")
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

    def __init__(self, h: str = "this", *names:str):
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
                print(f"Splitting {describe(self.h,hyp)} into {", ".join([str(conjunct) for conjunct in conjuncts])}.")
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
            if not isinstance(hyp, Or):
                print(f"Cases did nothing, as {describe(self.h, hyp)} is not a disjunction.")
                return [state.copy()]
            print(f"Splitting {describe(self.h,hyp)} into cases.")
            new_goals = []
            for disjunct in hyp.args:
                new_state = state.copy()
                new_state.hypotheses[self.h] = disjunct
                new_goals.append(new_state)
            return new_goals
        else:
            print(f"Cannot find hypothesis {self.h}.")
            return [state.copy()]
        
    def __str__(self):
        return "cases " + self.h