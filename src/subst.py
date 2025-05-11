from tactic import *

# Substitution tactics

class Let(Tactic):
    """
    A tactic to introduce a new variable, defined to equal a given expression.
    """

    def __init__(self, name: str, expr: Basic):
        """
        :param name: The name of the new variable.
        :param expr: The expression to set the new variable equal to.
        """
        self.name = name
        self.expr = expr
    
    def activate(self, state: ProofState) -> list[ProofState]:
        if not is_defined(self.expr, state.get_all_vars()):
            raise ValueError(f"{str(self.expr)} is not defined in the current proof state.")
        name = state.new(self.name)
        newstate = state.copy()
        var = new_var(typeof(self.expr), name)
        newstate.hypotheses[name] = Type(var)
        print(f"Letting {name} := {self.expr}.")
        def_name = state.new(self.name + "_def")
        newstate.hypotheses[def_name] = Eq(var,self.expr)
        return [newstate]

    def __str__(self):
        return f"let {self.name} := {self.expr}"



class Set(Tactic):
    """
    A tactic to introduce a new variable, defined to equal a given expression, then substitute all instances of that expression with the variable.
    """

    def __init__(self, name: str, expr: Basic):
        """
        :param name: The name of the new variable.
        :param expr: The expression to set the new variable equal to.
        """
        self.name = name
        self.expr = expr
    
    def activate(self, state: ProofState) -> list[ProofState]:
        if not is_defined(self.expr, state.get_all_vars()):
            raise ValueError(f"{str(self.expr)} is not defined in the current proof state.")
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
        newstate.hypotheses[def_name] = Eq(var,self.expr)
        return [newstate]

    def __str__(self):
        return f"set {self.name} := {self.expr}"
    
class Subst(Tactic):
    """
    A tactic to use an existing equality hypothesis `X=Y` to substitute all instances of `X` with `Y` in the goal, or in a specified hypothesis."""

    def __init__(self, hyp: str, target: str = None, reversed: bool = False):
        """
        :param hyp: The hypothesis to use for substitution.
        :param target: The statement to apply substitution (`None` means to apply it to the goal.
        :param reversed: If `True`, substitute `Y` for `X` instead of `X` for `Y`."""
        self.hyp = hyp
        self.target = target
        self.reversed = reversed
        # we don't guard against `hyp` and `target` matching; it is unlikely to be a useful move, but is technically valid.

    def activate(self, state: ProofState) -> list[ProofState]:
        if self.hyp not in state.hypotheses:
            raise ValueError(f"{self.hyp} is not a hypothesis in the current proof state.")
        hyp = state.hypotheses[self.hyp]
        if not isinstance(hyp, Eq):
            raise ValueError(f"{self.hyp} is not an equality hypothesis.")
        
        if self.target is None:
            target = state.goal
        else:
            if self.target not in state.hypotheses:
                raise ValueError(f"{self.target} is not a hypothesis in the current proof state.")
            target = state.hypotheses[self.target]
        
        if self.reversed:
            newtarget = target.subs(hyp.rhs, hyp.lhs)
            print(f"Substituted {self.hyp} in reverse to replace {target} with {newtarget}.")
        else:
            newtarget = target.subs(hyp.lhs, hyp.rhs)
            print(f"Substituted {self.hyp} to replace {target} with {newtarget}.")

        if newtarget == true and self.target == None:
            print("Goal proved!")
            return []

        newstate = state.copy()
        if self.target is None:
            newstate.set_goal(newtarget)
        else:
            newstate.hypotheses[self.target] = newtarget
        return [newstate]

    def __str__(self):
        if self.target is None:
            return f"subst {self.hyp}"
        else:
            return f"subst {self.hyp} at {self.target}"
        