from sympy import false, symbols, true

from estimates.linarith import Linarith
from estimates.proofstate import ProofState


def test_true_goal_is_proved_by_linarith() -> None:
    assert Linarith().activate(ProofState(true)) == []


def test_false_hypothesis_proves_arbitrary_goal() -> None:
    x = symbols("x", real=True)
    assert Linarith().activate(ProofState(x > 0, {"contradiction": false})) == []


def test_false_goal_without_contradiction_stays_open() -> None:
    result = Linarith().activate(ProofState(false))
    assert len(result) == 1
    assert result[0].goal == false
