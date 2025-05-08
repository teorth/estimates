from proposition import *
from basic import *
from tactic import *
from sympy import false, simplify_logic

# Various tactics for handling propositional logic.

class SplitGoal(Tactic):
    # If the goal is a conjunction, split the goal into one goal for each conjunct.

    def activate(self, state: ProofState) -> list[ProofState]:
        if isinstance(state.goal, And):
            print(f"Split into conjunctions: {", ".join([str(conjunct) for conjunct in state.goal.args])}")
            new_goals = []
            for conjunct in state.goal.args:
                newstate = state.copy()
                newstate.set_goal(conjunct)
                new_goals.append(newstate)
            return new_goals
        else:
            print("No conjunction to split.")
            return [state.copy()]
    
    def __str__(self):
        return "split_goal"
    
class Contrapose(Tactic):
    # Given a hypothesis h, replace the goal with the negation of h, and h with the negation of the goal.  If h is not already a hypothesis, this becomes a proof by contradiction, adding the negation of the goal as a hypothesis, and "false" as the goal.

    def __init__(self, h: str = "this"):
        """
        :param h: The name of the hypothesis to use for contraposition.
        """
        self.h = h

    def activate(self, state: ProofState) -> list[ProofState]:
        if self.h in state.hypotheses:
            hyp = state.hypotheses[self.h]
            if not hyp.is_Boolean:
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
    # Given a hypothesis h that is a conjunction, replace that hypothesis with one hypothesis from each conjunct, either with a user-supplied list of names, or a default choice.

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
            if not isinstance(hyp, And):
                print(f"Obtain did nothing, as {describe(self.h, hyp)} is not a conjunction.")
                return [state.copy()]
            print(f"Decomposing {describe(self.h,hyp)} into components {", ".join([str(disjunct) for disjunct in hyp.args])}.")
            new_state = state.copy()
            new_state.remove_hypothesis(self.h)
            for i, conjunct in enumerate(hyp.args):
                if len(self.names) > i:
                    name = self.names[i]
                else:
                    name = self.h
                new_state.new_hypothesis(name, conjunct)
            return [new_state]
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

# Take a hypothesis that is a disjunction, and split it into its disjuncts, creating a separate goal for each disjunct.
class Cases(Tactic):
    
    def __init__(self, h: str = "this"):
        """
        :param h: The name of the hypothesis to use for cases.
        """
        self.h = h
    
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