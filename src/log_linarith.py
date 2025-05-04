from linprog import *
from proofstates import *
from estimates import *

# Tactics for testing whether a claim can be proven by (logarithmic) linear arithmetic.


def extract_monomials(expression):
    """Extract monomials from an expression, as a dictionary of base-exponent pairs."""
    assert isinstance(expression, Expression), f"Expected an Expression object, got {type(expression)} instead."
    if isinstance(expression, Constant):
        return dict() # ignore constants
    elif isinstance(expression, Mul):
        current_monomials = dict()
        
        for factor in expression.factors:
            factor_monomials = extract_monomials(factor)
            for base, exponent in factor_monomials.items():
                found_match = False
                for term in current_monomials.keys():
                    if base.defeq_immutable(term):
                        current_monomials[term] += exponent
                        found_match = True
                        break
                if not found_match:
                    current_monomials[base] = exponent
        return current_monomials
    elif isinstance(expression, Power):
        base_monomials = extract_monomials(expression.base)
        exponent = expression.exponent
        for base in base_monomials.keys():
            base_monomials[base] *= exponent
        return base_monomials
    else:
        return {expression: 1}
            
Expression.monomials = extract_monomials  # add method to Expression class

def extract_inequality(estimate):
    """Extract the inequality from an Estimate object."""
    assert isinstance(estimate, Estimate), f"Expected an Estimate object, got {type(estimate)} instead."
    monomials = (estimate.left / estimate.right).simp().monomials()
    match estimate.operator:
        case '<~':
            return Inequality(monomials, 'leq', Fraction(0,1))
        case '<<':
            return Inequality(monomials, 'lt', Fraction(0,1))
        case '~':
            return Inequality(monomials, 'eq', Fraction(0,1))
        case '>~':
            return Inequality(monomials, 'geq', Fraction(0,1))
        case '>>':
            return Inequality(monomials, 'gt', Fraction(0,1))
        case _:
            raise ValueError(f"Unknown operator {estimate.operator} in extract_inequality() method.")
Estimate.inequality = extract_inequality  # add method to Estimate class

def multiplicative_name(inequality):
    """Return the name of an inequality in multiplicative form."""
    assert isinstance(inequality, Inequality), f"Expected an Inequality object, got {type(inequality)} instead."
    coeffs = inequality.coeffs
    terms = []
    for v, c in coeffs.items():
        if c == 0:
            continue
        if c == Fraction(1,1):
            terms.append(f"{v}")
        else:
            terms.append(f"{v}^{c}")
    lhs = " * ".join(terms) if terms else "1"
    match inequality.sense:
        case 'leq':
            return f"{lhs} <~ 1"
        case 'lt':
            return f"{lhs} << 1"
        case 'geq':
            return f"{lhs} >~ 1"
        case 'gt':
            return f"{lhs} >> 1"
        case 'eq':
            return f"{lhs} ~ 1"
        case _:
            raise ValueError(f"Unknown sense {inequality.sense} in multiplicative_name() method.")

Inequality.multiplicative_name = multiplicative_name  # add method to Inequality class


def log_linarith( proof_state ):
    """Test whether the hypotheses of the current goal lead to a contradiction purely by logarithmic linear arithmetic."""
    if not isinstance(proof_state, ProofState):
        raise ValueError(f"log_linarith() must be called with a ProofState object, not {type(proof_state)}.")

    if not proof_state.current_conclusion().defeq_immutable(Bool(False)):
        proof_state.by_contra()  # if the goal is not already a contradiction, assume it for contradiction

    print("Trying to obtain a contradiction by logarithmic linear arithmetic...")
    # Convert all estimates in the hypotheses to inequalities.
    inequalities = set()
    for hypothesis in proof_state.current_hypotheses():
        if isinstance(hypothesis.immutable(), Estimate):
            inequalities.add(hypothesis.immutable().inequality())

    outcome, certificate = feasibility(inequalities)
    if outcome:
        print("Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):")
        for var, value in certificate.items():
            print(f"{var} = N^{value}")
        return False
    else:
        print("A contradiction can be obtained by multiplying the following estimates:")
        for ineq, value in certificate.items():
            if not value == Fraction(0,1):
                print(f"{ineq.multiplicative_name()} raised to power {value}")
        proof_state.resolve()  # resolve the current goal
        return True

ProofState.log_linarith = log_linarith  # add method to ProofState class

# See if a given estimate follows by linear arithmetic from the hypotheses of the current goal.
def log_linarith_test(proof_state, estimate, silent=False):
    if not isinstance(proof_state, ProofState):
        raise ValueError(f"log_linarith_test() must be called with a ProofState object, not {type(proof_state)}.")
    if not isinstance(estimate, Estimate):
        raise ValueError(f"log_linarith_Test() must be called with an Estimate object, not {type(estimate)}.")
    
    # Convert all estimates in the hypotheses to inequalities.
    inequalities = set()
    for hypothesis in proof_state.current_hypotheses():
        if isinstance(hypothesis.immutable(), Estimate):
            inequalities.add(hypothesis.immutable().inequality())

    final_inequality = estimate.negate().inequality()  # convert the estimate to an inequality
    inequalities.add(final_inequality)
    outcome, certificate = feasibility(inequalities)
    if outcome:
        if not silent:
            print(f"Unfortunately, {estimate} does not follow from the hypotheses.  Sample feasible values (for N large):")
            for var, value in certificate.items():
                print(f"{var} = N^{value}")
        return False
    else:
        if not silent:
            print(f"{estimate} follows from the hypotheses!  This follows by multiplying the following estimates:")
            for ineq, value in certificate.items():
                if ineq != final_inequality:
                    if not value == Fraction(0,1):
                        print(f"{ineq.multiplicative_name()} raised to power {value}")

        return True

ProofState.log_linarith_test = log_linarith_test  # add method to ProofState class





