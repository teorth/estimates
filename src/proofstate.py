from basic import *

## Proof states describe the current state of a proof (a list of hypotheses and a goal).  The hypotheses are a dictionary of string-Basic pairs that match a hypothesis name to the sympy basic class they represent.  The goals are stored as sympy basic classes.

## Goals should be predicate objects.  Hypotheses can be either predicates or variables.  In the latter case, the name of the hypothesis should match the name of the variable.

class ProofState:
    def __init__(self, goal: Basic, hypotheses:dict[str, Basic] = None):
        """
        Initialize a proof state with a name, a goal, and an optional list of hypotheses.
        
        :param name: The name of the proof state.
        :param goal: The goal of the proof state.
        :param hypotheses: A list of hypotheses for the proof state (optional).
        """
        self.goal = goal
        self.hypotheses = hypotheses if hypotheses is not None else {}

    def set_goal(self, goal: Basic):
        """
        Set the goal of the proof state.
        
        :param goal: The new goal for the proof state.
        """
        self.goal = goal

    def copy(self) -> 'ProofState':
        """
        Create a copy of the proof state.
        
        :return: A new ProofState object with the same goal and hypotheses.
        """
        return ProofState(self.goal, self.hypotheses.copy())
    
    def new(self, name:str) -> str:
        """ returns the first unused version of name (adding primes as needed) that isn't already claimed as a hypothesis """
        new_name = name
        while new_name in self.hypotheses:
                new_name += "'" 
        return new_name
    
    def remove_hypothesis(self, name:str):
        """ Remove a hypothesis from the proof state. """
        assert name in self.hypotheses, f"Hypothesis {name} not found in proof state."
        if isinstance(self.hypotheses[name], Type):
            raise ValueError(f"Hypothesis {name} is a variable declaration.  Removing variables is currently unimplemented.")
            # TODO: allow for variables to be removed if no hypotheses or goals uses them
        else:
            del self.hypotheses[name]
    
    def get_hypothesis(self, name:str) -> Basic:
        """ Get a hypothesis from the proof state. """
        assert name in self.hypotheses, f"Hypothesis {name} not found in proof state."
        obj = self.hypotheses[name]
        if isinstance(obj, Type):
            raise ValueError(f"Hypothesis {name} is a variable declaration.  Use get_var() to get the variable.")
        return self.hypotheses[name]
    
    def get_var(self, name:str) -> Basic:
        """ Get a variable from the proof state. """
        assert name in self.hypotheses, f"Variable {name} not found in proof state."
        obj = self.hypotheses[name]
        if isinstance(obj, Type):
            return obj.var()
        else:
            raise ValueError(f"Hypothesis {name} is a hypothesis, not a variable.  Use get_hypothesis() to get the hypothesis.")

    def rename_hypothesis(self, old_name:str, new_name:str) -> str:
        """ Rename a hypothesis in the proof state. """
        if old_name in self.hypotheses:
            if new_name in self.hypotheses:
                raise ValueError(f"Hypothesis {new_name} already exists.  Please choose a different name.")
            else:
                if isinstance(self.hypotheses[old_name], Type):
                    raise ValueError(f"Hypothesis {old_name} is a variable declaration.  Renaming variables is currently unimplemented.")
                    # May be best to keep this functionality disabled, as things get confusing if the proofstate name and the sympy name for a variable are permitted to diverge.  Alternatively, if one renames a proofstate variable, one could create a sympy variable with the new name and swap all occurrences of the old name with the new name.  This would be a bit of a pain to implement, though.
                else:
                    hyp  = self.hypotheses[old_name]
                    del self.hypotheses[old_name]
                    new_name = self.new(new_name)
                    self.hypotheses[new_name] = hyp
                    return new_name
        else:
            raise ValueError(f"Hypothesis {old_name} not found in proof state.")

    def var(self, name:str = "this") -> Basic:
        # Return the sympy variable associated to this name, if it exists
        assert name in self.hypotheses, f"Variable {name} not found in proof state."
        assert isinstance(self.hypotheses[name], Type), f"{describe(name, self.hypotheses[name])} is a hypothesis, not a variable."
        return self.hypotheses[name].var()
        
    def new_hypothesis(self, name:str, hypothesis:Basic) -> str:
        """ Add a new hypothesis to the proof state, updating the name if necessary.  Returns the name of the hypothesis. """
        name = self.new(name)
        self.hypotheses[name] = hypothesis
        return name
    
    def list_hypotheses(self, variables=False) -> list[Basic]:
        """ Return a list of the names of the hypotheses in the proof state.  By default, variable declarations are excluded. """
        if variables:
            return list(self.hypotheses.values())
        else:
            return [var for var in self.hypotheses.values() if not isinstance(var, Type)]

        
    def __str__(self):
        output = []
        for name, hypothesis in self.hypotheses.items():
            output.append(describe(name, hypothesis))
        output.append(f"|- {self.goal}")
        return "\n".join(output)
        
