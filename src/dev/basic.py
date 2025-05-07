from sympy import Basic, Symbol
from proposition import *

# Some code to handle sympy classes

def typeof(obj:Basic) -> str:
    if obj.is_integer:
        if obj.is_positive:
            return f"pos_int"
        elif obj.is_nonnegative:
            return f"nonneg_int"
        else:
            return f"int"
    elif obj.is_real:
        if obj.is_positive:
            return f"pos_real"
        elif obj.is_nonnegative:
            return f"nonneg_real"
        else:
            return f"real"
    elif obj.is_Boolean:
        return f"bool"
    else:
        return f"unknown"

class Type(Basic):
    """
    A bare‐bones SymPy object to capture the "type" of of other SymPy expressions.  Used here to encode variable declarations: "x : int", for instance, is encoded as "x : Type(Symbol("x", integer=True))".
    """
    def __new__(cls, *args):
        assert len(args) == 1, "Type requires exactly one argument."
        # force args into a tuple and pass to Basic
        return Basic.__new__(cls, *args)

    # the specific variable that this type wraps around
    def var(self) -> Basic:
        return self.args[0]

    def __str__(self):
        return str(typeof(self.var()))
        
    def __repr__(self):
        return f"Type({self.args})"

def describe( name:str, object:Basic ) -> str:
    """Return a string description of a named sympy object."""
    return f"{name}: {object}"

