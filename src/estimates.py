# Symbolic expression classes for order of magnitude estimates (where we only care about magnitudes up to a constant factor)


# An expression is a formal combination of variables, where the variables represent orders of magnitude, combined using sums, products, quotients, powers, min, and max.

class Expression:
    def __add__(self, other):
        return Add(self, ensure_expr(other))
    def __radd__(self, other):
        return Add(ensure_expr(other), self)
    def __mul__(self, other):
        return Mul(self, ensure_expr(other))
    def __rmul__(self, other):
        return Mul(ensure_expr(other), self)
    def __truediv__(self, other):
        return Div(self, ensure_expr(other))
    def __rtruediv__(self, other):
        return Div(ensure_expr(other), self)
    def __pow__(self, other):
        return Power(self, ensure_expr(other))
    def __rpow__(self, other):
        return Power(ensure_expr(other), self)
    def __le__(self, other):
        return Statement(self, '<~', ensure_expr(other))
    def __ge__(self, other):
        return Statement(self, '>~', ensure_expr(other))
    def __eq__(self, other):
        return Statement(self, '~', ensure_expr(other))
    def __str__(self):
        raise NotImplementedError("Must implement __str__ in subclasses")
    def __repr__(self):
        return str(self)

class Variable(Expression):
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return self.name

class Add(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right
    def __str__(self):
        # Parenthesize to preserve clarity in nested expressions
        return f"({self.left} + {self.right})"

class Mul(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right
    def __str__(self):
        # Parenthesize to preserve clarity in nested expressions
        return f"({self.left} * {self.right})"

class Div(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right
    def __str__(self):
        # Parenthesize to preserve clarity in nested expressions
        return f"({self.left} / {self.right})"

class Power(Expression):
    def __init__(self, base, exponent):
        self.base = base
        self.exponent = exponent
    def __str__(self):
        # Parenthesize to preserve clarity in nested expressions
        return f"({self.base} ** {self.exponent})"

class Max(Expression):
    def __init__(self, *operands):
        self.operands = operands
    def __str__(self):
        inner = ", ".join(str(op) for op in self.operands)
        return f"max({inner})"

# Factory function (this will shadow Python's built‑in max in this module)
def max(*args):
    # Assuming all args are Expression instances
    return Max(*args)

class Min(Expression):
    def __init__(self, *operands):
        self.operands = operands
    def __str__(self):
        inner = ", ".join(str(op) for op in self.operands)
        return f"min({inner})"
    
def min(*args):
    # Assuming all args are Expression instances
    return Min(*args)

def ensure_expr(obj):
    """If obj is already an Expression, return it;
       otherwise wrap it in a Constant."""
    return obj if isinstance(obj, Expression) else Constant(obj)

class Constant(Expression):
    def __init__(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError("Constant only accepts int/float")
        self.value = value

    def __str__(self):
        # drop the .0 for ints
        if isinstance(self.value, int) or self.value.is_integer():
            return str(int(self.value))
        return str(self.value)


# Statements are formal assertions involving expressions X, Y, such as X \lesssim Y, X \sim Y, or X \gtrsim Y.
# 
class Statement:
    def __init__(self, left, op, right):
        self.left = left
        self.op = op
        self.right = right
    def __str__(self):
        return f"{self.left} {self.op} {self.right}"
    def __repr__(self):
        return str(self)



def variables(expr):
    """Extracts all variables from an expression."""
    if isinstance(expr, Variable):
        return {expr.name}
    elif isinstance(expr, (Add, Mul, Div)):
        vars_left = variables(expr.left)
        vars_right = variables(expr.right)
        return vars_left.union(vars_right)
    elif isinstance(expr, Power):
        return variables(expr.base)  # ignore exponents for now
    elif isinstance(expr, Max) or isinstance(expr, Min):
        vars_operands = set()
        for operand in expr.operands:
            vars_operands.update(variables(operand))
        return vars_operands
    elif isinstance(expr, Statement):
        vars_left = variables(expr.left)
        vars_right = variables(expr.right)
        return vars_left.union(vars_right)
    else:
        return set()  # No variables found in this expression



# Example usage
N_1 = Variable("N_1")
N_2 = Variable("N_2")
N_3 = Variable("N_3")
N_4 = Variable("N_4")
expr = (max(N_1, N_2)) * (N_3**3) /N_1
print("Expression is:", expr)
S = (expr <= 1 / N_4)
print("Statement is:", S)
print("Variables in the expression:", variables(expr))
print("Variables in the statement:", variables(S))