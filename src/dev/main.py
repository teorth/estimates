from proofassistant import *
from propositional_tactics import *
from linarith import *
from sympy import Eq
from simp import *



def linarith_exercise():
    p = ProofAssistant()
    x, y, z = p.vars("pos_real", "x", "y", "z")
    p.assume(x < 2*y, "h1")
    p.assume(y < 3*z, "h2")
    p.begin_proof(x < 7*z)
    return p

def linarith_solution():
    p = linarith_exercise()
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


