from autosolve import *

def tactic_examples():
    A = Proposition("A")
    B = Proposition("B")
    C = Proposition("C")
    D = Proposition("D")
    E = Proposition("E")

    proof_state = begin_proof( And(A,B,D), { Or(C,E), And(B,C), Or(C,D) } )
    proof_state.simp_all()
    proof_state.by_contra()

    print(proof_state)

# tactic_examples()


def more_tactic_examples():
    A = Proposition("A")
    B = Proposition("B")
    C = Proposition("C")
    D = Proposition("D")

    proof_state = begin_proof( Or(And(A,C),And(B,C),And(A,D),And(B,D)), { Or(A,B), Or(C,D) } )

    proof_state.simp_and_split()

# more_tactic_examples()

def expression_examples():
    """Example usage of the Expression, Variable, Constant, Max, and Min classes"""

    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    d = Variable("d")
    x = (sqrt(a+b+c)*(a+b)*sqrt(max(a,c,b))/(bracket(d)*max(a,b)))**2

    print("Expression is initially: ", x)
    print("After simplification, it becomes: ", x.simp()) 
    
# expression_examples()


def estimate_examples():
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")

    X = (a+b*c)**2 <= a+a

    print("Estimate is initially: ", X)

    print("After simplification, it becomes: ", X.simp()) 

# estimate_examples() 

def LP_example():
    x = Variable("x")
    y = Variable("y")
    z = Variable("z")
    print(LP_property(x, y, z))  
    
# LP_example()


def feasbility_examples():
    inequalities = set()
    inequalities.add(Inequality({'x': 1}, 'leq', 3))
    inequalities.add(Inequality({'y': 1}, 'leq', 2))
    inequalities.add(Inequality({'x': 1, 'y': 1}, 'geq', 5))
    verbose_feasibility(inequalities)    

    inequalities.add(Inequality({'x': 1, 'y': 1}, 'gt', 5))
    verbose_feasibility(inequalities)    

    inequalities2 = set()
    inequalities2.add(Inequality({'x': 1}, 'lt', 2))
    inequalities2.add(Inequality({'y': 1}, 'gt', 3))
    inequalities2.add(Inequality({'x': 2, 'y':-1}, 'eq', 0))
    verbose_feasibility(inequalities2)    

# feasbility_examples()


def unfold_examples():
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    d = Variable("d")
    e = Variable("e")
    f = Variable("f")

    proof_state = begin_proof(a*max(b,c) > 1, {min(d,max(e,f)) > 1, a/(b+c) >= 1})
    proof_state.unfold_max()

# unfold_examples()


def log_linarith_examples():
    x = Variable("x")
    y = Variable("y")
    z = Variable("z")

    proof_state = begin_proof( x*y>1, { x > 1, y >= 1 })
    proof_state.log_linarith_test( x*y**2 < 1 )
    proof_state.log_linarith_test( x*y**2 > 1 )
    proof_state.log_linarith()

# log_linarith_examples()


def max_lt_min_example():
    a = Variable("a")
    b = Variable("b")
    proof_state = begin_proof( min(a,b) <= max(a,b) )
    proof_state.unfold_max()
    proof_state.log_linarith()

# max_lt_min_example()

def am_gm_example():
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    proof_state = begin_proof( (a*b*c)**Fraction(1,3) <= (a+b+c)/3 )
    proof_state.unfold_max()
    proof_state.log_linarith()

# am_gm_example()

def LP_autosolve_example():
    x = Variable("x")
    y = Variable("y")
    z = Variable("z")

    proof_state = begin_proof( min(x,y,z)*max(x,y,z)**2 <= x*y*z, { LP_property(x,y,z) } )
    autosolve(proof_state)

LP_autosolve_example()