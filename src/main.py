from proofassistant import *
from propositional_tactics import *
from linarith import *
from sympy import Eq, Max, Min
from simp import *
from subst import *



def linarith_exercise():
    p = ProofAssistant()
    x, y, z = p.vars("pos_real", "x", "y", "z")
    p.assume(x < 2*y, "h1")
    p.assume(y < 3*z+1, "h2")
    p.begin_proof(x < 7*z+2)
    return p

def linarith_solution():
    p = linarith_exercise()
    p.use(Linarith(verbose=true))


def linarith_impossible_example():
    p = ProofAssistant()
    x, y, z = p.vars("pos_real", "x", "y", "z")
    p.assume(x < 2*y, "h1")
    p.assume(y < 3*z+1, "h2")
    p.begin_proof(x < 7*z)
    return p

def linarith_failure_example():
    p = linarith_impossible_example()
    p.use(Linarith(verbose=true))



def case_split_exercise():
    p = ProofAssistant()
    P, Q, R, S = p.vars("bool", "P", "Q", "R", "S")
    p.assume(P|Q, "h1")
    p.assume(R|S, "h2")
    p.begin_proof((P&R) | (P&S) | (Q&R) | (Q&S))
    return p

def case_split_solution():
    p = case_split_exercise()
    p.use(Cases("h1"))
    p.use(SimpAll())

def split_exercise():
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.assume((x > -1) & (x < 1), "h1")
    p.assume((y > -2) & (y < 2), "h2")
    p.begin_proof((x+y > -3) & (x+y < 3))
    return p

def split_solution():
    p = split_exercise()
    p.use(SplitHyp("h1"))
    p.use(SplitHyp("h2"))
    p.use(SplitGoal())
    p.use(Linarith())
    p.use(Linarith())
    
def pigeonhole_exercise():
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.assume(x + y > 5, "h")
    p.begin_proof((x > 2) | (y > 3))
    return p


def ineq_exercise():
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.assume(x <= y, "h1")
    p.assume(x >= y, "h2")
    p.begin_proof(Eq(x,y))
    return p

def ineq_solution():
    p = ineq_exercise()
    p.use(SimpAll())   # can also use p.use(Linarith())

def ineq_exercise2():
    p = ProofAssistant()
    x = p.var("real", "x")
    y,z = p.vars("pos_int", "y", "z")
    p.assume(x+y+z <= 3, "h")
    p.assume((x>=y) & (y>=z), "h2")
    p.begin_proof(Eq(z,1))
    return p

def ineq_solution2():
    p = ineq_exercise2()
    p.use(SplitHyp("h2"))
    p.use(Linarith())

def min_max_exercise():
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.begin_proof(Min(x,y) <= Max(x,y))
    return p

def min_max_solution():
    p = min_max_exercise()
    x,y = p.get_vars("x", "y")
    p.use(Set("a", Min(x,y)))
    p.use(Set("b", Max(x,y)))
    p.use(SplitHyp("a_def"))
    p.use(SplitHyp("b_def"))
    p.use(Linarith())