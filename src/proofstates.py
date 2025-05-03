# Basic classes for statements, goals, and proof states

class Statement:
    """A class representing a logical statement."""
    def __hash__(self):
        return id(self)    
    def __str__(self):
        return self.name
    def __repr__(self):
        return str(self)
    
    def negate(self):
        """Negate the statement.  Can be overridden."""
        return Not(self)
    
    def simp(self):
        """Simplify the statement.  Can be overridden."""
        return self
    
class Proposition(Statement):
    """A class representing an atomic proposition."""
    def __init__(self, name):
        self.name = name

class Or(Statement):
    """A class representing a disjunction (OR) of statements."""
    def __init__(self, *disjuncts):
        self.disjuncts = disjuncts
    def negate(self):
        """Negate the disjunction by negating each disjunct and combining with AND."""
        return And(*(d.negate() for d in self.disjuncts))
    def simp(self):
        new_disjuncts = set()
        """Simplify the disjunction by flattening nested ORs and removing duplicates."""
        for disjunct in self.disjuncts:
            disjunct = disjunct.simp()
            if isinstance(disjunct, Or):
                new_disjuncts.update(disjunct.disjuncts)
            else:
                new_disjuncts.add(disjunct)
        if len(new_disjuncts) == 0:
            return False_statement
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
    def negate(self):
        """Negate the conjunction by negating each conjunct and combining with OR."""
        return Or(*(c.negate() for c in self.conjuncts))
    def simp(self):
        new_conjuncts = set()
        """Simplify the conjunction by flattening nested ANDs and removing duplicates."""
        for conjunct in self.conjuncts:
            conjunct = conjunct.simp()
            if isinstance(conjunct, And):
                new_conjuncts.update(conjunct.conjuncts)
            else:
                new_conjuncts.add(conjunct)
        if len(new_conjuncts) == 0:
            return True_statement
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
    def negate(self):
        """Negate the negation to get the original operand."""
        return self.operand
    def simp(self):
        return self.operand.simp().negate()
    def __str__(self):
        return f"NOT {self.operand}"

class Bool(Statement):
    """A class representing a boolean value (True or False)."""
    def __init__(self, bool_value):
        self.bool_value = bool_value
    def negate(self):
        """Negate the boolean value."""
        return Bool(not self.bool_value)
    def __str__(self):
        return str(self.bool_value).upper()

True_statement = Bool(True)
False_statement = Bool(False)




# A goal consists of a collection of hypotheses and a desired conclusion.
class Goal:
    def __init__(self, conclusion, hypotheses=None):
        self.conclusion = conclusion
        self.hypotheses = hypotheses if hypotheses is not None else set()

    def add_hypothesis(self, hypothesis):
        """Add a hypothesis to the goal."""
        self.hypotheses.add(hypothesis)

    def __str__(self):
        return f"Assuming: {', '.join(map(str, self.hypotheses))}, prove: {self.conclusion}"


# A proof state consists of a set of goals.
class Proof_state:
    def __init__(self, goals=None):
        self.goals = goals if goals is not None else set()

    def add_goal(self, goal):
        """Add a goal to the proof state."""
        self.goals.add(goal)

    def resolve(self):
        """Resolve the current goal """
        assert not self.solved(), "Cannot resolve when all goals are solved."
        if len(self.goals) == 1:
            print("All goals solved!")
        else:
            print("Current goal solved!")
        self.goals.pop()

    def solved(self):
        """Check if all goals are solved."""
        return len(self.goals) == 0

    def __str__(self):
        str = ""
        n = 1
        for goal in self.goals:
            str += f"{n}. {goal}\n"
            n += 1
        return str





def by_contra(proof_state):
    """"""

A = Proposition("A")
B = Proposition("B")
C = Proposition("C")
D = Proposition("D")

print(Not(Not(Not(Or(A,A,B)))).simp())

# goal_1 = Goal(conclusion=A, hypotheses={B, C})
# goal_2 = Goal(conclusion=B, hypotheses={A, Or(C, D)})

# proof_state = Proof_state(goals={goal_1, goal_2})

# print(proof_state)
# proof_state.resolve()
# print(proof_state)
