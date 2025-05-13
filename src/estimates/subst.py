from sympy import Basic, Eq, true

from estimates.basic import Type, is_defined, new_var, typeof
from estimates.proofstate import ProofState
from estimates.tactic import Tactic
from estimates.simp import simp

# Substitution tactics


class Let(Tactic):
    """
    A tactic to introduce a new variable, defined to equal a given expression.
    """

    def __init__(self, name: str, expr: Basic) -> None:
        """
        :param name: The name of the new variable.
        :param expr: The expression to set the new variable equal to.
        """
        self.name = name
        self.expr = expr

    def activate(self, state: ProofState) -> list[ProofState]:
        if not is_defined(self.expr, state.get_all_vars()):
            raise ValueError(
                f"{self.expr!s} is not defined in the current proof state."
            )
        name = state.new(self.name)
        newstate = state.copy()
        var = new_var(typeof(self.expr), name)
        newstate.hypotheses[name] = Type(var)
        print(f"Letting {name} := {self.expr}.")
        def_name = state.new(self.name + "_def")
        newstate.hypotheses[def_name] = Eq(var, self.expr)
        return [newstate]

    def __str__(self) -> str:
        return f"let {self.name} := {self.expr}"


class Set(Tactic):
    """
    A tactic to introduce a new variable, defined to equal a given expression, then substitute all instances of that expression with the variable.
    """

    def __init__(self, name: str, expr: Basic) -> None:
        """
        :param name: The name of the new variable.
        :param expr: The expression to set the new variable equal to.
        """
        self.name = name
        self.expr = expr

    def activate(self, state: ProofState) -> list[ProofState]:
        if not is_defined(self.expr, state.get_all_vars()):
            raise ValueError(
                f"{self.expr!s} is not defined in the current proof state."
            )
        name = state.new(self.name)
        newstate = state.copy()
        var = new_var(typeof(self.expr), name)
        newstate.hypotheses[name] = Type(var)
        print(f"Setting {name} := {self.expr}.")

        for other_name, other_expr in state.hypotheses.items():
            if not isinstance(other_expr, Type):
                newstate.hypotheses[other_name] = other_expr.subs(self.expr, var)

        newstate.set_goal(state.goal.subs(self.expr, var))

        def_name = state.new(self.name + "_def")
        newstate.hypotheses[def_name] = Eq(var, self.expr)
        return [newstate]

    def __str__(self) -> str:
        return f"set {self.name} := {self.expr}"


class Subst(Tactic):
    """
    A tactic to use an existing equality hypothesis `X=Y` to substitute all instances of `X` with `Y` in the goal, or in a specified hypothesis."""

    def __init__(
        self, hyp: str, target: str | None = None, reversed: bool = False
    ) -> None:
        """
        :param hyp: The hypothesis to use for substitution.
        :param target: The statement to apply substitution (`None` means to apply it to the goal.
        :param reversed: If `True`, substitute `Y` for `X` instead of `X` for `Y`."""
        self.hyp = hyp
        self.target = target
        self.reversed = reversed

    def activate(self, state: ProofState) -> list[ProofState]:
        if self.hyp not in state.hypotheses:
            raise ValueError(
                f"{self.hyp} is not a hypothesis in the current proof state."
            )
        hyp = state.hypotheses[self.hyp]
        if not isinstance(hyp, Eq):
            raise ValueError(f"{self.hyp} is not an equality hypothesis.")
        if self.hyp == self.target:
            print(
                "Warning: substituting a hypothesis into itself will lose information."
            )

        if self.target is None:
            target = state.goal
        else:
            if self.target not in state.hypotheses:
                raise ValueError(
                    f"{self.target} is not a hypothesis in the current proof state."
                )
            target = state.hypotheses[self.target]
            if isinstance(target, Type):
                raise ValueError(
                    "Cannot target a variable declaration for substitution."
                )

        if self.reversed:
            newtarget = simp(target.subs(hyp.rhs, hyp.lhs))
            if newtarget != target:
                print(
                    f"Substituted {self.hyp} in reverse to replace {target} with {newtarget}."
                )
        else:
            newtarget = simp(target.subs(hyp.lhs, hyp.rhs))
            if newtarget != target:
                print(f"Substituted {self.hyp} to replace {target} with {newtarget}.")

        if newtarget == target:
            print("Substitution had no effect.")

        if newtarget == true and self.target == None:
            print("Goal proved!")
            return []

        newstate = state.copy()
        if self.target is None:
            newstate.set_goal(newtarget)
        else:
            newstate.hypotheses[self.target] = newtarget
        return [newstate]

    def __str__(self) -> str:
        name = "<-" + str(self.hyp) if self.reversed else str(self.hyp)
        if self.target is None:
            return f"subst {name}"
        else:
            return f"subst {name} at {self.target}"


class SubstAll(Tactic):
    """
    Use an existing equality hypothesis `X=Y` to substitute all instances of `X` with `Y` in the goal as well as all other hypotheses (other than variable declarations)."""

    def __init__(self, hyp: str, reversed: bool = False) -> None:
        """
        :param hyp: The hypothesis to use for substitution.
        :param reversed: If `True`, substitute `Y` for `X` instead of `X` for `Y`."""
        self.hyp = hyp
        self.reversed = reversed

    def activate(self, state: ProofState) -> list[ProofState]:
        if self.hyp not in state.hypotheses:
            raise ValueError(
                f"{self.hyp} is not a hypothesis in the current proof state."
            )
        hyp: Basic = state.hypotheses[self.hyp]
        if not isinstance(hyp, Eq):
            raise ValueError(f"{self.hyp} is not an equality hypothesis.")

        if self.reversed:
            hyp = hyp.reversed()

        newstate = state.copy()

        for other_name, other_expr in state.hypotheses.items():
            if isinstance(other_expr, Type):
                continue
            if self.hyp == other_name:
                continue  # don't substitute a hypothesis into itself

            newtarget = other_expr.subs(hyp.lhs, hyp.rhs)
            if newtarget != other_expr:
                if self.reversed:
                    print(
                        f"Substituted {self.hyp} in reverse to replace {other_expr} with {newtarget}."
                    )
                else:
                    print(
                        f"Substituted {self.hyp} to replace {other_expr} with {newtarget}."
                    )
            newstate.hypotheses[other_name] = newtarget

        newtarget = state.goal.subs(hyp.lhs, hyp.rhs)
        if newtarget != state.goal:
            if self.reversed:
                print(
                    f"Substituted {self.hyp} in reverse to replace {state.goal} with {newtarget}."
                )
            else:
                print(
                    f"Substituted {self.hyp} to replace {state.goal} with {newtarget}."
                )
        newstate.set_goal(newtarget)

        if newstate == state:
            print("Substitution had no effect.")
        if newtarget == true:
            print("Goal proved!")
            return []
        return [newstate]

    def __str__(self) -> str:
        name = "<-" + str(self.hyp) if self.reversed else str(self.hyp)
        return f"subst_all {name}"
