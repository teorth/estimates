from proofassistant import *
from propositional_tactics import *
from sympy import Eq
from simp import *



def proof_assistant_example():
    p = ProofAssistant()
    P, Q, R, S = p.vars("bool", "P", "Q", "R", "S")
    p.assume(P | Q, "hPQ")
    p.assume(R | S, "hRS")
    p.begin_proof((P&R) | (P&S) | (Q&R) | (Q&S))
    p.use(Cases("hPQ"))
    p.use(SimpAll())
       
# proof_assistant_example()