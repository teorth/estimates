from object import *
from prooftree import *

# A pseudo-Lean stype proof assistant.  The proof assistant will, at any time, be one of two modes:

# * Assumption mode (the starting mode).  Here, one can add variables and hypotheses as running assumptions, until one starts a proof.
# * Tactic mode.  This mode one enters in once one begins a proof.  The assumptions added in the assumption mode become the hypotheses of the initial proof state.  Initially the proof tree is a "sorry".  Subsequent tactics can modify the proof state and the proof tree.  Once all sorries are cleared, the proof is complete, and one then returns to the assumption mode.

class ProofAssistant:
    def __init__(self):
        self.mode = "assumption"
        self.hypotheses = []        # a list of Objects
        self.proof_tree = None      # a ProofTree object
        self.current_node = None

    def add_hypothesis(self, assumption:str|Basic, name:str = "this"):
        if self.mode == "assumption":
            self.hypotheses.append(Object(assumption, name))
        else:
            raise ValueError("Cannot add hypotheses in tactic mode.  Please switch to assumption mode.")

    def clear_hypotheses(self):
        if self.mode == "assumption":
            self.hypotheses = []
        else:
            raise ValueError("Cannot clear hypotheses in tactic mode.  Please switch to assumption mode.")

    def start_proof(self, goal: Basic):
        if self.mode == "assumption":
            self.mode = "tactic"
            self.proof_tree = ProofTree(ProofState(goal, self.hypotheses))
            self.current_node = self.proof_tree
            self.hypotheses = []
        else:
            raise ValueError("Cannot start a proof in tactic mode.  Please switch to assumption mode.")   

    def current_proof_state(self) -> ProofState:
        return self.current_node.proof_state
    
    def current_goal(self) -> str:
        return self.current_node.proof_state.goal
        
    def abandon_proof(self):
        if self.mode == "tactic":
            self.mode = "assumption"
            self.proof_tree = None
            self.current_node = None
        else:
            raise ValueError("Cannot abandon a proof in assumption mode.  Please start a proof first.")
    
    def print_proof_tree(self):
        if self.proof_tree is None:
            print("No proof tree available.")
        else:
            print(self.proof_tree.rstr_join(current_node=self.current_node))

    def __str__(self):
        if self.mode == "assumption":
            output = f"Proof Assistant is in assumption mode.  Current hypotheses:\n"
            output += "\n".join([str(hypothesis) for hypothesis in self.hypotheses])
            return output
        else:
            output = f"Proof Assistant is in tactic mode.  Current proof state:\n"
            output += str(self.current_proof_state()) + "\n"
            output += "Goal: " + str(self.current_goal())
            