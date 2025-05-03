# Basic classes for statements, goals, and proof states

class Statement:
    """A class representing a logical statement."""
    def __hash__(self):
        return id(self)    
    def __str__(self):
        return self.name
    def __repr__(self):
        return str(self)
    def eq(self, other): 
        """Check if two statements are equal (but not necessarily the same object).  Can be overridden."""
        return self is other
    
    def negate(self):
        """Negate the statement.  Can be overridden."""
        return Not(self)
    
    def simp(self, goal=None):
        """Simplify the statement.  Can be overridden.  Can use the hypotheses in the goal to simplify."""
        return self
    
class Proposition(Statement):
    """A class representing an atomic proposition."""
    def __init__(self, name):
        self.name = name

class Or(Statement):
    """A class representing a disjunction (OR) of statements."""
    def __init__(self, *disjuncts):
        self.disjuncts = disjuncts
    def eq(self, other):
        if isinstance(other, Or):
            return set(self.disjuncts) == set(other.disjuncts)
        return False
    def negate(self):
        """Negate the disjunction by negating each disjunct and combining with AND."""
        return And(*(d.negate() for d in self.disjuncts))
    def simp(self, goal=None):
        new_disjuncts = set()
        """Simplify the disjunction by flattening nested ORs and removing duplicates."""
        for disjunct in self.disjuncts:
            disjunct = disjunct.simp(goal)
            if isinstance(disjunct, Or):
                new_disjuncts.update(disjunct.disjuncts)
            elif isinstance(disjunct, Bool):
                if disjunct.bool_value:
                    return Bool(True)
            else:
                new_disjuncts.add(disjunct)
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
    def eq(self, other):
        if isinstance(other, And):
            return set(self.conjuncts) == set(other.conjuncts)
        return False
    def negate(self):
        """Negate the conjunction by negating each conjunct and combining with OR."""
        return Or(*(c.negate() for c in self.conjuncts))
    def simp(self, goal=None):
        new_conjuncts = set()
        """Simplify the conjunction by flattening nested ANDs and removing duplicates."""
        for conjunct in self.conjuncts:
            conjunct = conjunct.simp(goal)
            if isinstance(conjunct, And):
                new_conjuncts.update(conjunct.conjuncts)
            elif isinstance(conjunct, Bool):
                if not conjunct.bool_value:
                    return Bool(False)
            else:
                new_conjuncts.add(conjunct)
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
    def eq(self, other):
        if isinstance(other, Not):
            return self.operand == other.operand
        return False
    def negate(self):
        """Negate the negation to get the original operand."""
        return self.operand
    def simp(self, goal=None):
        return self.operand.simp(goal).negate()
    def __str__(self):
        return f"NOT {self.operand}"

class Bool(Statement):
    """A class representing a boolean value (True or False)."""
    def __init__(self, bool_value):
        self.bool_value = bool_value
    def eq(self, other):
        if isinstance(other, Bool):
            return self.bool_value == other.bool_value
        return False
    def negate(self):
        """Negate the boolean value."""
        return Bool(not self.bool_value)
    def __str__(self):
        return str(self.bool_value).upper()



# A goal consists of a collection of hypotheses and a desired conclusion.
class Goal:
    def __init__(self, conclusion, hypotheses=None):
        self.conclusion = conclusion
        self.hypotheses = hypotheses if hypotheses is not None else set()

    def match_hypothesis(self, statement):
        """Check if a statement matches any of the hypotheses in the goal. If so, return the matching hypothesis (which may be a different object from the original statement)"""
        for hypothesis in self.hypotheses:
            if hypothesis.eq(statement):
                return hypothesis
        return None

    def add_hypothesis(self, hypotheses):
        """Add one or more hypotheses to the goal."""
        if isinstance(hypotheses, set):
            self.hypotheses.update(hypotheses)
        else:
            self.hypotheses.add(hypotheses)

    def remove_hypothesis(self, hypothesis):
        """Remove a hypothesis from the goal."""
        if hypothesis in self.hypotheses:
            self.hypotheses.remove(hypothesis)
        else:
            raise ValueError(f"Hypothesis {hypothesis} not found in the goal.")

    def replace_hypothesis(self, old_hypothesis, new_hypotheses):
        """Replace an old hypothesis with one or more new hypotheses."""
        if old_hypothesis in self.hypotheses:
            self.hypotheses.remove(old_hypothesis)
            if isinstance(new_hypotheses, set):
                self.hypotheses.update(new_hypotheses)
            else:
                self.hypotheses.add(new_hypotheses)
        else:
            raise ValueError(f"Hypothesis {old_hypothesis} not found in the goal.")

    def replace_conclusion(self, new_conclusion):
        """Replace the conclusion of the goal."""
        self.conclusion = new_conclusion

    def __str__(self):
        return f"Assuming: {', '.join(map(str, self.hypotheses))}, prove: {self.conclusion}"


# A proof state consists of a set of goals.  The first goal is the current goal.
class Proof_state:
    def __init__(self, goals=None):
        self.goals = goals if goals is not None else set()

    def add_goal(self, goal):
        """Add a goal to the proof state."""
        self.goals.add(goal)
    
    def current_goal(self):
        assert not self.solved(), "Cannot get current goal when all goals are solved."
        return next(iter(self.goals))
    
    def current_conclusion(self):
        """Get the conclusion of the current goal."""
        assert not self.solved(), "Cannot get current conclusion when all goals are solved."
        return self.current_goal().conclusion
    
    def current_hypotheses(self):
        """Get the hypotheses of the current goal."""
        assert not self.solved(), "Cannot get current hypotheses when all goals are solved."
        return self.current_goal().hypotheses

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
    """A tactic to prove a goal by contradiction."""
    assert not proof_state.solved(), "Cannot apply `by_contra` when all goals are solved."
    goal = proof_state.current_goal()
    conclusion = proof_state.current_conclusion()
    # Negate the conclusion and add it as a hypothesis
    goal.add_hypothesis(conclusion.negate())
    goal.replace_conclusion(Bool(False))  # The goal is now to obtain a contradiction
    print(f"Assume for contradiction that {conclusion} fails.")

Proof_state.by_contra = by_contra



def split(proof_state, statement=None):
    """Split a goal into several sub-goals based on a statement, or split a hypothesis into several subhypotheses."""
    if statement is None:
        conclusion = proof_state.current_conclusion()
        if isinstance(conclusion, And):
            return # to be implemented
        else:
            raise ValueError("Don't know how to split the conclusion {conclusion}.")
    else:
        goal = proof_state.current_goal()
        hypothesis = goal.match_hypothesis(statement)
        if hypothesis == None:
            raise ValueError(f"Statement {statement} not found in current hypotheses {proof_state.current_hypotheses()}.")
        if isinstance(hypothesis, And):
            print(f"Splitting hypothesis {hypothesis} into {hypothesis.conjuncts}.")
            # Replace the statement with its conjuncts in the hypotheses
            proof_state.current_goal().replace_hypothesis(hypothesis, hypothesis.conjuncts)
        elif isinstance(statement, Or):
            return # to be implemented
        else:
            raise ValueError(f"Don't know how to split the hypothesis {hypothesis}.")

Proof_state.split = split



A = Proposition("A")
B = Proposition("B")
C = Proposition("C")
D = Proposition("D")

proof_state = Proof_state()

proof_state.add_goal(Goal(conclusion=A, hypotheses={B, And(C,D)}))


print(proof_state)

proof_state.split(And(C,D))

print(proof_state)
