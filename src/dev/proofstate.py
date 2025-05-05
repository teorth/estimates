from object import *

## Proof states describe the current state of a proof (a list of hypotheses and a goal).  The hypothesis is a list of objects; the goals are stored as sympy basic classes.

class ProofState:
    def __init__(self, goal: Basic, hypotheses: list[object] = None):
        """
        Initialize a proof state with a name, a goal, and an optional list of hypotheses.
        
        :param name: The name of the proof state.
        :param goal: The goal of the proof state.
        :param hypotheses: A list of hypotheses for the proof state (optional).
        """
        self.goal = goal
        self.hypotheses = hypotheses if hypotheses is not None else []

    def set_goal(self, goal: Basic):
        """
        Set the goal of the proof state.
        
        :param goal: The new goal for the proof state.
        """
        self.goal = goal
        
    def __str__(self):
        return f"Prove {self.goal} assuming {self.hypotheses}"

