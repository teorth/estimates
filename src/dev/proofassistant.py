from prooftree import *

# A pseudo-Lean stype proof assistant.  The proof assistant will, at any time, be one of two modes:

# * Assumption mode (the starting mode).  Here, one can add variables and hypotheses as running assumptions, until one starts a proof.
# * Tactic mode.  This mode one enters in once one begins a proof.  The assumptions added in the assumption mode become the hypotheses of the initial proof state.  Initially the proof tree is a "sorry".  Subsequent tactics can modify the proof state and the proof tree.  Once all sorries are cleared, the proof is complete, and one then returns to the assumption mode.

class ProofAssistant:
    def __init__(self):
        self.mode = "assumption"
        self.hypotheses = {}        # a dictionary of (str, Basic) pairs
        self.theorem_str = ""       # a description of the theorem
        self.proof_tree = None      # a ProofTree object
        self.current_node = None    # a ProofTree object, a node of proof_tree

    def assume(self, assumption:Basic, name:str = "this"):
        if self.mode == "assumption":
            assert not name in self.hypotheses, f"The name {name} is already taken."
            # TODO: assert that all variables in the assumption are already introduced
            self.hypotheses[name] = assumption
        else:
            raise ValueError("Cannot add hypotheses in tactic mode.  Please switch to assumption mode.")

    def let(self, type:str, name:str = "this") -> Basic:
        """ Introduce a variable of a given type. """
        if self.mode == "assumption":
            assert not name in self.hypotheses, f"The name {name} is already taken."
            match type:
                case "int":
                    obj = Symbol(name, integer=True)
                case "real":
                    obj = Symbol(name, real=True)
                case _:
                    raise ValueError(f"Unknown type {type}.  Please use 'int' or 'real'.")
            self.hypotheses[name] = obj
            return obj
        else:
            raise ValueError("Cannot introduce variables in tactic mode.  Please switch to assumption mode.")

    def clear_hypotheses(self):
        if self.mode == "assumption":
            self.hypotheses = {}  # clear the hypotheses
        else:
            raise ValueError("Cannot clear hypotheses in tactic mode.  Please switch to assumption mode.")

    def start_proof(self, goal: Basic):
        if self.mode == "assumption":
            self.mode = "tactic"
            self.proof_tree = ProofTree(ProofState(goal, self.hypotheses))
            self.current_node = self.proof_tree
            self.theorem_str = "example "
            self.theorem_str += " ".join([f"({describe(name, hypothesis)})" for name, hypothesis in self.hypotheses.items()])
            self.theorem_str += f": {goal}"
            self.hypotheses = {}
            print(f"Starting proof.  Current proof state:")
            print(self.current_proof_state())
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
            self.theorem_str = ""
            self.hypotheses = []
        else:
            raise ValueError("Cannot abandon a proof in assumption mode.  Please start a proof first.")
    
    def print_proof(self):
        if self.proof_tree is None:
            print("No proof tree available.")
        else:
            print(self.theorem_str + " := by")
            print(self.proof_tree.rstr_join(current_node=self.current_node))

    # Apply a given tactic to the current proof state.  
    def use_tactic(self, tactic:Tactic):
        if self.mode == "tactic":
            self.current_node.use_tactic(tactic)
            _,before,after = self.proof_tree.find_sorry(self.current_node)
            if after is not None:
                self.current_node = after
            elif before is not None:
                self.current_node = before
            else:
                print("All sorries cleared - proof complete!")
                self.mode = "assumption"
        
    # Move the current node to the next available goal
    def next_goal(self):
        if self.mode == "tactic":
            _,_,after = self.proof_tree.find_sorry(self.current_node)
            if after is not None:
                self.current_node = after
                _, num_before, num_after = self.proof_tree.count_sorries(self.current_node)
                print(f"Moved to goal {num_before+1} of {num_before+1+num_after}.  Current proof state:\n")
                print(self.current_proof_state())
            else:
                print("No subsequent goal to move to.")
        else:
            raise ValueError("Cannot move to next goal in assumption mode.")
    
    # Move the current node to the previous available goal
    def previous_goal(self):
        if self.mode == "tactic":
            _,before,_ = self.proof_tree.find_sorry(self.current_node)
            if before is not None:
                self.current_node = before
                _, num_before, num_after = self.proof_tree.count_sorries(self.current_node)
                print(f"Moved to goal {num_before+1} of {num_before+1+num_after}.  Current proof state:")
                print(self.current_proof_state())
            else:
                print("No previous goal to move to.")
        else:
            raise ValueError("Cannot move to previous goal in assumption mode.")

    def __str__(self):
        if self.mode == "assumption":
            if len(self.hypotheses) == 0:
                return "Proof Assistant is in assumption mode.  No hypotheses."
            else:
                output = f"Proof Assistant is in assumption mode.  Current hypotheses:\n"
                output += "\n".join([str(hypothesis) for hypothesis in self.hypotheses])
                return output
        else:
            output = f"Proof Assistant is in tactic mode.  Current proof state:\n"
            output += str(self.current_proof_state()) 
            count = self.proof_tree.num_sorries()
            if count > 1:
                _, before, _ = self.proof_tree.count_sorries(self.current_node)
                output += f"\nThis is goal {before+1} of {count}."
            return output


class Simp(Tactic): 
    def activate(self, state: ProofState) -> tuple[bool, list[ProofState]]:
        print("Failed to simplify.")
        return [state.copy()]

    def __str__(self):
        return "simp"


class Split(Tactic): 
    def activate(self, state: ProofState) -> tuple[bool, list[ProofState]]:
        print("Split into cases.")
        return [state.copy(), state.copy()]

    def __str__(self):
        return "split"

class Solve(Tactic): 
    def activate(self, state: ProofState) -> tuple[bool, list[ProofState]]:
        print("Solved the goal.")
        return []
    
    def __str__(self):
        return "solve"




def proof_assistant_example():
    p = ProofAssistant()
    x = p.let("int", "x")
    y = p.let("real", "y")
    p.assume(x + y < 1, "h")
    p.assume(x > 0, "hx")
    p.assume(y > 0, "hy")
    p.start_proof(x + y < 1)
    p.use_tactic(Simp())
    p.use_tactic(Split())
    p.use_tactic(Simp())
    p.use_tactic(Solve())
    p.use_tactic(Solve())
    print(p)
    p.print_proof()

# proof_assistant_example()