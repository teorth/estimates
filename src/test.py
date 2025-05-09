from sympy import Basic, LessThan, StrictLessThan, GreaterThan, StrictGreaterThan, Ne
from sympy.core.relational import Relational
from proofstate import *
from basic import *
from tactic import *

def test(hypotheses: set[Basic], goal: Basic) -> bool:
    """
    Check if a goal follows immediately from the stated hypotheses, including from the implicit ones.
    """

    if goal == true:
        return True
    
    if false in hypotheses:
        return True # ex falso quodlibet
    
    if goal in hypotheses:
        return True
    
    if isinstance(goal, Relational):
        if goal.reversed in hypotheses:
            return True
        
        if isinstance(goal, StrictLessThan):
            return test(hypotheses, Relational(goal.args[1], goal.args[0], '>'))
        elif isinstance(goal, LessThan):
            return test(hypotheses, Relational(goal.args[1], goal.args[0], '>='))
        elif isinstance(goal, StrictGreaterThan):
            if goal.args[0].is_positive and goal.args[1] == S(0):
                return True
        elif isinstance(goal, GreaterThan):
            if goal.args[0].is_nonnegative and goal.args[1] == S(0):
                return True
            if goal.args[0].is_positive and goal.args[0].is_integer and goal.args[1] == S(1):
                return True # The integrality gap!
            if test(hypotheses, Relational(goal.args[0], goal.args[1], '>')):
                return True
            if test(hypotheses, Relational(goal.args[0], goal.args[1], '==')):
                return True
        elif isinstance(goal, Ne):
            if test(hypotheses, Relational(goal.args[0], goal.args[1], '>')):
                return True
            if test(hypotheses, Relational(goal.args[0], goal.args[1], '<')):
                return True

    return False

def state_test(state: ProofState, goal:Basic) -> bool:
    """
    Check if a goal follows immediately from the stated hypotheses, including from the implicit ones.
    """
    return test(state.hypotheses.values(), goal)

ProofState.test = state_test


class Trivial(Tactic):
    """
    Closes a goal if it follows trivially from the hypotheses.
    """

    def activate(self, state: ProofState) -> list[ProofState]:
        if state.test(state.goal):
            print(f"Goal {state.goal} follows trivially from the hypotheses.")
            return []
        else:
            print(f"Goal {state.goal} does not follow trivially from the hypotheses.")
            return [state.copy()]
    
    def __str__(self):
        return f"trivial"