from tactic import *
from linprog import Inequality, feasibility
from sympy import S, Eq, LessThan, StrictLessThan, GreaterThan, StrictGreaterThan

    


# A tactic to try to establish a goal via linear arithmetic.  
class Linarith(Tactic):
    def activate(self, state: ProofState) -> list[ProofState]:
        
        # First, gather all the inequality type hypotheses. 
        hypotheses = set()
        for hypothesis in state.list_hypotheses():
            if isinstance(hypothesis, Eq|LessThan|StrictLessThan|GreaterThan|StrictGreaterThan):
                hypotheses.add(hypothesis)
        if isinstance(state.goal, Eq|LessThan|StrictLessThan|GreaterThan|StrictGreaterThan):
            hypotheses.add(Not(state.goal))

        inequalities = []
        for hypothesis in hypotheses:
            coeffs = (hypothesis.args[0] - hypothesis.args[1]).as_coefficients_dict()
            if S(1) in coeffs:
                const = -coeffs[S(1)]
                del coeffs[S(1)]
            else:
                const = -S(0)
            if isinstance(hypothesis, Eq):
                inequalities.append(Inequality(coeffs, 'eq', const))
            elif isinstance(hypothesis, LessThan):
                inequalities.append(Inequality(coeffs, 'leq', const))
            elif isinstance(hypothesis, StrictLessThan):
                inequalities.append(Inequality(coeffs, 'lt', const))
            elif isinstance(hypothesis, GreaterThan):
                inequalities.append(Inequality(coeffs, 'geq', const))
            elif isinstance(hypothesis, StrictGreaterThan):
                inequalities.append(Inequality(coeffs, 'gt', const))
        
        outcome, dict = feasibility(inequalities)

        if outcome:
            print("Linear arithmetic was unable to prove goal.")
            return [state.copy()]
        else:
            print("Goal solved by linear arithmetic!")
            return []


    def __str__(self):
        return "linarith"