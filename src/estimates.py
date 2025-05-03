from statements import *
from expressions import *

# An estimate is a comparison between two expressions that is of one of the following forms:

## X <~ Y:  X = O(Y)
## X << Y:  X = o(Y)
## X ~ Y:   X << Y << X
## X >~ Y:  Y = O(X)
## X >> Y:  Y = o(X)

class Estimate(Statement):
    def __init__(self, left, operator, right):
        self.left = ensure_expr(left)
        self.right = ensure_expr(right)
        assert operator in ("<~", "<<", "~", ">~", ">>"), f"Invalid operator {operator} for Estimate."
        self.operator = operator 
        self.name = f"{self.left} {self.operator} {self.right}"
        
    def defeq(self, other):
        if isinstance(other, Estimate):
            return (self.left.defeq(other.left) and
                    self.right.defeq(other.right) and
                    self.operator == other.operator)
        return False

    def negate(self):
        match self.operator:
            case "<~":
                return Estimate(self.left,  ">>", self.right)
            case "<<":
                return Estimate(self.left, ">~", self.right)
            case "~":
                return Or( Estimate(self.left, ">>", self.right), Estimate(self.left, "<<", self.right) )
            case ">~":
                return Estimate(self.left, "<<", self.right)
            case ">>":
                return Estimate(self.left, "<~", self.right)
            case _:
                raise ValueError(f"Unknown operator {self.operator} in negate() method of Estimate.")
            
    def simp(self, hypotheses=set()):
        # Reverse \leq type inequalities to \geq to reach simp normal form
        if self.operator == "<~":  
            return Estimate(self.right, ">~", self.left).simp(hypotheses)
        if self.operator == "<<":  
            return Estimate(self.right, ">>", self.left).simp(hypotheses)

        # normalize RHS to 1 to reach simp normal form
        left = (self.left/self.right).simp(hypotheses)
        right = Constant(1)
    
        if left.defeq(right):
            return Bool(self.operator in ("<~", ">~", "~"))
    
        return Estimate(left, self.operator, right)
    

def expression_le(self, other):
    return Estimate(self, '<~', ensure_expr(other))
Expression.__le__ = expression_le
Expression.lesssim = expression_le  # alias for <~

def expression_lt(self, other):
    return Estimate(self, '<<', ensure_expr(other))
Expression.__lt__ = expression_lt
Expression.ll = expression_lt  # alias for <<

def expression_ge(self, other):
    return Estimate(self, '>~', ensure_expr(other))
Expression.__ge__ = expression_ge
Expression.gtrsim = expression_ge  # alias for >~

def expression_gt(self, other):
    return Estimate(self, '>>', ensure_expr(other))
Expression.__gt__ = expression_gt
Expression.gg = expression_gt  # alias for >>

def expression_eq(self, other):
    return Estimate(self, '~', ensure_expr(other))
Expression.asymp = expression_eq  # cannot override __eq__ because it is used for object identity, not equality of expressions
    

def estimate_examples():
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")

    X = a+b <= a+a

    print(X)

    print(X.simp()) 

estimate_examples() 
