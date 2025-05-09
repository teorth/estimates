from prooftree import *
from order_of_magnitude import *

# A pseudo-Lean stype proof assistant.  The proof assistant will, at any time, be one of two modes:

# * Assumption mode (the starting mode).  Here, one can add variables and hypotheses as running assumptions, until one starts a proof.
# * Tactic mode.  This mode one enters in once one begins a proof.  The assumptions added in the assumption mode become the hypotheses of the initial proof state.  Initially the proof tree is a "sorry".  Subsequent tactics can modify the proof state and the proof tree.  Once all sorries are cleared, the proof is complete, and one then returns to the assumption mode.

class ProofAssistant:
    def __init__(self):
        self.mode = "assumption"
        self.hypotheses = {}        # a dictionary of (str, Basic) pairs
        self.theorem_str = ""       # a description of the theorem
        self.proof_tree = None      # a ProofTree object: the root of the proof
        self.current_node = None    # a ProofTree object, a node of self.proof_tree
        self.auto_finish = True     # automatically finish the proof when all sorries are cleared

    def assume(self, assumption:Basic, name:str = "this"):
        """ Add a hypothesis to the list of assumptions. """
        if self.mode == "assumption":
            if not isinstance(assumption, Boolean):
                raise ValueError(f"Assumption {assumption} is not a proposition.")
            if not is_defined(assumption, self.get_all_vars()):
                raise ValueError(f"Assumption {assumption} is not defined in terms of the current variables.")
            while name in self.hypotheses:  # avoid namespace collisions
                name += "'"
            self.hypotheses[name] = assumption
        else:
            raise ValueError("Cannot add hypotheses in tactic mode.  Please switch to assumption mode.")

    def auto_finish_on(self):
        """ Automatically finish the proof when all sorries are cleared. """
        print("Proof assistant will automatically exit Tactic mode when proof is complete.")
        self.auto_finish = True

    def auto_finish_off(self):
        """ Do not automatically finish the proof when all sorries are cleared. """
        print("Proof assistant will stay in Tactic mode even when proof is complete.")
        self.auto_finish = False

    def var(self, type:str, name:str = "this") -> Basic:
        """ Introduce a variable of a given type, stored as a Tuple wrapper around a sympy variable of the same type. """
        if self.mode == "assumption":
            while name in self.hypotheses:  # avoid namespace collisions
                name += "'"
            match type:
                case "int":
                    obj = Symbol(name, integer=True)
                case "pos_int":
                    obj = Symbol(name, integer=True, positive=True)
                case "nonneg_int":
                    obj = Symbol(name, integer=True, nonnegative=True)  
                case "real":
                    obj = Symbol(name, real=True)
                case "pos_real":
                    obj = Symbol(name, real=True, positive=True)
                case "nonneg_real":
                    obj = Symbol(name, real=True, nonnegative=True)
                case "rat":
                    obj = Symbol(name, rational=True)
                case "pos_rat":
                    obj = Symbol(name, rational=True, positive=True)
                case "nonneg_rat":
                    obj = Symbol(name, rational=True, nonnegative=True)
                case "bool":
                    obj = Proposition(name)
                case "order":
                    obj = OrderSymbol(name)
                case _:
                    raise ValueError(f"Unknown type {type}.  Currently accepted types: 'int', 'pos_int', 'nonneg_int', 'real', 'pos_real', 'nonneg_real',  `rat`, `pos_rat`, `nonneg_rat`, 'bool', 'order'.")
            self.hypotheses[name] = Type(obj)
            return obj
        else:
            raise ValueError("Cannot introduce variables in tactic mode.  Please switch to assumption mode.")

    def vars(self, type:str, *names:str) -> list[Basic]:
        """ Introduce a list of variables of a given type. """
        if self.mode == "assumption":
            varlist = []
            for name in names:
                varlist.append(self.var(type, name))
            return varlist
        else:
            raise ValueError("Cannot introduce variables in tactic mode.  Please switch to assumption mode.")

    def clear_hypotheses(self):
        """ Clear the list of hypotheses. """
        if self.mode == "assumption":
            self.hypotheses = {}  # clear the hypotheses
        else:
            raise ValueError("Cannot clear hypotheses in tactic mode.  Please switch to assumption mode.")

    def get_state(self) -> ProofState:
        """ Get the current proof state. """
        if self.mode == "assumption":
            raise ValueError("Cannot get proof state in assumption mode.  Please switch to tactic mode.")
        else:
            return self.current_node.proof_state
        
    def get_hypothesis(self, name:str) -> Basic:
        """ Get a hypothesis from the list of assumptions (in Assumption mode) or proof state (in Tactic mode). """
        if self.mode == "assumption":
            assert name in self.hypotheses, f"Hypothesis {name} not found in lisat of assumptions."
            obj = self.hypotheses[name]
            if isinstance(obj, Type):
                raise ValueError(f"Hypothesis {name} is a variable declaration.  Use get_var() to get the variable.")
            return self.hypotheses[name]
        else:
            return self.get_state().get_hypothesis(name)
                
    def get_var(self, name:str) -> Basic:
        """ Get a variable from the list of assumptions (in Assumption mode) or proof state (in Tactic mode). """
        if self.mode == "assumption":
            assert name in self.hypotheses, f"Variable {name} not found in list of assumptions."
            obj = self.hypotheses[name]
            if isinstance(obj, Type):
                return obj.var()
            else:
                raise ValueError(f"Hypothesis {name} is a hypothesis, not a variable.  Use get_hypothesis() to get the hypothesis.")
        else:
            return self.get_state().get_var(name)
        
    def get_vars(self, *names:str) -> list[Basic]:
        """ Get a list of variables from the list of assumptions (in Assumption mode) or proof state (in Tactic mode). """
        varlist = []
        for name in names:
            varlist.append(self.get_var(name))
        return varlist
    
    def get_all_vars(self) -> set[Basic]:
        """ Get all variables from the list of assumptions (in Assumption mode) or proof state (in Tactic mode). """
        if self.mode == "assumption":
            return set([obj.var() for obj in self.hypotheses.values() if isinstance(obj, Type)])
        else:
            return self.get_state().get_all_vars()
                    
    def begin_proof(self, goal: Basic):
        """ Start a proof with a given goal. """
        if self.mode == "assumption":
            if not isinstance(goal, Boolean):
                raise ValueError(f"Goal {goal} is not a proposition.")
            if not is_defined(goal, self.get_all_vars()):
                raise ValueError(f"Goal {goal} is not defined in terms of the current variables.")
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
        """ Return the current proof state. """
        return self.current_node.proof_state
    
    def current_goal(self) -> str:
        """ Return the current goal. """
        return self.current_node.proof_state.goal
        
    def abandon_proof(self):
        """ Abandon the current proof, and clear hypotheses. """
        if self.mode == "tactic":
            self.mode = "assumption"
            self.proof_tree = None
            self.current_node = None
            self.theorem_str = ""
            self.hypotheses = []
        else:
            raise ValueError("Cannot abandon a proof in assumption mode.  Please start a proof first.")
    
    def exit_proof(self):
        """ Exit the current proof, and return to assumption mode (but do not clear hypotheses). """
        if self.mode == "tactic":
            self.mode = "assumption"
            self.current_node = None
            print("Exiting Tactic mode.")
        else:
            raise ValueError("You are already in assumption mode!")

    def enter_proof(self):
        """ Re-enter Tactic mode to view the proof. """
        if self.mode == "assumption":
            self.mode = "tactic"
            self.current_node = self.proof_tree
            print("Re-entering Tactic mode.  Current proof state:")
            print(self.current_proof_state())
        else:
            raise ValueError("You are already in tactic mode!")


    def proof(self) -> str:
        """ Return the current proof tree as a string."""
        if self.proof_tree is None:
            raise ValueError("No proof tree available.")
        else:
            return self.theorem_str + " := by" + "\n" + self.proof_tree.rstr_join(current_node=self.current_node)

    def status(self):
        """ Print the current status of the proof. """
        n = self.proof_tree.num_sorries()
        if n == 0:
            print("Proof complete!")
        elif n == 1:
            print("1 goal remaining.")
        else:
            print(f"{n} goals remaining.")

    def use(self, tactic:Tactic):
        """ Apply a tactic to the current proof state. """
        if self.mode == "tactic":
            self.current_node.use_tactic(tactic)
            self.status()
            _,before,after = self.proof_tree.find_sorry(self.current_node)
            if after is not None:
                self.current_node = after
            elif before is not None:
                self.current_node = before
            else:
            # all goals cleared!
                if self.auto_finish:
                    self.current_node = None
                    self.mode = "assumption"

    def set_current_node(self, node:ProofTree):
        """ Set the current node to a given node in the proof tree. """
        if self.mode == "tactic":
            if node in self.proof_tree.list_sorries():
                self.current_node = node
                _, num_before, num_after = self.proof_tree.count_sorries(self.current_node)
                print(f"Moved to goal {num_before+1} of {num_before+1+num_after}.")
            else:
                self.current_node = node
                print(f"Moved to a proof state currently handled by \"{node.tactic}\").")
        else:
            raise ValueError("Cannot set current node in assumption mode.")


    def next_goal(self):
        """ Move to the next goal in the proof tree. """
        if self.mode == "tactic":
            _,_,after = self.proof_tree.find_sorry(self.current_node)
            if after is not None:
                self.set_current_node(after)
            else:
                print("No subsequent goal to move to.")
        else:
            raise ValueError("Cannot move to next goal in assumption mode.")
    
    def previous_goal(self):
        """ Move to the previous goal in the proof tree. """
        if self.mode == "tactic":
            _,before,_ = self.proof_tree.find_sorry(self.current_node)
            if before is not None:
                self.set_current_node(before)
            else:
                print("No previous goal to move to.")
        else:
            raise ValueError("Cannot move to previous goal in assumption mode.")

    def first_goal(self):
        """ Move to the first goal in the proof tree. """
        if self.mode == "tactic":
            first = self.proof_tree.first_sorry()
            if first is not None:
                self.set_current_node(first)
            else:
                print("No goals to move to.")
        else:
            raise ValueError("Cannot move to first goal in assumption mode.")

    def last_goal(self):
        """ Move to the last goal in the proof tree. """
        if self.mode == "tactic":
            last = self.proof_tree.last_sorry()
            if last is not None:
                self.set_current_node(last)
            else:
                print("No goals to move to.")
        else:
            raise ValueError("Cannot move to last goal in assumption mode.")

    def go_back(self):
        """ Move back a node in the proof tree. """
        if self.mode == "tactic":
            if self.current_node.parent is not None:
                self.set_current_node(self.current_node.parent)
                print("Moved back a step in the proof.")
            else:
                print("Already at start of proof.")
        else:
            raise ValueError("Cannot move back in assumption mode.")

    def go_forward(self, case=1):
        """ Move forward a node in the proof tree. """
        if self.mode == "tactic":
            if len(self.current_node.children) == 0:
                print("There are no more steps in this branch of the proof.")
            elif case > len(self.current_node.children):
                print("There are only {len(self.current_node.children)} cases after this step of the proof.")
            else:
                self.set_current_node(self.current_node.children[case-1])
                if len(self.current_node.children) == 1:
                    print("Moved forward a step in the proof.")
                elif case == 1:
                    print("Moved forward to the first case in the proof.")
                elif case == 2:
                    print("Moved forward to the second case in the proof.")
                elif case == 3:
                    print("Moved forward to the third case in the proof.")
                else:
                    print("Moved forward to case {case} in the proof.")
        else:
            raise ValueError("Cannot move forward in assumption mode.")


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
                output += "\n".join([describe(name, hypothesis) for name, hypothesis in self.hypotheses.items()])
                return output
        else:
            output = f"Proof Assistant is in tactic mode.  Current proof state:\n"
            output += str(self.current_proof_state()) 
            if self.current_node.tactic is None:
                count = self.proof_tree.num_sorries()
                if count > 1:
                    _, before, _ = self.proof_tree.count_sorries(self.current_node)
                    output += f"\nThis is goal {before+1} of {count}."
            else:
                num_children = len(self.current_node.children)
                if num_children == 0:
                    output += f"\nThis goal was solved with \"{self.current_node.tactic}\"."
                else:
                    if num_children == 1:
                        output += f"\nThe next step in the proof is \"{self.current_node.tactic}\"."
                    else:
                        output += f"\nThe next step in the proof is \"{self.current_node.tactic}\", generating {num_children} sub-goals."
            return output

