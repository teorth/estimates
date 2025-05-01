# Symbolic expression classes for order of magnitude estimates (where we only care about magnitudes up to a constant factor)

class Expression:
    def __add__(self, other):
        return Add(self, other)
    def __mul__(self, other):
        return Mul(self, other)
    def __truediv__(self, other):
        return Div(self, other)
    def __pow__(self, other):
        return Power(self, other)
    def __le__(self, other):
        return Statement(self, '<~', other)
    def __ge__(self, other):
        return Statement(self, '>~', other)
    def __eq__(self, other):
        return Statement(self, '~', other)

    def __str__(self):
        raise NotImplementedError("Must implement __str__ in subclasses")
    def __repr__(self):
        return str(self)

class Variable(Expression):
    def __init__(self, name, dtype="magnitude"):  # for now, the default type is a positive magnitude
        self.name = name
        self.dtype = dtype
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


# Overloading comparison operators to create Statement objects

class Statement:
    def __init__(self, left, op, right):
        self.left = left
        self.op = op
        self.right = right
    def __str__(self):
        return f"{self.left} {self.op} {self.right}"
    def __repr__(self):
        return str(self)

# Example usage
N_1 = Variable("N_1")
N_2 = Variable("N_2")
N_3 = Variable("N_3")
expr = (max(N_1, N_2)) * (N_3**3) /N_1
print("Expression is:", expr)
S = (expr <= N_2 ** 1)
print("Statement is:", S)