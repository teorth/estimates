from proofstates import *
from estimates import *

# A tactic for unfolding max and min type expressions by introducing new variables.  For instance, if the expression `max(x,y)` appears in a goal, introduce a new formal variable "max(x,y)", replace all occurrences of `max(x,y)` with this new variable, and add the additional hypotheses

# x <~ "max(x,y)"
# y <~ "max(x,y)"
# x ~ "max(x,y)" OR y ~ "max(x,y)"

# One can then case split on the final new hypothesis if desired to further break down the hypotheses into ones which `log_linarith` can make profitable use of.


def collect_new_variables(term, new_variables):
    # Recursively collect new variables for max and min (and add) terms in the expression.
    if isinstance(term, MutableType):
        collect_new_variables(term.immutable(), new_variables)  # Unwrap the mutable type to get the original type
    elif isinstance(term, Estimate):
        # If the term is an estimate, we need to collect variables from the left and right expressions.
        collect_new_variables(term.left, new_variables)
        collect_new_variables(term.right, new_variables)
    elif isinstance(term, Max) or isinstance(term, Min) or isinstance(term, Add):
        # Create a new variable for this term if it does not already exist.
        for t, var in new_variables.items():
            if t.defeq(term):
                return
        new_variables[term] = Variable(f"\"{term}\"") # Create a new variable with a string representation of the term.
        # Then, recursively collect variables from the sub-expressions.
        for subterm in term.operands:
            collect_new_variables(subterm, new_variables)
    elif isinstance(term, Power):
        collect_new_variables(term.base, new_variables)
    elif isinstance(term, Mul):
        for factor in term.factors:
            collect_new_variables(factor, new_variables)
    elif isinstance(term, Div):
        collect_new_variables(term.numerator, new_variables)
        collect_new_variables(term.denominator, new_variables)

def replace_with_new_variables(term, new_variables):
    if isinstance(term, MutableType):
        new_term = replace_with_new_variables(term.immutable(), new_variables)  # Unwrap the mutable type to get the original type
        term.set_to(new_term)
    elif isinstance(term, Estimate):
        left = replace_with_new_variables(term.left, new_variables)
        right = replace_with_new_variables(term.right, new_variables)
        return Estimate(left, term.operator, right)
    elif isinstance(term, Max) or isinstance(term, Min) or isinstance(term, Add):
        for t, var in new_variables.items():
            if t.defeq(term):
                return var
        raise ValueError(f"Term {term} not found in new variables dictionary.")
    elif isinstance(term, Power):
        base = replace_with_new_variables(term.base, new_variables)
        return Power(base, term.exponent)
    elif isinstance(term, Mul):
        new_factors = [replace_with_new_variables(factor, new_variables) for factor in term.factors]
        return Mul(*new_factors)
    elif isinstance(term, Div):
        numerator = replace_with_new_variables(term.numerator, new_variables)
        denominator = replace_with_new_variables(term.denominator, new_variables)
        return Div(numerator, denominator)
    else:
        return term  # don't change the term if we don't have any other instructions

def unfold_max(proof_state):
    if not isinstance(proof_state, ProofState):
        raise ValueError(f"unfold_max() must be called with a ProofState object, not {type(proof_state)}.")
    
    # First, collect all terms that are of a `max` or `min` form, and create a dictionary of new formal variables for each such term.

    new_variables = {}

    for hypothesis in proof_state.current_hypotheses():
        collect_new_variables(hypothesis, new_variables)
    collect_new_variables(proof_state.current_conclusion(), new_variables)

    if len(new_variables) > 0:
        # list the values of the new value dictionary, separated by commas
        print(f"Creating new variables: {', '.join(f'{var}' for _, var in new_variables.items())}")

    # Now, recursively replace all occurrences of `max` and `min` terms in the hypotheses and conclusion with the new variables.
    for hypothesis in proof_state.current_hypotheses():
        replace_with_new_variables(hypothesis, new_variables)
    replace_with_new_variables(proof_state.current_conclusion(), new_variables)

    # Next, add new hypotheses for each new variable introduced, which are the inequalities that define the new variables.
    for term, var in new_variables.items():
        if isinstance(term, Max):
            new_operands = [replace_with_new_variables(op, new_variables) for op in term.operands]
            equivs = set()
            for op in new_operands:
                proof_state.add_hypothesis(Estimate(op, "<~", var))
                equivs.add(Estimate(op, "~", var))
            proof_state.add_hypothesis(Or(*equivs))
        elif isinstance(term, Min):
            new_operands = [replace_with_new_variables(op, new_variables) for op in term.operands]
            equivs = set()
            for op in new_operands:
                proof_state.add_hypothesis(Estimate(op, ">~", var))
                equivs.add(Estimate(op, "~", var))
            proof_state.add_hypothesis(Or(*equivs))
        elif isinstance(term, Add):
            new_operands = [replace_with_new_variables(op, new_variables) for op in term.operands]
            equivs = set()
            for op in new_operands:
                proof_state.add_hypothesis(Estimate(op, "<~", var))
                equivs.add(Estimate(op, "~", var))
            proof_state.add_hypothesis(Or(*equivs))
    
ProofState.unfold_max = unfold_max  # add method to ProofState class
