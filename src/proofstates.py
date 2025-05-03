# Basic classes for statements, goals, and proof states

class Statement:
    """A class representing a logical statement."""
    def __hash__(self):
        return id(self)    
    def __str__(self):
        return self.name
    def __repr__(self):
        return str(self)
    
class Proposition(Statement):
    """A class representing an atomic proposition."""
    def __init__(self, name):
        self.name = name



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



A = Proposition("A")
B = Proposition("B")
C = Proposition("C")

goal_1 = Goal(conclusion=A, hypotheses={B, C})
goal_2 = Goal(conclusion=B, hypotheses={A})

proof_state = Proof_state(goals={goal_1, goal_2})

print(proof_state)

proof_state.resolve()

print(proof_state)

proof_state.resolve()
