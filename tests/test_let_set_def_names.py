from sympy import Eq

from estimates.basic import Type
from estimates.proofassistant import ProofAssistant
from estimates.subst import Let, Set


def _names(p: ProofAssistant) -> dict:
    return p.current_hypotheses()


def test_let_pairs_def_with_fresh_name():
    p = ProofAssistant()
    x = p.var("pos_real", "x")
    p.begin_proof(x > 0)
    p.use(Let("x", x + 1))
    hyps = _names(p)
    assert "x'" in hyps
    assert isinstance(hyps["x'"], Type)
    assert "x'_def" in hyps
    assert "x_def" not in hyps
    assert hyps["x'_def"] == Eq(hyps["x'"].var(), x + 1)


def test_set_pairs_def_with_fresh_name():
    p = ProofAssistant()
    x = p.var("pos_real", "x")
    p.begin_proof(x > 0)
    p.use(Set("x", x + 1))
    hyps = _names(p)
    assert "x'" in hyps
    assert "x'_def" in hyps
    assert "x_def" not in hyps


def test_let_plain_name_still_uses_x_def():
    p = ProofAssistant()
    x = p.var("pos_real", "x")
    p.begin_proof(x > 0)
    p.use(Let("y", x + 1))
    hyps = _names(p)
    assert "y" in hyps
    assert "y_def" in hyps
    assert hyps["y_def"] == Eq(hyps["y"].var(), x + 1)


def test_let_does_not_reuse_existing_def_name():
    p = ProofAssistant()
    x = p.var("pos_real", "x")
    p.assume(x == x, "x_def")
    p.begin_proof(x > 0)
    p.use(Let("y", 2 * x))
    hyps = _names(p)
    assert "y" in hyps
    assert "y_def" in hyps
    assert hyps["x_def"] == (x == x)
