class Statement:
    """A class representing a logical statement."""
    def __hash__(self):
        return id(self)    
    def __str__(self):
        return self.name
    def __repr__(self):
        return str(self)
    def defeq(self, other): 
        """Check if two statements are definitionally equal (but not necessarily the same object).  Can be overridden.  This should be the default equality check for statements."""
        return self is other
    def appears_in(self, hypotheses):
        """Check if the statement appears in a set of hypotheses (up to defeq)."""
        return any(self.defeq(hypothesis) for hypothesis in hypotheses)
    def negate(self):
        """Negate the statement.  Can be overridden."""
        return Not(self)
    def simp(self, hypotheses=None):
        """Simplify the statement.  Can be overridden.  Can use the hypotheses in the `hypotheses` to simplify."""
        if self.appears_in(hypotheses):
            return Bool(True)
        else:
            return self


def add_nodup(statements, statement):
    """ Add a statement to a set of statements, if it is not defeq to any existing statement. """
    if not(statement.appears_in(statements)):
        statements.add(statement)
    return statements

def defeq_set( statements1, statements2):
    """Check if two sets of statements are equal (up to defeq)."""
    if len(statements1) != len(statements2):
        return False
    return all(any(s1.defeq(s2) for s2 in statements2) for s1 in statements1)

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
            return defeq_set(self.disjuncts, other.disjuncts)
        return False
    def negate(self):
        """Negate the disjunction by negating each disjunct and combining with AND."""
        return And(*(d.negate() for d in self.disjuncts))
    def simp(self, hypotheses=None):
        new_disjuncts = set()
        """Simplify the disjunction by flattening nested ORs and removing duplicates."""
        for disjunct in self.disjuncts:
            disjunct = disjunct.simp(hypotheses)
            if isinstance(disjunct, Or):
                for d in disjunct.disjuncts:
                    add_nodup(new_disjuncts, d)
            elif isinstance(disjunct, Bool):
                if disjunct.bool_value:
                    return Bool(True)
            else:
                add_nodup(new_disjuncts,disjunct)
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
            return defeq_set(self.conjuncts, other.conjuncts)
        return False
    def negate(self):
        """Negate the conjunction by negating each conjunct and combining with OR."""
        return Or(*(c.negate() for c in self.conjuncts))
    def simp(self, hypotheses=None):
        new_conjuncts = set()
        """Simplify the conjunction by flattening nested ANDs and removing duplicates."""
        for conjunct in self.conjuncts:
            conjunct = conjunct.simp(hypotheses)
            if isinstance(conjunct, And):
                for c in conjunct.conjuncts:
                    add_nodup(new_conjuncts, c)
            elif isinstance(conjunct, Bool):
                if not conjunct.bool_value:
                    return Bool(False)
            else:
                add_nodup(new_conjuncts, conjunct)
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
    def simp(self, hypotheses=None):
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

