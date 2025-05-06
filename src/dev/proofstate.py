from basic import *

## Proof states describe the current state of a proof (a list of hypotheses and a goal).  The hypotheses are a dictionary of string-Basic pairs that match a hypothesis name to the sympy basic class they represent.  The goals are stored as sympy basic classes.

## Goals should be predicate objects.  Hypotheses can be either predicates or variables.  In the latter case, the name of the hypothesis should match the name of the variable.

class ProofState:
    def __init__(self, goal: Basic, hypotheses:dict[str, Basic] = None):
        """
        Initialize a proof state with a name, a goal, and an optional list of hypotheses.
        
        :param name: The name of the proof state.
        :param goal: The goal of the proof state.
        :param hypotheses: A list of hypotheses for the proof state (optional).
        """
        self.goal = goal
        self.hypotheses = hypotheses if hypotheses is not None else {}

    def set_goal(self, goal: Basic):
        """
        Set the goal of the proof state.
        
        :param goal: The new goal for the proof state.
        """
        self.goal = goal
        
    def __str__(self):
        output = []
        for name, hypothesis in self.hypotheses.items():
            output.append(describe(name, hypothesis))
        output.append(f"|- {self.goal}")
        return "\n".join(output)
        
