from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING

from sympy import Basic, true
from sympy.logic.boolalg import Implies

if TYPE_CHECKING:
    from estimates.proofstate import ProofState
from estimates.tactic import Tactic


def test(hypotheses: Iterable[Basic|None], goal: Basic, verbose: bool = True) -> bool:
    """
    Check if a goal follows immediately from the stated hypotheses, including from the implicit ones.
    """

    # use of sympy's simplifier has been discontinued as it caused multiple unwanted operations and simplifications

    if goal == true:
        return True

    for hyp in hypotheses:
        if hyp != None:
            if Implies(hyp, goal) == True:
                if verbose:
                    print(f"Goal {goal} follows from hypothesis {hyp}!")
                return True
    return False


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

    def __str__(self) -> str:
        return "trivial"
    
    label = "Trivial"
    description = "A tactic to prove a goal that is trivially true, can be applied to any goal."
    arguments = []
