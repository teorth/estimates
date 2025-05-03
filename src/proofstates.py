import copy
from statements import *

#### GOALS AND PROOF STATES ####

# A goal consists of a collection of hypotheses and a desired conclusion, stored as mutable types.
class Goal:
    def __init__(self, conclusion, hypotheses=set()):
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
            self.add_hypothesis(hypotheses.type)  # Unwrap the mutable type to get the original type
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
        return f"Assuming: {', '.join(map(str, self.hypotheses))}, prove: {self.conclusion}"


# A proof state consists of a set of goals.  The first goal is the current goal.
class ProofState:
    def __init__(self, goals=set()):
        self.goals = goals 

    def add_goal(self, goal):
        """Add a goal to the proof state."""
        self.goals.add(goal)
    
    def current_goal(self):
        assert not self.solved(), "Cannot get current goal when all goals are solved."
        return next(iter(self.goals))
    
    def current_conclusion(self):
        """Get the conclusion of the current goal."""
        assert not self.solved(), "Cannot get current conclusion when all goals are solved."
        return self.current_goal().conclusion
    
    def current_hypotheses(self):
        """Get the hypotheses of the current goal."""
        assert not self.solved(), "Cannot get current hypotheses when all goals are solved."
        return self.current_goal().hypotheses

    def resolve(self):
        """Resolve the current goal """
        assert not self.solved(), "Cannot resolve when all goals are solved."
        if len(self.goals) == 1:
            print("All goals solved!")
        else:
            print("Current goal solved!")
        self.goals.pop()

    def pop(self):
        """ Pop the current goal from the proof state."""
        return self.goals.pop()

    def solved(self):
        """Check if all goals are solved."""
        return len(self.goals) == 0

    def __str__(self):
        str = ""
        n = 1
        for goal in self.goals:
            str += f"{n}. {goal}\n"
            n += 1
        return str

def begin_proof( conclusion, hypotheses=set()):
    """Begin a proof with a given conclusion and hypotheses."""
    goal = Goal(conclusion, hypotheses)
    proof_state = ProofState(goals={goal})
    print(f"Starting proof with goal: {goal}")
    return proof_state


#### TACTICS ####


def by_contra(proof_state):
    """A tactic to prove a goal by contradiction."""
    assert not proof_state.solved(), "Cannot apply `by_contra` when all goals are solved."
    goal = proof_state.current_goal()
    conclusion = proof_state.current_conclusion()
    # Negate the conclusion and add it as a hypothesis
    goal.add_hypothesis(conclusion.negate())
    goal.replace_conclusion(Bool(False))  # The goal is now to obtain a contradiction
    print(f"Assume for contradiction that {conclusion} fails.")

ProofState.by_contra = by_contra



def split(proof_state, statement=None):
    """A tactic to split a goal into several sub-goals based on a statement (the default), or split a hypothesis into several subhypotheses."""
    if statement is None:
        conclusion = proof_state.current_conclusion()
        if isinstance(conclusion.immutable(), And):
            print(f"Splitting conclusion {conclusion} into subgoals {conclusion.immutable().conjuncts}.")
            goal = proof_state.pop()
            for conjunct in conclusion.immutable().conjuncts:
                # Create a new goal for each conjunct, keeping the hypotheses the same, but copied to a different mutable type so that they can be modified independently.
                new_goal = Goal(conclusion=conjunct, hypotheses={hypothesis.copy() for hypothesis in goal.hypotheses})  
                proof_state.add_goal(new_goal)
        else:
            raise ValueError("Don't know how to split the conclusion {conclusion}.")
    else:
        goal = proof_state.current_goal()
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
            for disjunct in statement.disjuncts:
                # Create a new goal for each disjunct, keeping the hypotheses the same, but copied to a different mutable type so that they can be modified independently.
                new_goal = Goal(conclusion=goal.conclusion, hypotheses={hypothesis.copy() for hypothesis in goal.hypotheses})  
                new_goal.add_hypothesis(disjunct)
                proof_state.add_goal(new_goal)
        else:
            raise ValueError(f"Don't know how to split the hypothesis {hypothesis}.")

ProofState.split = split



def simp_all(proof_state):
    """A tactic to simplify all hypotheses in the current goal."""
    assert not proof_state.solved(), "Cannot apply `simp_all` when all goals are solved."
    print("Simplifying hypotheses and conclusion in the current goal.")
    
    goal = proof_state.current_goal()
    
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
    elif isinstance(goal.conclusion.immutable(), And):
        proof_state.split()

ProofState.simp_all = simp_all



def tactic_examples():
    A = Proposition("A")
    B = Proposition("B")
    C = Proposition("C")
    D = Proposition("D")
    E = Proposition("E")

    proof_state = begin_proof( And(A,B,D), { Or(C,E), And(B,C), Or(C,D) } )
    
    proof_state.simp_all()

    print(proof_state)


# tactic_examples()