from proofstate import *

## Tactics are operations that can transform a proof state into one or more proof states.  

class Tactic:
    def activate(self, state: ProofState) -> list[ProofState]:
        """
        Activate the tactic on the given proof state.  Will return any proof states that remain after applying the tactic.  
        """
        raise NotImplementedError("Tactics should be implemented in a derived class.")
        
    def __str__(self):
        raise NotImplementedError("Tactics should be implemented in a derived class.")


