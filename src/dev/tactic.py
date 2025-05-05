## Tactics are operations that can transform a proof state into one or more proof states.  For now, implemented as a stub that describes the operation in a string.

## actual, specific tactics should go in another python file, in particular one that imports proofstates (since almost all tactics will need to modify the proof state)

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
