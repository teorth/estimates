from sympy import Eq, Ne
from estimates.basic import Type, new_var
from estimates.proofstate import ProofState
from estimates.simp import IsNonzero


def test_nonzero_requires_evidence():
    for kind in ("real", "rat", "int"):
        x = new_var(kind, "x")
        for extra in ({}, {"zero": Eq(x, 0)}):
            state = ProofState(Ne(x, 0), {"x": Type(x), **extra})
            before = state.copy()
            result = IsNonzero("x").activate(state)
            assert len(result) == 1
            assert result[0].eq(before)
            assert state.eq(before)


def test_nonzero_uses_symbolic_hypothesis():
    for kind in ("real", "rat", "int"):
        x = new_var(kind, "x")
        for argument in ("x", x):
            state = ProofState(Ne(x, 0), {"x": Type(x), "h": Ne(x, 0)})
            before = state.copy()
            assert IsNonzero(argument).activate(state) == []
            assert state.eq(before)


def test_nonzero_preserves_unsolved_goal_and_substitutes_hypotheses():
    x = new_var("real", "x")
    state = ProofState(Eq(x**2, 2), {"x": Type(x), "h": Ne(x, 0)})
    before = state.copy()
    result = IsNonzero("x").activate(state)
    assert len(result) == 1
    nonzero_x = result[0].get_var("x")
    assert nonzero_x.is_nonzero is True
    assert result[0].goal == Eq(nonzero_x**2, 2)
    assert result[0].hypotheses["h"] == True
    assert state.eq(before)
