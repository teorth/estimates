from sympy import Basic, Eq, S

from estimates.basic import describe, is_defined
from estimates.proofstate import ProofState
from estimates.tactic import Tactic


class Lemma:
    """A base class for a lemma object, to be used by the use_lemma() method."""

    def __init__(self, *args) -> None:
        self.name = "Unimplemented"

    def apply(self, state: ProofState) -> Basic:
        """
        Return the sympy proposition that the lemma proves, using hypotheses from the proof state as needed to justify the hypotheses of the lemma and the well-definedness of all expressions.
        """
        raise NotImplementedError("This method should be implemented in a subclass.")

    def __str__(self) -> str:
        return self.name


class UseLemma(Tactic):
    """
    A tactic to apply a lemma to the current proof state.
    """

    def __init__(self, hyp: str, lemma: Lemma) -> None:
        self.hyp = hyp
        self.lemma = lemma

    def activate(self, state: ProofState) -> list[ProofState]:
        hyp = state.new(self.hyp)
        statement = self.lemma.apply(state)
        newstate = state.copy()
        newstate.hypotheses[hyp] = statement
        print(f"Applying lemma {self.lemma} to conclude {describe(hyp, statement)}.")
        return [newstate]

    def __str__(self) -> str:
        return f"{self.hyp} := {self.lemma}"


class Amgm(Lemma):
    """
    The arithmetic mean-geometric mean inequality.  This is a sample lemma to test the code.
    """

    def __init__(self, *vars: Basic) -> None:
        assert len(vars) > 0, "At least one variable is required."
        self.vars = [S(x) for x in vars]
        for x in vars:
            assert x.is_nonnegative, f"{x} must be a nonnegative expression."

    def apply(self, state: ProofState) -> Basic:
        for x in self.vars:
            assert is_defined(x, state.get_all_vars()), (
                f"{x} is not defined in the current proof state."
            )
        prod = 1
        sum = 0
        for x in self.vars:
            prod *= x
            sum += x
        return prod ** (1 / len(self.vars)) <= sum / len(self.vars)

    def __str__(self) -> str:
        return "am_gm(" + ", ".join(str(x) for x in self.vars) + ")"


class Rfl(Lemma):
    """
    The reflexive axiom: any expression is equal to itself.
    """

    def __init__(self, expr: Basic) -> None:
        self.expr = expr

    def apply(self, state: ProofState) -> Basic:
        assert is_defined(self.expr, state.get_all_vars()), (
            f"{self.expr} is not defined in the current proof state."
        )
        return Eq(self.expr, self.expr, evaluate=False)

    def __str__(self) -> str:
        return f"rfl({self.expr})"
