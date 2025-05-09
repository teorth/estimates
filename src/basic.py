from sympy import Basic, Symbol, true, false
from proposition import *
from order_of_magnitude import *

# Some code to handle sympy classes

def typeof(obj:Basic) -> str:
    """
    Return a string describing the type of the object.  This is used to determine the type of a variable in a declaration.
    TODO: implement a more sophisticated type system that can also infer properties from ambient hypotheses.
    """
    if obj.is_integer:
        if obj.is_positive:
            return f"pos_int"
        elif obj.is_nonnegative:
            return f"nonneg_int"
        else:
            return f"int"
    elif obj.is_rational:
        if obj.is_positive:
            return f"pos_rat"
        elif obj.is_nonnegative:
            return f"nonneg_rat"
        else:
            return f"rat"
    elif obj.is_real:
        if obj.is_positive:
            return f"pos_real"
        elif obj.is_nonnegative:
            return f"nonneg_real"
        else:
            return f"real"
    elif obj.is_Boolean:
        return f"bool"
    elif isinstance(obj, OrderSymbol):
        return f"order"
    else:
        return f"unknown"

def new_var(type:str, name:str) -> Expr:    
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
        case "real":
            return Symbol(name, real=True)
        case "pos_real":
            return Symbol(name, real=True, positive=True)
        case "nonneg_real":
            return Symbol(name, real=True, nonnegative=True)
        case "rat":
            return Symbol(name, rational=True)
        case "pos_rat":
            return Symbol(name, rational=True, positive=True)
        case "nonneg_rat":
            return Symbol(name, rational=True, nonnegative=True)
        case "bool":
            return Proposition(name)
        case "order":
            return OrderSymbol(name)
        case _:
            raise ValueError(f"Unknown type {type}.  Currently accepted types: 'int', 'pos_int', 'nonneg_int', 'real', 'pos_real', 'nonneg_real',  `rat`, `pos_rat`, `nonneg_rat`, 'bool', 'order'.")


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

    def __str__(self):
        return str(typeof(self.var()))
        
    def __repr__(self):
        return f"Type({self.args})"

def describe( name:str, object:Basic ) -> str:
    """Return a string description of a named sympy object."""
    return f"{name}: {object}"

def is_defined(expr:Expr, vars:set[Expr]) -> bool:
    """Check if expr is defined in terms of the set `vars` of other expressions"""
    expr = S(expr)
    if expr in vars:
        return True
    if expr.is_number:
        return True
    if expr == true or expr == false:
        return True
    if len(expr.args) == 0:
        return False
    for arg in expr.args:
        if not is_defined(arg, vars):
            return False
    return True
