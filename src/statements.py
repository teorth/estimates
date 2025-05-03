from type import *

class Statement(Type):
    """A class representing a logical statement."""
    def negate(self):
        """Negate the statement.  Can be overridden."""
        return Not(self)
    def simp(self, hypotheses=()):
        """Simplify the statement.  Can be overridden.  Can use the hypotheses in the `hypotheses` to simplify."""
        if self.appears_in(hypotheses):
            return Bool(True)
        return self

class Proposition(Statement):
    """A class representing an atomic proposition."""
    def __init__(self, name):
        self.name = name

class Or(Statement):
    """A class representing a disjunction (OR) of statements."""
    def __init__(self, *disjuncts):
        self.disjuncts = disjuncts
    def defeq(self, other):
        if isinstance(other, Or):
            return set_defeq(self.disjuncts, other.disjuncts)
        return False
    def negate(self):
        """Negate the disjunction by negating each disjunct and combining with AND."""
        return And(*(d.negate() for d in self.disjuncts))
    def simp(self, hypotheses=()):
        if self.appears_in(hypotheses):
            return Bool(True)
        new_disjuncts = ()
        """Simplify the disjunction by flattening nested ORs and removing duplicates."""
        for disjunct in self.disjuncts:
            disjunct = disjunct.simp(hypotheses)
            if isinstance(disjunct, Or):
                for d in disjunct.disjuncts:
                    d.add_to(new_disjuncts)
            elif isinstance(disjunct, Bool):
                if disjunct.bool_value:
                    return Bool(True)  # True OR anything is True, while False OR anything is the other thing
            else:
                disjunct.add_to(new_disjuncts)
        if len(new_disjuncts) == 0:
            return Bool(False)
        elif len(new_disjuncts) == 1:
            return new_disjuncts.pop()
        else:
            return Or(*new_disjuncts)
    def __str__(self):
        inner = " OR ".join(str(op) for op in self.disjuncts)
        return f"({inner})"

class And(Statement):
    """A class representing a conjunction (AND) of statements."""
    def __init__(self, *conjuncts):
        self.conjuncts = conjuncts
    def defeq(self, other):
        if isinstance(other, And):
            return set_defeq(self.conjuncts, other.conjuncts)
        return False
    def negate(self):
        """Negate the conjunction by negating each conjunct and combining with OR."""
        return Or(*(c.negate() for c in self.conjuncts))
    def simp(self, hypotheses=()):
        if self.appears_in(hypotheses):
            return Bool(True)
        new_conjuncts = set()
        """Simplify the conjunction by flattening nested ANDs and removing duplicates."""
        for conjunct in self.conjuncts:
            conjunct = conjunct.simp(hypotheses)
            if isinstance(conjunct, And):
                for c in conjunct.conjuncts:
                    c.add_to(new_conjuncts)
            elif isinstance(conjunct, Bool):
                if not conjunct.bool_value:
                    return Bool(False) # False AND anything is False, while True AND anything is the other thing
            else:
                conjunct.add_to(new_conjuncts)
        if len(new_conjuncts) == 0:
            return Bool(True)
        elif len(new_conjuncts) == 1:
            return new_conjuncts.pop()
        else:
            return And(*new_conjuncts)
    def __str__(self):
        inner = " AND ".join(str(op) for op in self.conjuncts)
        return f"({inner})"

class Not(Statement):
    """A class representing a negation of a statement."""
    def __init__(self, operand):
        self.operand = operand
    def defeq(self, other):
        if isinstance(other, Not):
            return self.operand.defeq(other.operand)
        return False
    def negate(self):
        """Negate the negation to get the original operand."""
        return self.operand
    def simp(self, hypotheses=()):
        if self.appears_in(hypotheses):
            return Bool(True)
        return self.operand.simp(hypotheses).negate()
    def __str__(self):
        return f"NOT {self.operand}"

class Bool(Statement):
    """A class representing a boolean value (True or False)."""
    def __init__(self, bool_value):
        self.bool_value = bool_value
    def defeq(self, other):
        if isinstance(other, Bool):
            return self.bool_value == other.bool_value
        return False
    def negate(self):
        """Negate the boolean value."""
        return Bool(not self.bool_value)
    def __str__(self):
        return str(self.bool_value).upper()

