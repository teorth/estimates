from typing import Any

from sympy import Basic, Expr, S, Symbol, false, true

from estimates.order_of_magnitude import OrderSymbol
from estimates.proposition import Proposition

# Some code to handle sympy classes


def typeof(obj: Basic) -> str:
    """
    Return a string describing the type of the object.  This is used to determine the type of a variable in a declaration.
    TODO: implement a more sophisticated type system that can also infer properties from ambient hypotheses.
    """
    if obj.is_integer:
        if obj.is_positive:
            return "pos_int"
        elif obj.is_nonnegative:
            return "nonneg_int"
        elif obj.is_nonzero:
            return "nonzero_int"
        else:
            return "int"
    elif obj.is_rational:
        if obj.is_positive:
            return "pos_rat"
        elif obj.is_nonnegative:
            return "nonneg_rat"
        elif obj.is_nonzero:
            return "nonzero_rat"
        else:
            return "rat"
    elif obj.is_real:
        if obj.is_positive:
            return "pos_real"
        elif obj.is_nonnegative:
            return "nonneg_real"
        elif obj.is_nonzero:
            return "nonzero_real"
        else:
            return "real"
    elif obj.is_complex:
        if obj.is_nonzero:
            return "nonzero_complex"
        return "complex"
    elif obj.is_Boolean:
        return "bool"
    elif isinstance(obj, OrderSymbol):
        return "order"
    else:
        return "unknown"


def new_var(type: str, name: str) -> Expr:
    """
    Create a new symbolic variable of the given type and name.
    """

    match type:
        case "int":
            return Symbol(name, integer=True)
        case "pos_int":
            return Symbol(name, integer=True, positive=True)
        case "nonneg_int":
            return Symbol(name, integer=True, nonnegative=True)
        case "nonzero_int":
            return Symbol(name, integer=True, nonzero=True)
        case "real":
            return Symbol(name, real=True)
        case "pos_real":
            return Symbol(name, real=True, positive=True)
        case "nonneg_real":
            return Symbol(name, real=True, nonnegative=True)
        case "nonzero_real":
            return Symbol(name, real=True, nonzero=True)
        case "rat":
            return Symbol(name, rational=True)
        case "pos_rat":
            return Symbol(name, rational=True, positive=True)
        case "nonneg_rat":
            return Symbol(name, rational=True, nonnegative=True)
        case "nonzero_rat":
            return Symbol(name, rational=True, nonzero=True)
        case "complex":
            return Symbol(name, complex=True)
        case "nonzero_complex":
            return Symbol(name, complex=True, nonzero=True)
        case "bool":
            return Proposition(name)
        case "order":
            return OrderSymbol(name)
        case _:
            raise ValueError(
                f"Unknown type {type}.  Currently accepted types: 'int', 'pos_int', 'nonneg_int', `nonzero_int`, 'real', 'pos_real', 'nonneg_real', 'nonzero_real', 'rat', 'pos_rat`, 'nonneg_rat', 'nonzero_rat', 'complex', 'nonzero_complex', 'bool', 'order'."
            )


class Type(Basic):
    """
    A bare‐bones SymPy object to capture the "type" of of other SymPy expressions.  Used here to encode variable declarations: "x : int", for instance, is encoded as "x : Type(Symbol("x", integer=True))".
    """

    def __new__(cls, *args):
        assert len(args) == 1, "Type requires exactly one argument."
        # force args into a tuple and pass to Basic
        return Basic.__new__(cls, *args)

    def var(self) -> Basic:
        """Return the variable that this type wraps around."""
        return self.args[0]

    def __str__(self) -> str:
        return str(typeof(self.var()))

    def __repr__(self) -> str:
        return f"Type({self.args})"


def describe(name: str, object: Basic) -> str:
    """Return a string description of a named sympy object."""
    return f"{name}: {object}"


def is_defined(expr: Any, vars: set[Basic]) -> bool:
    """Check if expr is defined in terms of the set `vars` of other expressions"""
    expr = S(expr)
    if expr in vars:
        return True
    if expr.is_number:
        return True
    if expr in (true, false):
        return True
    if len(expr.args) == 0:
        return False
    return all(is_defined(arg, vars) for arg in expr.args)
