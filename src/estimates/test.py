from __future__ import annotations

from collections.abc import Iterable
from typing import TYPE_CHECKING

from sympy import Basic, true
from sympy.logic.boolalg import Implies

if TYPE_CHECKING:
    from estimates.proofstate import ProofState
from estimates.tactic import Tactic


def test(hypotheses: Iterable[Basic], goal: Basic, verbose: bool = True) -> bool:
    """
    Check if a goal follows immediately from the stated hypotheses, including from the implicit ones.
    """

    simp_goal = goal.simplify()
    if simp_goal == true:
        return True

    for hyp in hypotheses:
        if Implies(hyp.simplify(), simp_goal) == True:
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
