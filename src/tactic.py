from proofstate import *

## Tactics are operations that can transform a proof state into one or more proof states.  

class Tactic:
    def activate(self, state: ProofState) -> list[ProofState]:
        """
        Activate the tactic on the given proof state.  Will return any proof states that remain after applying the tactic.  
        """
        raise NotImplementedError("This tactic has not implemented an activate() method yet.")
    
    def __str__(self):
        raise NotImplementedError("This tactic has not implemented a __str__() method yet.")


