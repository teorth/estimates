from sympy import Add, Integer, Symbol, expand

from estimates.simp import rsimp


def test_rsimp_passes_use_sympy_into_subterms():
    x = Symbol("x", real=True)
    expr = (x + 1) * (x - 1) + 0
    # Without the flag, the product is left as a Mul of expanded-looking factors.
    plain = rsimp(expr, set(), False)
    with_sympy = rsimp(expr, set(), True)
    assert with_sympy == expand(expr)
    assert plain != with_sympy or expand(expr) == expr


def test_rsimp_nested_add_with_sympy():
    x = Symbol("x", real=True)
    expr = Add(x + 0, Integer(0), evaluate=False)
    out = rsimp(expr, set(), True)
    assert out == x


def test_rsimp_without_flag_keeps_structure():
    x = Symbol("x", real=True)
    expr = (x + 1) * (x - 1)
    assert rsimp(expr, set(), False) == expr
