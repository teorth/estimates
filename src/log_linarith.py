from tactic import *
from linprog import Inequality, feasibility
from sympy import S, Eq, LessThan, StrictLessThan, GreaterThan, StrictGreaterThan,Ne
from sympy.core.relational import Relational
from fractions import Fraction
from order_of_magnitude import *

class ApplyTheta(Tactic):
    """ A tactic to apply the Theta function to an hypothesis. """
    def __init__(self, hyp:str="this", newhyp:str=None):
        """`hyp` is the hypothesis to apply the Theta function to.  `newhyp` is the name of the new hypothesis.  If None, it will be set to `hyp` with a _theta suffix."""
        self.hyp = hyp
        self.newhyp = newhyp

    def activate(self, state: ProofState) -> list[ProofState]:
        if not self.hyp in state.hypotheses:
            raise ValueError(f"{self.hyp} is not a hypothesis in the current proof state.")
        
        hyp_statement = state.hypotheses[self.hyp]
        if not isinstance(hyp_statement, Relational):
            raise ValueError(f"{self.hyp} is not a relational hypothesis.")
        
        if isinstance(hyp_statement, Ne):
            raise ValueError(f"Unequalities do not have useful asymptotic forms.")
        elif isinstance(hyp_statement, Eq):
            new_rel_op = "="
        elif isinstance(hyp_statement, LessThan|StrictLessThan):
            new_rel_op = "<=" # Asymptotically, strict inequalities become non-strict ones.
        elif isinstance(hyp_statement, GreaterThan|StrictGreaterThan):
            new_rel_op = ">=" # Asymptotically, strict inequalities become non-strict ones.
        
        newhyp = self.newhyp
        if self.newhyp is None:
            newhyp = self.hyp + "_theta"
        newhyp = state.new(newhyp)
        hyp_statement = state.hypotheses[self.hyp]

        newhyp_statement = Rel(Theta(hyp_statement.args[0]), Theta(hyp_statement.args[1]), new_rel_op)
        print(f"Adding asymptotic version of {describe(self.hyp, hyp_statement)} as {describe(newhyp, newhyp_statement)}.")
        newstate = state.copy()
        newstate.hypotheses[newhyp] = newhyp_statement 
        return [newstate]

    def __str__(self):
        if self.newhyp is None:
            return f"apply_theta {self.hyp})"
        else:
            return f"{self.newhyp} := apply_theta {self.hyp}"

def extract_monomials(expr: Basic) -> dict[Basic, Fraction]:
    """
    Extracts the monomials from an order of magnitude expression and returns them as a dictionary.
    The keys are the monomials and the values are their coefficients.
    """
    monomials = {}
    if isinstance(expr, OrderMul):
        for arg in expr.args:
            for term, coeff in extract_monomials(arg).items():
                if term in monomials:
                    monomials[term] += coeff
                else:
                    monomials[term] = coeff
        return monomials
    elif isinstance(expr, OrderPow):
        base, exp = expr.args
        if exp.is_rational:
            for term, coeff in extract_monomials(base).items():
                monomials[term] = coeff * exp
            return monomials
        
    monomials[expr] = S(1)
    return monomials

def order_str(self: Inequality) -> str:
    """ Returns a string representation of the inequality in multiplicative form.  Assumes the constant term vanishes. """
    assert self.rhs == 0, "The right-hand side must be zero for this representation."
    coeffs_str = ' * '.join(f"{v}**{c}" for v, c in self.coeffs.items())
    match self.sense:
        case 'leq':
            return f"{coeffs_str} <= Theta(1)"
        case 'lt':
            return f"{coeffs_str} < Theta(1)"
        case 'geq':
            return f"{coeffs_str} >= Theta(1)"
        case 'gt':
            return f"{coeffs_str} > Theta(1)"
        case 'eq':
            return f"{coeffs_str} = Theta(1)"
        case _:
            raise ValueError(f"Invalid sense: {self.sense}")
        
Inequality.order_str = order_str


class LogLinarith(Tactic):
    """ A tactic to try to establish a goal via logaithmic linear arithmetic for asymptotic inequalities.  Inspired by the linarith tactic in Lean."""
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
        
        # the different hypothesis scenarios to consider.  Usually it is just one scenario, but when trying to prove an equality, there are two counterfactorial scenarios to consider, depending on whether the LHS is greater than or less than the RHS.
        scenarios = [hypotheses]
        if isinstance(state.goal, Ne|LessThan|StrictLessThan|GreaterThan|StrictGreaterThan):
            scenarios[0].add(Not(state.goal))
        elif isinstance(state.goal, Eq):
            scenarios.append(hypotheses.copy())
            scenarios[0].add(StrictLessThan(state.goal.args[0], state.goal.args[1]))
            scenarios[1].add(StrictLessThan(state.goal.args[1], state.goal.args[0]))
        
        found_counterexample = False
        proofs = []
        inequalities_list = []

        for scenario in scenarios:
            # Now, build the inequalities from the hypotheses.
            inequalities = []
            if false in scenario:
                continue # No need to consider a scenario that has a false hypothesis.
            for hypothesis in scenario:
                newhypothesis = None
                if isinstance(hypothesis, Type):  # check for positivity conditions to add to the inequalities
                    if hypothesis.var().is_positive and hypothesis.var().is_integer:
                        newhypothesis = Rel( Theta(hypothesis.var()), Theta(1), ">=") # the integrality gap!
                elif isinstance(hypothesis, Relational):
                    # Obtain the associated relation involving orders of magnitude.
                    if isinstance(hypothesis.args[0], OrderOfMagnitude) and isinstance(hypothesis.args[1], OrderOfMagnitude):
                        newhypothesis = hypothesis
                    elif hypothesis.args[0].is_positive and hypothesis.args[1].is_positive:
                        if isinstance(hypothesis, LessThan|StrictLessThan):
                            # Note that Theta turns strict inequalities into non-strict ones.
                            newhypothesis = Rel( Theta(hypothesis.args[0]), Theta(hypothesis.args[1]), "<=" )
                        elif isinstance(hypothesis, GreaterThan|StrictGreaterThan):
                            newhypothesis = Rel( Theta(hypothesis.args[1]), Theta(hypothesis.args[0]), ">=" )
                        elif isinstance(hypothesis, Eq):
                            newhypothesis = Rel( Theta(hypothesis.args[0]), Theta(hypothesis.args[1]), "=" )
                            
                if newhypothesis is None:
                    continue
                

                coeffs = extract_monomials(newhypothesis.args[0]/newhypothesis.args[1])
            
                if isinstance(newhypothesis, Eq):
                    inequalities.append(Inequality(coeffs, 'eq', S(0)))
                elif isinstance(newhypothesis, LessThan):
                    inequalities.append(Inequality(coeffs, 'leq', S(0)))
                elif isinstance(newhypothesis, StrictLessThan):
                    inequalities.append(Inequality(coeffs, 'lt', S(0)))
                elif isinstance(newhypothesis, GreaterThan):
                    inequalities.append(Inequality(coeffs, 'geq', S(0)))
                elif isinstance(newhypothesis, StrictGreaterThan):
                    inequalities.append(Inequality(coeffs, 'gt', S(0)))

            # TODO: figure out how to also deal with MAX terms: a tropical_linarith

            inequalities_list.append(inequalities)

            outcome, dict = feasibility(inequalities)
            if outcome:
                found_counterexample = True
                break
            else:
                proofs.append(dict)

        if found_counterexample:
            if self.verbose:
                print("Checking feasibility of the following inequalities:")
                for ineq in inequalities:
                    print(order_str(ineq))
                print("Feasible with the following values, for an unbounded order of magnitude X:")
                for var, value in dict.items():
                    print(f"{var} = X**{value}")
            else:
                print("Log-linear arithmetic was unable to prove goal.")
            return [state.copy()]
        else:
            if self.verbose:
                n = 0
                for inequalities in inequalities_list:
                    print("Checking feasibility of the following inequalities:")
                    for ineq in inequalities:
                        print(order_str(ineq))
                    print("Infeasible by multiplying the following:")
                    dict = proofs[n] 
                    for ineq, coeff in dict.items():
                        if not coeff == Fraction(0,1):
                            print(f"{order_str(ineq)} raised to power {coeff}")
                    n += 1
                if n == 0:
                    print("Conclusion followed tautologically from hypotheses.")
            else:
                print("Goal solved by log-linear arithmetic!")
            return []


    def __str__(self):
        return "log_linarith"