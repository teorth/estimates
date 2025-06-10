from fractions import Fraction

from sympy import (
    Eq,
    GreaterThan,
    LessThan,
    Ne,
    Not,
    S,
    StrictGreaterThan,
    StrictLessThan,
    false,
)
from sympy.core.relational import Relational

from estimates.basic import Type
from estimates.linprog import Inequality, feasibility
from estimates.proofstate import ProofState
from estimates.tactic import Tactic


class Linarith(Tactic):
    """A tactic to try to establish a goal via linear arithmetic.  Inspired by the linarith tactic in Lean."""

    def __init__(self, verbose: bool = False) -> None:
        """
        :param verbose: If true, print the inequalities generated.
        """
        self.verbose = verbose

    def activate(self, state: ProofState) -> list[ProofState]:
        # First, gather all the hypotheses that can generate inequalities.
        hypotheses = set()
        for hypothesis in state.list_hypotheses(variables=True):
            if isinstance(
                hypothesis,
                Eq | LessThan | StrictLessThan | GreaterThan | StrictGreaterThan | Type,
            ):
                hypotheses.add(hypothesis)

        # the different hypothesis scenarios to consider.  Usually it is just one scenario, but when trying to prove an equality, there are two counterfactorial scenarios to consider, depending on whether the LHS is greater than or less than the RHS.
        scenarios = [hypotheses]
        if isinstance(
            state.goal, Ne | LessThan | StrictLessThan | GreaterThan | StrictGreaterThan
        ):
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
                continue  # No need to consider a scenario that has a false hypothesis.
            for hypothesis in scenario:
                if isinstance(
                    hypothesis, Type
                ):  # check for positivity conditions to add to the inequalities
                    if hypothesis.var().is_positive:
                        if hypothesis.var().is_integer:
                            inequalities.append(
                                Inequality({hypothesis.var(): S(1)}, "geq", S(1))
                            )  # the integrality gap!
                        else:
                            inequalities.append(
                                Inequality({hypothesis.var(): S(1)}, "gt", S(0))
                            )
                    elif hypothesis.var().is_nonnegative:
                        inequalities.append(
                            Inequality({hypothesis.var(): S(1)}, "geq", S(0))
                        )
                elif isinstance(hypothesis, Relational):
                    coeffs = (
                        hypothesis.args[0] - hypothesis.args[1]
                    ).as_coefficients_dict()

                    # Linarith ignores any relations that involve anything other than a real number.  (One could make a companion tactic, say Linalg, to handle linear equalities over vector spaces other than the reals.)
                    all_real = True
                    for var in coeffs:
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
                        inequalities.append(Inequality(coeffs, "eq", const))
                    elif isinstance(hypothesis, LessThan):
                        inequalities.append(Inequality(coeffs, "leq", const))
                    elif isinstance(hypothesis, StrictLessThan):
                        inequalities.append(Inequality(coeffs, "lt", const))
                    elif isinstance(hypothesis, GreaterThan):
                        inequalities.append(Inequality(coeffs, "geq", const))
                    elif isinstance(hypothesis, StrictGreaterThan):
                        inequalities.append(Inequality(coeffs, "gt", const))

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
                    print(ineq)
                print("Feasible with the following values:")
                for var, value in dict.items():
                    print(f"{var} = {value}")
            print("Linear arithmetic was unable to prove goal.")
            return [state.copy()]
        else:
            if self.verbose:
                n = 0
                for inequalities in inequalities_list:
                    print("Checking feasibility of the following inequalities:")
                    for ineq in inequalities:
                        print(ineq)
                    print("Infeasible by summing the following:")
                    dict = proofs[n]
                    for ineq, coeff in dict.items():
                        if coeff.as_fraction() != Fraction(0, 1):
                            print(f"{ineq} multiplied by {coeff}")
                    n += 1
                if n == 0:
                    print("Conclusion followed tautologically from hypotheses.")
            else:
                print("Goal solved by linear arithmetic!")
            return []

    def __str__(self) -> str:
        return "linarith"
