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
