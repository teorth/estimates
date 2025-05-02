import networkx as nx
import pulp
import itertools
from itertools import product

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
    def __hash__(self):
        # Use the object’s identity so that two different objects
        # are always distinct in hash tables.
        return id(self)
    def __le__(self, other):
        return Statement(self, '<~', ensure_expr(other))
    def __ge__(self, other):
        return Statement(self, '>~', ensure_expr(other))
    def __eq__(self, other):  # need equality for hash comparison; use comparable() instead for X ~ Y
        return self is other  
    def __str__(self):
        raise NotImplementedError("Must implement __str__ in subclasses")
    def __repr__(self):
        return str(self)
    def clean(self): # removes constants
        if isinstance(self, Constant):
            return one
        else:
            return self

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
# TODO: typecheck that exponent is a constant
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

one = Constant(1)  # need a global constant here for equality checks (other instances of Constant(1) might not be equal to one.  Perhaps there is a more pythonic way to do this?)

# return a dictionary where the keys are the terms in the expression and the values are the exponents in which they appear
def monomials(expr):
    """Returns a dictionary of monomials in the expression with their exponents."""
    if isinstance(expr, (Variable, Add, Max, Min)):
        return {expr: 1}
    elif isinstance(expr, Constant):
        return {}  # ignore all constants
    elif isinstance(expr, Mul):
        left_monomials = monomials(expr.left)
        right_monomials = monomials(expr.right)
        # Multiply the dictionaries (add exponents for common terms)
        for key, value in right_monomials.items():
            left_monomials[key] = left_monomials.get(key, 0) + value
        return left_monomials
    elif isinstance(expr, Div):
        numerator = monomials(expr.left)
        denominator = monomials(expr.right)
        # Subtract exponents for division
        for key, value in denominator.items():
            numerator[key] = numerator.get(key, 0) - value
        return numerator
    elif isinstance(expr, Power):
        base_monomials = monomials(expr.base)
        exponent = expr.exponent.value if isinstance(expr.exponent, Constant) else 1  # Assume exponent is a constant for now
        # Raise each term to the power of the exponent
        for key in base_monomials.keys():
            base_monomials[key] *= exponent
        return base_monomials
    else:
        raise TypeError(f"Unsupported expression type: {type(expr)}")

# return the simplified expression formed by gathering terms
def monomial_simplify(expr):
    if isinstance(expr, Statement):
        # Simplify the left and right expressions of the statement
        left = monomial_simplify(expr.left)
        right = monomial_simplify(expr.right)
        return Statement(left, expr.op, right)
    else:
        first = True
        result = one
        for key, value in monomials(expr).items():
            if value == 0:
                factor = one
            elif value == 1:
                factor = key
            else:
                factor = key ** value
            if first:
                result = factor
                first = False
            else:
                result = result * factor
        return result  

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

def comparable(expr1, expr2):
    """Returns a statement that compares two expressions."""
    if isinstance(expr1, Expression) and isinstance(expr2, Expression):
        return Statement(expr1, '~', expr2)
    else:
        raise TypeError("Both arguments must be Expression instances")

# list all the variables found in an expression
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

# list all the expressions in a set of statements
def expressions(statements):
    """Extracts all expressions from a set of statements."""
    exprs = set()
    for statement in statements:
        exprs.add(statement.left)
        exprs.add(statement.right)
    return exprs



# define all the splittings associated to max(args)
def cases_max(*args):
    cases = []
    for expr in args:
        ordering = []
        for other_expr in args:
            if expr != other_expr:
                ordering.append(other_expr <= expr)
        cases.append(ordering)
    return cases

# define all splittings associated to min(args)
def cases_min(*args):
    cases = []
    for expr in args:
        ordering = []
        for other_expr in args:
            if expr != other_expr:
                ordering.append(expr <= other_expr)
        cases.append(ordering)
    return cases

# define all splittings associated to a Littlewood-Paley constraint (sum to zero)
def cases_lp(args):
    cases = []
    for expr1, expr2 in itertools.combinations(args, 2):
        ordering = [comparable(expr1,expr2)]
        for other_expr in args:
            if other_expr != expr1 and other_expr != expr2:
                ordering.append(other_expr <= expr1)
        cases.append(ordering)
    return cases


# An Ordering directed graph, where an edge from A to B means A is bounded by a constant times B
class Ordering:
    def __init__(self):
        self.graph = nx.DiGraph()
        self.statements = set()

    def __str__(self):
        return(str(self.statements))
         
    """Assumes a statement, adding it to the directed graph of of hypotheses."""
    def add(self, statement):
        self.statements.add(statement)
        match statement.op:
            case '<~':
                self.graph.add_edge(statement.left.clean(), statement.right.clean())
            case '>~':
                self.graph.add_edge(statement.right.clean(), statement.left.clean())
            case '~':
                self.graph.add_edge(statement.left.clean(), statement.right.clean())
                self.graph.add_edge(statement.right.clean(), statement.left.clean())
            case _:
                raise ValueError(f"Unknown operator: {statement.op}")

# sees of a statement can be directly proven from the hypotheses and transitivity
    def can_prove(self, statement):
        match statement.op:
            case '<~':
                return nx.has_path(self.graph, statement.left.clean(), statement.right.clean())
            case '>~':
                return nx.has_path(self.graph, statement.right.clean(), statement.left.clean())
            case '~':
                return (nx.has_path(self.graph, statement.left.clean(), statement.right.clean()) and
                        nx.has_path(self.graph, statement.right.clean(), statement.left.clean())) 

    def maximal_elements(self, expressions):
        """Returns the potentially maximal elements in a set of expressions."""
        new_expressions = expressions.copy()
        for expr1, expr2 in itertools.combinations(expressions, 2):
            if expr1 in new_expressions and expr2 in new_expressions:
                if self.can_prove(expr1 <= expr2):
                    new_expressions.discard(expr1)
                elif self.can_prove(expr2 <= expr1):
                    new_expressions.discard(expr2)
        return new_expressions
    
    def minimal_elements(self, expressions):
        """Returns the potentially minimal elements in a set of expressions."""
        new_expressions = expressions.copy()
        for expr1, expr2 in itertools.combinations(expressions, 2):
            if expr1 in new_expressions and expr2 in new_expressions:
                if self.can_prove(expr1 <= expr2):
                    new_expressions.discard(expr2)
                elif self.can_prove(expr2 <= expr1):
                    new_expressions.discard(expr1)
        return new_expressions

    def order_simplify(self, expr):
        """Simplifies an expression using the ordering hypotheses."""
#        print(f"Attempting to simplify {expr} using the ordering hypotheses {self}.")
        if isinstance(expr, Variable):
            return expr
        elif isinstance(expr, Constant):
            return one
        elif isinstance(expr, Add):
            left = self.order_simplify(expr.left)
            right = self.order_simplify(expr.right)
            if self.can_prove(left <= right):
                return right
            if self.can_prove(right <= left):
                return left
            return Max(left, right)
        elif isinstance(expr, Mul):
            left = self.order_simplify(expr.left)
            right = self.order_simplify(expr.right)
            if isinstance(left, Constant):
                return right
            if isinstance(right, Constant):
                return left
            return Mul(left, right)
        elif isinstance(expr, Div):
            left = self.order_simplify(expr.left)
            right = self.order_simplify(expr.right)
            if isinstance(right, Constant):
                return left
            return Div(left, right)
        elif isinstance(expr, Power):
            base = self.order_simplify(expr.base)
            if isinstance(base, Constant):
                return one
            return Power(base, expr.exponent)
        elif isinstance(expr, Max):
            new_operands = self.maximal_elements( {self.order_simplify(op) for op in expr.operands} )
            if len(new_operands) == 0:
                return one
            if len(new_operands) == 1:
                return new_operands.pop()
            return Max(*new_operands)
        elif isinstance(expr, Min):
            new_operands = self.minimal_elements( {self.order_simplify(op) for op in expr.operands} )
            if len(new_operands) == 0:
                return one
            if len(new_operands) == 1:
                return new_operands.pop()
            return Min(*new_operands)
        elif isinstance(expr, Statement):
            left = self.order_simplify(expr.left)
            right = self.order_simplify(expr.right)
            return Statement(left, expr.op, right)
        elif isinstance(expr, (int, float)):
            return one
        else:
            raise TypeError(f"Unsupported expression type: {type(expr)}")

# tests if one can prove expr1 <~ expr2 using the hypotheses
    def can_bound(self, expr1, expr2):
#        print(f"Attempting to bound {expr1} by {expr2} using {self}.")
        expr = self.order_simplify(expr2/expr1)
        print(f"Simplify to proving {monomial_simplify(expr)} >= 1.")
        terms = monomials(expr)
        for key, _ in terms.items():
            self.graph.add_node(key)  # Ensure all variables are nodes in the graph

        prob = pulp.LpProblem("BoundCheck", pulp.LpMinimize)
                
        # Create variables
        w = { (u,v): pulp.LpVariable(f"w_{u}_{v}", lowBound=0) for u, v in self.graph.edges() }

        # Dummy objective: minimize total weight
        prob += pulp.lpSum(w)
        
        # Constraints for each term in the expression, except one
        for v in self.graph.nodes():
            if not v == one:
                inflow = pulp.lpSum(w[u, v] for u, v in self.graph.in_edges(v))
                outflow = pulp.lpSum(w[v, u] for v, u in self.graph.out_edges(v))
                prob += (inflow - outflow == terms.get(v, 0), f"FlowBalance_{v}")
        
        silent_solver = pulp.PULP_CBC_CMD(msg=False)
        prob.solve(silent_solver)
        if pulp.LpStatus[prob.status] == 'Optimal':
            if pulp.value(prob.objective) > 0:
                print(f"Bound was proven true by multiplying the following hypotheses :")
                for (u,v), var in w.items():
                    if var.value() > 0:
                        print(f"{u} <~ {v} raised to power {var.value()}")
            else:
                print("This is trivial.")
            return True
        else:  
            print("Unable to verify bound.")
            return False
 
# Collect all the terms in a given expression that require splitting into cases
def splittings(expr):
    if isinstance(expr, (Variable, Constant)):
        return set()
    elif isinstance(expr, Add):
        splits = splittings(expr.left).union(splittings(expr.right))
        splits.add(Max(expr.left, expr.right))
        return splits
    elif isinstance(expr, (Mul, Div)):
        return splittings(expr.left).union(splittings(expr.right))
    elif isinstance(expr, Power):
        return splittings(expr.base).union(splittings(expr.exponent))
    elif isinstance(expr, (Max,Min)):
        splits = set()
        for operand in expr.operands:
            splits.update(splittings(operand))
        splits.add(expr)
        return splits
    elif isinstance(expr, Statement):
        left_splits = splittings(expr.left)
        right_splits = splittings(expr.right)
        return left_splits.union(right_splits)
    elif isinstance(expr, (int, float)):
        return set()
    else:
        raise TypeError(f"Unsupported expression type: {type(expr)}")

class Assumptions:
    def __init__(self):
        self.assumptions = []
        self.splits = []
    
    def add(self, statement):
        print(f"Adding assumption: {statement}")
        self.assumptions.append(statement)

    def add_lp(self, *lp_statement):
        print(f"Adding Littlewood-Paley assumption that expressions of magnitudes {lp_statement} can sum to zero.")
        self.splits.append(cases_lp(lp_statement))

    def split_at(self, expr1, expr2):
        print(f"Force a case split at {expr1} == {expr2}.")
        self.splits.append([[expr1 <= expr2], [expr2 <= expr1]])

    def can_bound(self, expr1, expr2):
        """Checks if a statement can be proven from the assumptions."""
        print(f"Checking if we can bound {expr1} by {expr2} from the given axioms.")

        base_splits = splittings(expr1 <= expr2)
        for assumption in self.assumptions:
            base_splits.update(splittings(assumption))
        
        cases = []
        for split in base_splits:
            if isinstance(split, Max):
                cases.append(cases_max(*split.operands))
            elif isinstance(split, Min):
                cases.append(cases_min(*split.operands))

        for split in self.splits:
            cases.append(split)

        if len(cases) > 0:
            print("We will split into the following cases:")
            for case in cases:
                print(case)

        for axioms in product(*cases):
            if len(cases) > 0:
                print(f"Trying case: {axioms}")
            ordering = Ordering()
# TODO: simplify the hypotheses before adding them to the ordering
            for assumption in self.assumptions:
                ordering.add(assumption)
            for ax in axioms:
                for statement in ax:
                    ordering.add(statement)
            if not ordering.can_bound(expr1, expr2):
                return False

        print("Bound was proven true in all cases!")
        return True

