import pytest
from sympy import Rational, S, Symbol

from estimates.basic import Type
from estimates.lemma import Amgm
from estimates.proofstate import ProofState


def test_python_integer_inputs():
    assert Amgm(1, 4).apply(ProofState(S.true)) is S.true


def test_mixed_symbolic_and_python_inputs():
    x = Symbol("x", nonnegative=True)
    state = ProofState(S.true, {"x": Type(x)})
    lemma = Amgm(x, 4)
    assert lemma.vars == [x, S(4)]
    assert lemma.apply(state).subs(x, 4) is S.true


@pytest.mark.parametrize("value", [-1, -0.5, Rational(-1, 3)])
def test_negative_inputs_are_rejected(value):
    with pytest.raises(AssertionError):
        Amgm(value, 1)
