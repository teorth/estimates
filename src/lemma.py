from tactic import *


class Lemma:
    """ A base class for a lemma object, to be used by the use_lemma() method."""

    def __init__(self, *args):
        self.name = "Unimplemented"

    def apply(self, state: ProofState) -> Basic:
        """
        Return the sympy proposition that the lemma proves, using hypotheses from the proof state as needed to justify the hypotheses of the lemma and the well-definedness of all expressions.
        """
        raise NotImplementedError("This method should be implemented in a subclass.")

    def __str__(self):
        return self.name


class UseLemma(Tactic):
    """
    A tactic to apply a lemma to the current proof state.
    """

    def __init__(self, hyp: str, lemma: Lemma):
        self.hyp = hyp
        self.lemma = lemma

    def activate(self, state: ProofState) -> list[ProofState]:
        hyp = state.new(self.hyp)
        statement = self.lemma.apply(state)
        newstate = state.copy()
        newstate.hypotheses[hyp] = statement
        print(f"Applying lemma {self.lemma} to conclude {describe(hyp,statement)}.")
        return [newstate]
    
    def __str__(self):
        return f"{self.hyp} := {self.lemma}"
    
class Amgm(Lemma):
    """
    The arithmetic mean-geometric mean inequality.  This is a sample lemma to test the code.
    """

    def __init__(self, x : Basic, y : Basic):
        self.x = S(x)
        self.y = S(y)
        assert self.x.is_nonnegative, "x must be a nonnegative expression."
        assert self.y.is_nonnegative, "y must be a nonnegative expression." 
        
    def apply(self, state: ProofState) -> Basic:
        assert is_defined(self.x, state.get_all_vars()), f"{self.x} is not defined in the current proof state."
        assert is_defined(self.y, state.get_all_vars()), f"{self.y} is not defined in the current proof state."
        return (self.x*self.y)**(1/2) <= (self.x+self.y)/2
    
    def __str__(self):
        return f"am_gm({self.x}, {self.y})"