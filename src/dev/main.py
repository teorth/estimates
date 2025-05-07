from proofassistant import *
from propositional_tactics import *
from linarith import *
from sympy import Eq
from simp import *



def proof_assistant_example():
    p = ProofAssistant()
    x, y, z = p.vars("real", "x", "y", "z")
    p.assume(x < y, "h1")
    p.assume(y < z, "h2")
    p.begin_proof(x < z)
    p.use(Linarith())
       
proof_assistant_example()