from statements import *

# Basic classes for goals and proof states

# A goal consists of a collection of hypotheses and a desired conclusion.
class Goal:
    def __init__(self, conclusion, hypotheses=None):
        self.conclusion = conclusion
        self.hypotheses = hypotheses if hypotheses is not None else set()

    def match_hypothesis(self, statement):
        """Check if a statement matches any of the hypotheses in the goal. If so, return the matching hypothesis (which may be a different object from the original statement)"""
        for hypothesis in self.hypotheses:
            if hypothesis.defeq(statement):
                return hypothesis
        return None

    def add_hypothesis(self, hypotheses):
        """Add one or more hypotheses to the goal."""
        if isinstance(hypotheses, Statement):
            if self.match_hypothesis(hypotheses) is None:
                self.hypotheses.add(hypotheses)
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

    def replace_hypothesis(self, old_hypothesis, new_hypotheses):
        """Replace an old hypothesis with one or more new hypotheses."""
        self.remove_hypothesis(old_hypothesis)
        for new_hypothesis in new_hypotheses:
            self.add_hypothesis(new_hypothesis)

    def replace_conclusion(self, new_conclusion):
        """Replace the conclusion of the goal."""
        self.conclusion = new_conclusion

    def __str__(self):
        return f"Assuming: {', '.join(map(str, self.hypotheses))}, prove: {self.conclusion}"


# A proof state consists of a set of goals.  The first goal is the current goal.
class ProofState:
    def __init__(self, goals=None):
        self.goals = goals if goals is not None else set()

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
    """A tactic to split a goal into several sub-goals based on a statement, or split a hypothesis into several subhypotheses."""
    if statement is None:
        conclusion = proof_state.current_conclusion()
        if isinstance(conclusion, And):
            print(f"Splitting conclusion {conclusion} into subgoals {conclusion.conjuncts}.")
            goal = proof_state.pop()
            for conjunct in conclusion.conjuncts:
                new_goal = Goal(conclusion=conjunct, hypotheses=goal.hypotheses.copy())
                proof_state.add_goal(new_goal)
        else:
            raise ValueError("Don't know how to split the conclusion {conclusion}.")
    else:
        goal = proof_state.current_goal()
        hypothesis = goal.match_hypothesis(statement)
        if hypothesis == None:
            raise ValueError(f"Statement {statement} not found in current hypotheses {proof_state.current_hypotheses()}.")
        if isinstance(hypothesis, And):
            print(f"Expanding hypothesis {hypothesis} into {hypothesis.conjuncts}.")
            # Replace the statement with its conjuncts in the hypotheses
            goal.replace_hypothesis(hypothesis, hypothesis.conjuncts)
        elif isinstance(statement, Or):
            print(f"Splitting hypothesis {hypothesis} into cases.")
            goal.remove_hypothesis(hypothesis)
            proof_state.pop()
            for disjunct in statement.disjuncts:
                new_goal = Goal(conclusion=goal.conclusion, hypotheses=goal.hypotheses.copy())
                new_goal.add_hypothesis(disjunct)
                proof_state.add_goal(new_goal)
        else:
            raise ValueError(f"Don't know how to split the hypothesis {hypothesis}.")

ProofState.split = split



A = Proposition("A")
B = Proposition("B")
C = Proposition("C")
D = Proposition("D")

proof_state = ProofState()

goal = Goal(And(A,D))
goal.add_hypothesis(Or(C,D))
goal.add_hypothesis(B)
goal.add_hypothesis(Or(C,D))
proof_state.add_goal(goal)

print(proof_state)

proof_state.split(Or(C,D))

print(proof_state)

proof_state.split()

print(proof_state)
