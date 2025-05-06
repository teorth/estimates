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

    def var(self, type:str, name:str = "this") -> Basic:
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

    def begin_proof(self, goal: Basic):
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
    
    def proof(self) -> str:
        if self.proof_tree is None:
            raise ValueError("No proof tree available.")
        else:
            return self.theorem_str + " := by" + "\n" + self.proof_tree.rstr_join(current_node=self.current_node)

    # Apply a given tactic to the current proof state.  
    def use(self, tactic:Tactic):
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

    # Move the current node
    def set_current_node(self, node:ProofTree):
        if self.mode == "tactic":
            if node in self.proof_tree.list_sorries():
                self.current_node = node
                _, num_before, num_after = self.proof_tree.count_sorries(self.current_node)
                print(f"Moved to goal {num_before+1} of {num_before+1+num_after}.  Current proof state:")
                print(self.current_proof_state())
            else:
                print(f"Moved to the following proof state (currently handled by {node.tactic}):")
                print(self.current_proof_state())
        else:
            raise ValueError("Cannot set current node in assumption mode.")


    # Move the current node to the next available goal
    def next_goal(self):
        if self.mode == "tactic":
            _,_,after = self.proof_tree.find_sorry(self.current_node)
            if after is not None:
                self.set_current_node(after)
            else:
                print("No subsequent goal to move to.")
        else:
            raise ValueError("Cannot move to next goal in assumption mode.")
    
    # Move the current node to the previous available goal
    def previous_goal(self):
        if self.mode == "tactic":
            _,before,_ = self.proof_tree.find_sorry(self.current_node)
            if before is not None:
                self.set_current_node(before)
            else:
                print("No previous goal to move to.")
        else:
            raise ValueError("Cannot move to previous goal in assumption mode.")

    # Move the current node to the first available goal
    def first_goal(self):
        if self.mode == "tactic":
            first = self.proof_tree.first_sorry()
            if first is not None:
                self.set_current_node(first)
            else:
                print("No goals to move to.")
        else:
            raise ValueError("Cannot move to first goal in assumption mode.")

    # Move the current node to the last available goal
    def last_goal(self):
        if self.mode == "tactic":
            last = self.proof_tree.last_sorry()
            if last is not None:
                self.set_current_node(last)
            else:
                print("No goals to move to.")
        else:
            raise ValueError("Cannot move to last goal in assumption mode.")

    def list_goals(self):
        """ Print all the goals in the proof tree. """
        N = self.proof_tree.num_sorries()
        count = 1
        for node in self.proof_tree.list_sorries():
            print(f"Goal {count} of {N}:")
            count += 1
            print(node.proof_state)


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
    x = p.var("int", "x")
    y = p.var("real", "y")
    p.assume(x + y < 1, "h")
    p.assume(x > 0, "hx")
    p.assume(y > 0, "hy")
    p.begin_proof(x + y < 1)
    p.use(Simp())
    p.use(Split())
    p.use(Simp())
    p.use(Solve())
    p.use(Solve())
    print(p)
    print(p.proof())
       
# proof_assistant_example()