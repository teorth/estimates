from sympy import I

from estimates.basic import new_var, typeof


def test_nonzero_complex_variable_does_not_assume_real() -> None:
    z = new_var("nonzero_complex", "z")
    assert z.is_complex is True
    assert z.is_zero is False
    assert z.is_real is None
    assert typeof(z) == "nonzero_complex"


def test_imaginary_unit_has_nonzero_complex_type() -> None:
    assert typeof(I) == "nonzero_complex"


def test_nonzero_real_variable_retains_real_assumptions() -> None:
    x = new_var("nonzero_real", "x")
    assert x.is_real is True
    assert x.is_nonzero is True
    assert typeof(x) == "nonzero_real"
