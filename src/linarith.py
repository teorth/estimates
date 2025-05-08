from tactic import *
from linprog import Inequality, feasibility, verbose_feasibility
from sympy import S, Eq, LessThan, StrictLessThan, GreaterThan, StrictGreaterThan
from sympy.core.relational import Relational

    


# A tactic to try to establish a goal via linear arithmetic.  
class Linarith(Tactic):
    def __init__ (self, verbose: bool = False):
        """
        :param verbose: If true, print the inequalities generated.
        """
        self.verbose = verbose

    def activate(self, state: ProofState) -> list[ProofState]:
        
        # First, gather all the hypotheses that can generate inequalities.
        hypotheses = set()
        for hypothesis in state.list_hypotheses(variables=true):
            if isinstance(hypothesis, Eq|LessThan|StrictLessThan|GreaterThan|StrictGreaterThan|Type):
                hypotheses.add(hypothesis)
        if isinstance(state.goal, Eq|LessThan|StrictLessThan|GreaterThan|StrictGreaterThan):
            hypotheses.add(Not(state.goal))

        # Now, build the inequalities from the hypotheses.
        inequalities = []
        for hypothesis in hypotheses:
            if isinstance(hypothesis, Type):  # check for positivity conditions to add to the inequalities
                if hypothesis.var().is_positive:
                    inequalities.append(Inequality({hypothesis.var(): S(1)}, 'gt', S(0)))
                elif hypothesis.var().is_nonnegative:
                    inequalities.append(Inequality({hypothesis.var(): S(1)}, 'geq', S(0)))
            elif isinstance(hypothesis, Relational):
                coeffs = (hypothesis.args[0] - hypothesis.args[1]).as_coefficients_dict()
            
                # Linarith ignores any relations that involve anything other than a real number.  (One could make a companion tactic, say Linalg, to handle linear equalities over vector spaces other than the reals.)
                all_real = True
                for var in coeffs.keys():
                    if not var.is_real:
                        all_real = False
                        break
                if not all_real:
                    continue
            
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
        
        if self.verbose:
            outcome = verbose_feasibility(inequalities)
        else:
            outcome, dict = feasibility(inequalities)

        if outcome:
            print("Linear arithmetic was unable to prove goal.")
            return [state.copy()]
        else:
            print("Goal solved by linear arithmetic!")
            return []


    def __str__(self):
        return "linarith"