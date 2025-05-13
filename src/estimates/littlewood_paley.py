from fractions import Fraction

from sympy.core.expr import Expr
from sympy.logic.boolalg import BooleanFunction

from estimates.order_of_magnitude import Theta, asymp

# Support for some expressions that come up in the Littlewood-Paley theory arising in PDE


def sqrt(x: Expr) -> Expr:
    return x ** Fraction(1, 2)


def bracket(x: Expr) -> Expr:
    """
    The "Japanese bracket" notation.
    """
    return sqrt(1 + abs(x) ** 2)


class LittlewoodPaley(BooleanFunction):
    """
    The relation between n orders of magnitude X_1, ..., X_n that asserts that the largest one is the sum of all the others.  This scenario often arises when analyzing nonlinear frequency interactions.  Can be unpacked using `Cases`."""

    def __new__(cls, *args):
        if len(args) < 2:
            raise ValueError("LittlewoodPaley() requires at least two arguments.")
        if (
            len(args) == 2
        ):  # LP collapses to asymptotic equivalence when there are just two arguments
            return asymp(args[0], args[1])
        newargs = [Theta(x) for x in args]
        obj = Expr.__new__(cls, *newargs)
        obj.name = "LittlewoodPaley(" + ", ".join([str(arg) for arg in newargs]) + ")"
        return obj

    def __str__(self) -> str:
        return self.name

    def __repr__(self) -> str:
        return str(self)

    def _sympystr(self, printer):
        return str(self)
