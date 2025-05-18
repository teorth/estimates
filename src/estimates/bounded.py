
from sympy import Basic, Mul, Add, Pow, Expr, Max, Min, Abs
from sympy.logic.boolalg import Boolean, true, false
from sympy.core.relational import Relational

# Code to implement the concept of 
## fixed expressions (expressions independent of parameters); and
## bounded expressions (something ranging in a compact set independent of ambient parameters).  
# Ideally we would like to have .is_fixed and .is_bounded methods for expressions, but since we are wrapping around Sympy rather
# than modifying the base sympy classes, we will implement these concepts externally,
# by introducing IsFixed and IsBounded sympy Basic objects as a possible hypotheses.

class Fixed(Boolean):
    """A marker that says “– is a fixed expression”, but is still technically a boolean expression for the purposes of sympy operations. """

    name:str

    def __new__(cls, expr: Expr):
        obj = Boolean.__new__(cls, expr)
        obj.name = f"Fixed({expr!r})"
        return obj
    
    def __str__(self) -> str:
        return self.name

    def __repr__(self) -> str:
        return self.name


class Bounded(Boolean):
    """A marker that says “– is a bounded expression”, but is still technically a boolean expression for the purposes of sympy operations. """

    name:str

    def __new__(cls, expr: Expr):
        obj = Boolean.__new__(cls, expr)
        obj.name = f"Bounded({expr!r})"
        return obj
    
    def __str__(self) -> str:
        return self.name

    def __repr__(self) -> str:
        return self.name

def is_fixed(expr: Expr, hypotheses:set[Basic] = set()) -> bool:
    """
    Check if an expression is fixed, given a set of hypotheses.  Only the hypotheses that are IsFixed objects will be used to determine if the expression is fixed.
    """

    if expr.is_number:
        return True   # numerical quantities are always fixed

    if expr == true or expr == false:
        return True   # the boolean constants are fixed
    
    for hypothesis in hypotheses:
        if isinstance(hypothesis, Fixed):
            if hypothesis.args[0] == expr:
                return True    # expressions explicitly marked as fixed are always fixed

    if isinstance(expr, (Mul, Add, Pow, Max, Min, Abs, Relational)):  # here we use a "whitelist" approach of approved operations that preserve fixedness.  This list can be extended as needed.
        return all(is_fixed(arg, hypotheses) for arg in expr.args)  # sums, products, etc. of fixed expressions are fixed

    return False

def is_bounded(expr: Expr, hypotheses:set[Basic] = set()) -> bool:
    """
    Check if an expression is bounded, given a set of hypotheses.  Only the hypotheses that are IsFixed or IsBounded objects will be used to determine if the expression is bounded.
    """

    if expr.is_number:
        return True   # numerical quantities are always bounded

    for hypothesis in hypotheses:
        if isinstance(hypothesis, (Fixed, Bounded)):
            if hypothesis.args[0] == expr:
                return True    # expressions explicitly marked as fixed or bounded are always bounded

    if isinstance(expr, Boolean):
        return True   # boolean expressions (e.g., relations) are always bounded
    elif isinstance(expr, (Mul, Add, Abs, Max, Min)):  # here we use a "whitelist" approach of approved operations that preserve boundedness.  This list can be extended as needed.
        return all(is_bounded(arg, hypotheses) for arg in expr.args)  # sums or products of bounded expressions are bounded
    elif isinstance(expr, Pow):
        return all(is_bounded(arg, hypotheses) for arg in expr.args) and (expr.args[1].is_nonnegative is True)  # powers of bounded expressions are bounded if the exponent is bounded and nonnegative
    

    return False