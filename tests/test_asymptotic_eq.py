from sympy import Eq, GreaterThan

from estimates.log_linarith import ApplyTheta, LogLinarith
from estimates.order_of_magnitude import Theta
from estimates.proofassistant import ProofAssistant


def test_apply_theta_on_equality():
    p = ProofAssistant()
    a = p.var("pos_real", "a")
    b = p.var("pos_real", "b")
    p.assume(Eq(a, b, evaluate=False), "h")
    p.begin_proof(GreaterThan(a, 0, evaluate=False))
    p.use(ApplyTheta("h"))
    hyp = p.current_proof_state().hypotheses["h_theta"]
    assert hyp == Eq(Theta(a), Theta(b))


def test_loglinarith_accepts_positive_equality(capsys):
    p = ProofAssistant()
    a = p.var("pos_real", "a")
    b = p.var("pos_real", "b")
    p.assume(Eq(a, b, evaluate=False), "h")
    p.begin_proof(Eq(a, b, evaluate=False))
    p.use(LogLinarith())
    captured = capsys.readouterr()
    assert "Invalid relational operator" not in captured.out
    assert "Log-linear arithmetic was unable to prove goal." in captured.out
