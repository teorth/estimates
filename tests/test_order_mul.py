from sympy import Symbol

from estimates.order_of_magnitude import FormalSub, Theta


def test_order_mul_negative_scalar():
    x = Symbol("x", positive=True)
    t = Theta(x)
    assert (-t) == FormalSub(0, t)
    assert (-1) * t == FormalSub(0, t)
    assert t * (-1) == FormalSub(0, t)
    assert (-2) * t == FormalSub(0, t)
    assert 2 * t == t
