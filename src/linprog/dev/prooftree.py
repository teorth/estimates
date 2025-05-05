
# Support for proof trees, mimicking a Lean-type tactic proof environment.


## Proof states describe the current state of a proof (a list of hypotheses and a goal).  For now, implemented as a stub in which the goals and hypotheses are stored as strings.
# 
class ProofState:
    def __init__(self, goal: str, hypotheses: list[str] = None):
        """
        Initialize a proof state with a name, a goal, and an optional list of hypotheses.
        
        :param name: The name of the proof state.
        :param goal: The goal of the proof state.
        :param hypotheses: A list of hypotheses for the proof state (optional).
        """
        self.goal = goal
        self.hypotheses = hypotheses if hypotheses is not None else []

    def __str__(self):
        return f"Prove {self.goal} assuming {self.hypotheses}"


## Tactics are operations that can transform a proof state into one or more proof states.  For now, implemented as a stub that describes the operation in a string.

class Tactic:
    def __init__(self, name: str):
        """
        Initialize a tactic with a name and an optional description.
        
        :param name: The name of the tactic.
        :param description: A description of the tactic (optional).
        """
        self.name = name

    def __str__(self):
        return f"{self.name}"


# A proof tree consists of the following objects:

## The current proof state
## The parent proof state (or None, if this is the root)
## The tactic used to transform this state into new states (or None, if the state is "sorried")
## A list of proof states that are children of this state (or None, if this is a leaf)

class ProofTree:
    def __init__(self, proof_state: ProofState, tactic: Tactic = None):
        """
        Initialize a proof tree node with a proof state, an optional parent, and an optional tactic.
        
        :param proof_state: The current proof state.
        :param parent: The parent proof tree node (None, if is the root).
        :param tactic: The tactic used to transform this state into new states (None, if this step is "sorried").
        """
        self.proof_state = proof_state
        self.parent = None  # parents are managed automatically by the add_sorry method
        self.tactic = tactic
        self.children = []

    def add_sorry(self, proof_state) -> 'ProofTree':
        """Add a child proof tree node as a 'sorry'."""
        child = ProofTree(proof_state)
        child.parent = self
        self.children.append(child)
        return child
    
    # apply a tactic and create children with the indicated proof states
    def use_tactic(self, tactic: Tactic, proof_state_list: list[ProofState]) -> list['ProofTree']:
        if self.tactic is not None:
            raise ValueError("Cannot use a tactic on a proof tree that already has a tactic.")
        self.tactic = tactic
        for proof_state in proof_state_list:
            self.add_sorry(proof_state)
        return self.children

    # Recursively generate a list of strings representing of the proof tree, with indentation for each level.  Highlight the node if it is the current node
    def rstr(self, indent:str = "", next_indent:str = "", current_node:'ProofTree' = None) -> list[str]:
        if self.tactic == None:
            if self == current_node:
                return [indent + "**sorry**"]
            else:
                return [indent + "sorry"]
        if self == current_node:
            output = [indent + "**" + str(self.tactic) + "**"]
        else:
            output = [indent + str(self.tactic)]
        if len(self.children) == 0:
            return output
        else:
            for n in range(len(self.children)):
                if n < len(self.children) - 1:
                    output.extend(self.children[n].rstr(next_indent + ". ", next_indent + "  ", current_node))
                else:
                    output.extend(self.children[n].rstr(next_indent, next_indent, current_node))
            return output
    
    def rstr_join(self, current_node: 'ProofTree' = None) -> str:
        """Return a string representation of the proof tree, with indentation for each level."""
        return "\n".join(self.rstr(current_node=current_node))
    
    def __str__(self):
        return self.rstr_join()
    

node0 = ProofTree(ProofState(""))
node0.use_tactic(Tactic("split"), [ProofState(""), ProofState("")])
node1 = node0.children[0]
node1.use_tactic(Tactic("simp"), [ProofState("")])
node2 = node1.children[0]
node2.use_tactic(Tactic("log_linarith"), [ProofState("")])
sorry = node2.children[0]
node3 = node0.children[1]
node3.use_tactic(Tactic("by_contra"), [ProofState("")])
node4 = node3.children[0]
node4.use_tactic(Tactic("simp"), [])

print(node0.rstr_join(sorry))
