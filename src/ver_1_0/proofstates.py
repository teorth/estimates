import copy
from statements import *

#### GOALS AND PROOF STATES ####

# A goal consists of a collection of hypotheses and a desired conclusion, stored as mutable types.
class Goal:
    def __init__(self, conclusion, hypotheses=()):
        self.conclusion = MutableType(conclusion)
        self.hypotheses = {MutableType(hypothesis) for hypothesis in hypotheses} 
        
    def match_hypothesis(self, statement):
        """Check if a statement is defeq to any of the hypotheses in the goal. If so, return the matching hypothesis (which may be a different object from the original statement)"""
        for hypothesis in self.hypotheses:
            if hypothesis.defeq(statement):
                return hypothesis
        return None

    def add_hypothesis(self, hypotheses):
        """Add one or more hypotheses to the goal (as mutable types)."""
        if isinstance(hypotheses, MutableType):
            self.add_hypothesis(hypotheses.immutable())  # Unwrap the mutable type to get the original type
        elif isinstance(hypotheses, Statement):
            if self.match_hypothesis(hypotheses) is None:
                self.hypotheses.add(hypotheses.mutable())
        elif isinstance(hypotheses, set):
            for hypothesis in hypotheses:
                self.add_hypothesis(hypothesis)  # Recursively add each hypothesis
        else:
            raise ValueError(f"Cannot add {hypotheses} to hypotheses: must be a Statement or a set of Statements.")

    def remove_hypothesis(self, hypothesis):
        """Remove a hypothesis from the goal."""
        match = self.match_hypothesis(hypothesis)
        if not match == None:
            self.hypotheses.remove(match)
        else:
            raise ValueError(f"Hypothesis {hypothesis} not found in the goal.")

    def clear_hypotheses(self):
        """Clear all hypotheses from the goal."""
        self.hypotheses.clear()

    def replace_hypothesis(self, old_hypothesis, new_hypotheses):
        """Replace an old hypothesis with one or more new hypotheses."""
        self.remove_hypothesis(old_hypothesis)
        for new_hypothesis in new_hypotheses:
            self.add_hypothesis(new_hypothesis)

    def replace_hypotheses(self, new_hypotheses):
        """Replace all hypotheses with a new set of hypotheses."""
        self.hypotheses.clear()
        for new_hypothesis in new_hypotheses:
            self.add_hypothesis(new_hypothesis)
            
    def replace_conclusion(self, new_conclusion):
        """Replace the conclusion of the goal (as a mutable type)."""
        self.conclusion = new_conclusion.mutable()

    def __str__(self):
        if len(self.hypotheses) == 0:
            return f"Prove: {self.conclusion}"
        else:
            return f"Assuming: {', '.join(map(str, self.hypotheses))}, prove: {self.conclusion}"


# A proof state consists of a set of goals, and a current goal
class ProofState:
    def __init__(self, goals=()):
        self.goals = set(goals) 
        if len(self.goals) > 0:
            self.current_goal = next(iter(self.goals))
        else:
            self.current_goal = None

    def add_goal(self, goal):
        """Add a goal to the proof state."""
        self.goals.add(goal)
        if len(self.goals) == 1:
            self.current_goal = goal
        
    def current_conclusion(self):
        """Get the conclusion of the current goal."""
        return self.current_goal.conclusion
    
    def current_hypotheses(self):
        """Get the hypotheses of the current goal."""
        return self.current_goal.hypotheses

    def add_hypothesis(self, hypotheses):
        """Add one or more hypotheses to the current goal."""
        self.current_goal.add_hypothesis(hypotheses)

    def set_current_goal(self, goal):
        if goal in self.goals:
            self.current_goal = goal
        else:
            raise ValueError(f"Goal {goal} not found in the proof state.")

    def resolve(self):
        """Resolve the current goal """
        assert not self.solved(), "Cannot resolve when all goals are solved."
        if len(self.goals) == 1:
            print("All goals solved!")
        else:
            print("Current goal solved!")
        self.goals.remove(self.current_goal)
        self.current_goal = next(iter(self.goals)) if len(self.goals) > 0 else None

    def pop(self):
        """ Pop the current goal from the proof state."""
        assert not self.solved(), "Cannot pop when all goals are solved."
        goal = self.current_goal
        self.goals.remove(goal)
        self.current_goal = next(iter(self.goals)) if len(self.goals) > 0 else None
        return goal

    def solved(self):
        """Check if all goals are solved."""
        return len(self.goals) == 0

    def __str__(self):
        str = ""
        n = 1
        for goal in self.goals:
            if goal == self.current_goal:
                str += f"{n}. [Current Goal] {goal}\n"
            else:
                str += f"{n}. {goal}\n"
            n += 1
        return str

def begin_proof( conclusion, hypotheses=()):
    """Begin a proof with a given conclusion and hypotheses."""
    goal = Goal(conclusion, hypotheses)
    proof_state = ProofState(goals={goal})
    print(f"Starting proof with goal: {goal}")
    return proof_state


#### TACTICS ####


def by_contra(proof_state):
    """A tactic to prove a goal by contradiction."""
    assert not proof_state.solved(), "Cannot apply `by_contra` when all goals are solved."
    if proof_state.current_conclusion().defeq(Bool(False)):
        return True  # We already are proving by contradiction.
    goal = proof_state.current_goal
    conclusion = proof_state.current_conclusion().immutable()
    # Negate the conclusion and add it as a hypothesis
    goal.add_hypothesis(conclusion.negate())
    goal.replace_conclusion(Bool(False))  # The goal is now to obtain a contradiction
    print(f"Assume for contradiction that {conclusion} fails.")

ProofState.by_contra = by_contra



def split(proof_state, statement=None):
    """A tactic to split a goal into several sub-goals based on a statement (the default), or split a hypothesis into several subhypotheses."""
    if statement is None:
        conclusion = proof_state.current_conclusion().immutable()
        if isinstance(conclusion, And):
            print(f"Splitting conclusion {conclusion} into subgoals {conclusion.conjuncts}.")
            goal = proof_state.pop()
            first = True
            for conjunct in conclusion.immutable().conjuncts:
                # Create a new goal for each conjunct, keeping the hypotheses the same, but copied to a different mutable type so that they can be modified independently.
                new_goal = Goal(conclusion=conjunct, hypotheses={hypothesis.copy() for hypothesis in goal.hypotheses})  
                proof_state.add_goal(new_goal)
                if first:
                    proof_state.set_current_goal(new_goal)
                    first = False
        else:
            raise ValueError("Don't know how to split the conclusion {conclusion}.")
    else:
        goal = proof_state.current_goal
        hypothesis = goal.match_hypothesis(statement)
        if hypothesis == None:
            raise ValueError(f"Statement {statement} not found in current hypotheses {proof_state.current_hypotheses()}.")
        if isinstance(hypothesis.immutable(), And):
            print(f"Expanding hypothesis {hypothesis} into {hypothesis.immutable().conjuncts}.")
            # Replace the statement with its conjuncts in the hypotheses
            goal.replace_hypothesis(hypothesis, hypothesis.immutable().conjuncts)
        elif isinstance(hypothesis.immutable(), Or):
            print(f"Splitting hypothesis {hypothesis} into cases.")
            goal.remove_hypothesis(hypothesis)
            proof_state.pop()
            first = True
            for disjunct in statement.disjuncts:
                # Create a new goal for each disjunct, keeping the hypotheses and conculsion the same, but copied to a different mutable type so that they can be modified independently.
                new_goal = Goal(conclusion=goal.conclusion.copy(), hypotheses={hypothesis.copy() for hypothesis in goal.hypotheses})  
                new_goal.add_hypothesis(disjunct)
                proof_state.add_goal(new_goal)
                if first:
                    proof_state.set_current_goal(new_goal)
                    first = False
        else:
            raise ValueError(f"Don't know how to split the hypothesis {hypothesis}.")

ProofState.split = split

def split_first(proof_state):
    """Finds the first OR statement in the hypothesis (if any), and splits it."""
    assert not proof_state.solved(), "Cannot apply `split_first` when all goals are solved."
    for hypothesis in proof_state.current_hypotheses():
        if isinstance(hypothesis.immutable(), Or):
            proof_state.split(hypothesis.immutable())
            return True
    print("No OR statement found in the hypotheses to split.")
    return False  

ProofState.split_first = split_first

def simp_all(proof_state):
    """A tactic to simplify all hypotheses in the current goal."""
    assert not proof_state.solved(), "Cannot apply `simp_all` when all goals are solved."
    print("Simplifying hypotheses and conclusion in the current goal...")
    
    goal = proof_state.current_goal
    
# Do multiple passes of simplification of hypotheses until no further changes are made.

    while True:
        # First, simplify each individual hypothesis using all other hypotheses
        for hypothesis in goal.hypotheses:
            other_hypotheses = goal.hypotheses.copy()
            other_hypotheses.remove(hypothesis)
            hypothesis.simp(other_hypotheses)
        
        # Then, remove tautological hypotheses and expand conjunctions
        new_hypotheses = set()
        for hypothesis in goal.hypotheses:
            if isinstance(hypothesis.immutable(), Bool):
                if hypothesis.immutable().bool_value:
                    continue  # no point adding a True hypothesis
                else:
                    print(f"Contradiction found, completing the goal.") # ex falso quodlibet
                    proof_state.resolve()
                    return True
            elif isinstance(hypothesis.immutable(), And):
                print(f"Expanding hypothesis {hypothesis} into conjuncts {hypothesis.immutable().conjuncts}.")
                for conjunct in hypothesis.immutable().conjuncts:
                    conjunct.add_to(new_hypotheses)
            else:
                hypothesis.add_to(new_hypotheses)
        
        if set_defeq(goal.hypotheses, new_hypotheses):
            break
        else:
            goal.replace_hypotheses(new_hypotheses)

# Now, simplify the conclusion, splitting it if necessary.
    goal.conclusion.simp(goal.hypotheses)
    if isinstance(goal.conclusion.immutable(), Bool):
        if goal.conclusion.immutable().bool_value:
            proof_state.resolve()
            return True
    elif isinstance(goal.conclusion.immutable(), And):
        proof_state.split()

    return False  # Goal was not resolved, but was possibly simplified.

ProofState.simp_all = simp_all


# A tactic to repeatedly simplify and split the current goal until it is solved, or no further simplifications can be made.
def simp_and_split(proof_state):
    print("Trying the repeated simplification and splitting tactic.")
    while not proof_state.solved():
        print(f"Current goal: {proof_state.current_goal}")
        if proof_state.simp_all():
            continue
        if proof_state.split_first():
            continue
        print("No splittings found for current goal; tactic ended.")
        return False

ProofState.simp_and_split = simp_and_split
