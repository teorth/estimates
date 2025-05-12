from sympy import Symbol
from sympy.logic.boolalg import And, Boolean, Not, Or, false, true


class Proposition(Symbol, Boolean):
    """
    An atomic Boolean proposition.  Inherits from Symbol so
    you can give it a name, and from Boolean so that And/Or/Not
    will accept it.
    """

    is_Boolean = True  # mark it as Boolean so that Or/And treat it properly

    def __new__(cls, name):
        # delegate all the real work to Symbol.__new__
        return Symbol.__new__(cls, name)


def proposition_examples():
    # usage
    p = Proposition("p")
    q = Proposition("q")

    expr1 = Or(p, q)  # p ∨ q
    expr2 = And(p, Not(q))  # p ∧ ¬q

    print(expr1)  # Or(p, q)
    print(expr2)  # And(p, Not(q))

    # and it still simplifies when you substitute concrete Truth-values
    print(expr1.subs({p: true, q: false}))  # True
