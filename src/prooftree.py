
from proofstate import *
from tactic import *

# Support for proof trees and tactics, mimicking a Lean-type tactic proof environment.



# A proof tree consists of the following objects:

## The current proof state
## The parent proof state (or None, if this is the root)
## The tactic used to transform this state into new states (or None, if the state is "sorried")
## A list of proof states that are children of this state (representing the tasks left to do by the current tactic)

class ProofTree:
    def __init__(self, proof_state: ProofState):
        """
        Initialize a proof tree node with a proof state.
        """
        self.proof_state = proof_state
        self.parent = None  # parents are managed automatically by the add_sorry method
        self.tactic = None  # Proof trees are initialized as a "sorry", so the tactic is None
        self.children = []  # Must be empty if self.tactic is None; can also be empty if self.tactic completes the goal

    def add_sorry(self, proof_state) -> 'ProofTree':
        """Add a child proof tree node as a 'sorry'."""
        child = ProofTree(proof_state)
        child.parent = self
        self.children.append(child)
        return child
    
    # apply a tactic and create children nodes with the resulting indicated proof states
    def use_tactic(self, tactic: Tactic):
        self.tactic = tactic
        proof_state_list = tactic.activate(self.proof_state)
        for proof_state in proof_state_list:
            self.add_sorry(proof_state)
        
    # Recursively generate a list of strings representing of the proof tree, with indentation for each level.  Highlight the node if it is the current node
    def rstr(self, indent:str = "  ", next_indent:str = "  ", current_node:'ProofTree' = None) -> list[str]:
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
    
    def list_sorries(self, exclude : list['ProofTree'] = []) -> list['ProofTree']:
        """Return a list of sorry nodes in the proof tree, optionally excluding a given node."""
        if self in exclude:
            return []
        elif self.tactic is None:
            return [self]
        else:
            sorries = []
            for child in self.children:
                sorries.extend(child.list_sorries(exclude))
            return sorries

    def num_sorries(self, exclude : list['ProofTree'] = []) -> int:
        """Return the number of sorries in the proof tree, optionally excluding a given node."""
        return len(self.list_sorries(exclude))
                
    def is_sorry_free(self) -> bool:
        """Return True if the proof tree is free of sorries."""
        return self.num_sorries() == 0
    
    def first_sorry(self) -> 'ProofTree':
        """Return the first sorry node in the proof tree."""
        sorries = self.list_sorries()
        if len(sorries) == 0:
            return None
        else:
            return sorries[0]

    def last_sorry(self) -> 'ProofTree':
        """Return the last sorry node in the proof tree."""
        sorries = self.list_sorries()
        if len(sorries) == 0:
            return None
        else:
            return sorries[len(sorries)-1]

    # recursively trace through the proof tree to find
    #
    ## whether the target appeared in the tree
    ## the last "sorry" node before a given target (if present), or the last "sorry" node, period
    ## the first "sorry" after the given target (if present), or the first "sorry" node, period
    def find_sorry(self, target:'ProofTree') -> tuple[bool, 'ProofTree', 'ProofTree']:
        if self == target:
            for child in self.children:
                _, _, first = child.find_sorry(target)
                if first is not None:
                    return True, None, first
            return True, None, None
        if self.tactic is None:
            return False, self, self
        before = None
        after = None
        found_target = False
        for child in self.children:
            found, last_before, first_after = child.find_sorry(target)
            if found:
                found_target = True
                if last_before is not None:
                    before = last_before
                after = first_after
            else:
                if found_target:
                    if after is None:
                        after = first_after
                else:
                    before = last_before
        return (found_target, before, after)
    
    # recursively trace through the proof tree to find
    #
    ## whether the target appeared in the tree
    ## how many sorries appeared before the target (if present), or the total number of sorries, period 
    ## how many sorries appeared after the target (if present), or the total number of sorries, period
    def count_sorries(self, target:'ProofTree') -> tuple[bool, int, int]:
        if self == target:
            before = 0
            after = 0
            for child in self.children:
                found, before_count, after_count = child.count_sorries(target)
                if found:
                    after += after_count
                else:
                    before += before_count
            return True, before, after
        if self.tactic is None:
            return False, 1, 1
        before = 0
        after = 0
        found_target = False
        for child in self.children:
            found, before_count, after_count = child.count_sorries(target)
            if found:
                found_target = True
                before += before_count
                after += after_count
            else:
                if found_target:
                    after += after_count
                else:
                    before += before_count 
        return (found_target, before, after)

    def __str__(self):
        return self.rstr_join()
    
