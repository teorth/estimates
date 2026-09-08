from sympy import Symbol

from estimates.basic import Type
from estimates.proofstate import ProofState
from estimates.subst import fresh_var_and_def


def test_fresh_var_and_def_on_empty_state():
    x = Symbol("x", positive=True, real=True)
    state = ProofState(x > 0, {"x": Type(x)})
    name, def_name, var, newstate = fresh_var_and_def(state, "y", x + 1)
    assert name == "y"
    assert def_name == "y_def"
    assert name in newstate.hypotheses
    assert def_name not in newstate.hypotheses  # caller fills the Eq


def test_fresh_var_and_def_primes_taken_name():
    x = Symbol("x", positive=True, real=True)
    state = ProofState(x > 0, {"x": Type(x)})
    name, def_name, var, newstate = fresh_var_and_def(state, "x", x + 1)
    assert name == "x'"
    assert def_name == "x'_def"
