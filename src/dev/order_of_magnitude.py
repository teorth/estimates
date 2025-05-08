from sympy import Expr, S, Add, Mul, Pow, Symbol, Basic, sympify
from sympy.core.decorators import _sympifyit, call_highest_priority


class OrderOfMagnitude:
    """
    Base class for “order of magnitude” expressions.  Any subclasses will also need to subclass from a sympy class such as Expr or Symbol.  All that this superclass does is intercept the arithmetic operations to redefine them.
    """

    def __add__(self, other):
        return OrderAdd(self, other).doit()

    def __radd__(self, other):
        return OrderAdd(other, self).doit()

    def __sub__(self, other):
        return NotImplementedError
    
    def __rsub__(self, other):
        return NotImplementedError

    def __mul__(self, other):
        return OrderMul(self, other).doit()

    def __rmul__(self, other):
        return OrderMul(other, self).doit()

    def __truediv__(self, other):
        return OrderMul(self, other**-1).doit()
    
    def __rtruediv__(self, other):
        return OrderMul(other, self**-1).doit()
    
    def __pow__(self, other):
        return OrderPow(self, other).doit()
    
    def __rpow__(self, other):
        return NotImplementedError


class Theta(OrderOfMagnitude, Expr):
    """
    Theta(expr) represents the order of magnitude of expr.
    We force any *positive numeric* expr ≠ 1 to collapse to Theta(1).
    """

    def __new__(cls, expr):
        # turn python constants into Sympy objects
        expr = sympify(expr)

        # do nothing on existing OrderOfMagnitude objects
        if isinstance(expr, OrderOfMagnitude):
            return expr
        
        assert expr.is_positive, f"Cannot form Θ({expr}), as expression is not known to be positive."

        if expr.is_number:
            # all positive constants collapse to Theta(1)
            obj = Expr.__new__(cls, S.One)
            obj.name = f"Theta(1)" 
            return obj
        
        # otherwise wrap the general symbolic expr
        obj = Expr.__new__(cls, expr)
        obj.name = f"Theta({expr!r})"
        return obj

    def __str__(self):
        return f"Theta({self.args[0]!r})"
    
    def __repr__(self):
        return f"Theta({self.args[0]!r})"
    

class OrderSymbol(OrderOfMagnitude, Symbol):
    """ Formal orders of magnitude."""


class OrderAdd(OrderOfMagnitude, Expr):
    """ A class to handle addition of orders of magnitude. """

    def __new__(cls, *args):
        newargs = list(dict.fromkeys([Theta(arg) for arg in args]))
        if len(newargs) == 0:
            raise ValueError("OrderAdd requires at least one argument.")
        if len(newargs) == 1:
            # if there's only one argument, just return it
            return newargs[0]
        
        # TODO: canonically sort arguments to increase ability to gather terms
        
        obj = Expr.__new__(cls, *newargs)
        obj.name = " + ".join([str(arg) for arg in newargs])
        return obj

    def doit(self):
        # flatten nested OrderAdds
        newargs = []
        for arg in self.args:
            if isinstance(arg, OrderAdd):
                newargs.extend(arg.args)
            else:
                newargs.append(arg)

        # TODO: canonically sort arguments to increase ability to gather terms

        return OrderAdd(*newargs)

    def __str__(self):
        return self.name
    
    def __repr__(self):
        # return str(self) # comment this out when debugging
        return f"OrderAdd{self.args!r}"   
        
class OrderMul(OrderOfMagnitude, Expr):
    """ A class to handle multiplication of orders of magnitude. """
    def __new__(cls, *args):
        newargs = [Theta(arg) for arg in args]
        if len(newargs) == 0:
            raise ValueError("OrderMul requires at least one argument.")
        if len(newargs) == 1:
            # if there's only one argument, just return it
            return newargs[0]
        
        # TODO: canonically sort arguments to increase ability to gather terms
        
        obj = Expr.__new__(cls, *newargs)
        obj.name = " * ".join([str(arg) for arg in newargs])
        return obj

    def doit(self):
        # flatten nested OrderMuls
        newargs = []
        for arg in self.args:
            if isinstance(arg, OrderMul):
                newargs.extend(arg.args)
            elif arg is not Theta(1):
                newargs.append(arg)
        
        # gather like terms
        terms = {}
        for arg in newargs:
            if isinstance(arg, OrderPow):
                if arg.args[0] in terms:
                    terms[arg.args[0]] += arg.args[1]
                else:
                    terms[arg.args[0]] = arg.args[1] 
            else:
                if arg in terms:
                    terms[arg] += 1
                else:
                    terms[arg] = 1
        
        gathered = []

        # TODO: canonically sort terms to increase ability to gather terms
        for term, exp in terms.items():
            if exp == 0:
                continue
            elif exp == 1:
                gathered.append(term)
            else:
                gathered.append(OrderPow(term, exp))

        if len(gathered) == 0:
            return Theta(1)
        elif len(gathered) == 1:
            return gathered[0]
        else:
            return OrderMul(*gathered)
    
    def __str__(self):
        return self.name
    
    def __repr__(self):
        return f"OrderMul({self.args!r})"

class OrderPow(OrderOfMagnitude, Expr):
    """ A class to handle exponentiation of orders of magnitude. """
    def __new__(cls, *args):
        assert len(args) == 2, f"OrderPow{args} requires exactly two arguments."
        exp = S(args[1])
        assert exp.is_number, f"Exponent {exp} must be a constant number."
        assert isinstance(args[0], OrderOfMagnitude), f"Base {args[0]} must be an order of magnitude."

        if exp == S(0):
            return Theta(1)
        if exp == S(1):
            return args[0]
        
        obj = Expr.__new__(cls, args[0], exp)
        obj.name = f"{args[0]}^{exp}"
        return obj

    def doit(self):
        if self.args[1] == S(0):
            return Theta(1)
        if self.args[1] == S(1):
            return self.args[0]
        if isinstance(self.args[0],OrderPow):
            return (self.args[0].args[0]**(self.args[1]*self.args[0].args[1])).doit()
        if isinstance(self.args[0],OrderMul):
            return OrderMul(*[expr.doit() for expr in self.args[0].args**self.args[1]]).doit()
        
        return self
    
    def __repr__(self):
        return f"OrderPow({self.args!r})"
