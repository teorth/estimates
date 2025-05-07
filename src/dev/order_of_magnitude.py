from sympy.core.expr import Expr
from sympy.core.add import Add
from sympy.core.mul import Mul

class OrderOfMagnitude(Expr):
    """ A class to handle order of magnitudes, such as Theta(N^2) or Theta(N). """
    def __new__(cls, name):
        # Under the hood we store a single Symbol so that printing, hashing, etc. 
        # Just use the bare name as the stringifier.
        from sympy import Symbol
        sym = Symbol(name)
        obj = Expr.__new__(cls, sym)
        obj._name = name
        obj.is_positive = True  # all order of magnitudes are positive
        obj.is_commutative = True  # all order of magnitudes are commutative
        return obj

    def __add__(self, other):
        if isinstance(other, OrderOfMagnitude):
            return Add(self, other, evaluate=True)
        # refuse everything else
        return NotImplemented

    def __radd__(self, other):
        # so  a + b  and  b + a  behave the same
        return self.__add__(other)

    def __mul__(self, other):
        if isinstance(other, OrderOfMagnitude):
            return Mul(self, other, evaluate=True)
        if other.is_real and other.is_positive:   # can multiply by positive reals or by other orders of magnitude
            return Mul(self, other, evaluate=True)
        return NotImplemented

    def __rmul__(self, other):
        return self.__mul__(other)

    def _sympystr(self, printer):
        # so that printing just shows the name
        return self._name
