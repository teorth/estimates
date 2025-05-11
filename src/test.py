from sympy import Basic, LessThan, StrictLessThan, GreaterThan, StrictGreaterThan, Ne
from sympy.core.relational import Relational
from sympy.logic.boolalg import Implies
from proofstate import *
from basic import *
from tactic import *

def test(hypotheses: set[Basic], goal: Basic) -> bool:
    """
    Check if a goal follows immediately from the stated hypotheses, including from the implicit ones.
    """

    if goal == true:
        return True
    
    for hyp in hypotheses:
        if Implies(hyp, goal) == True:
            print(f"Goal {goal} follows from hypothesis {hyp}!")
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