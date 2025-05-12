from fractions import Fraction
from itertools import product

from sympy import (
    Basic,
    Eq,
    Expr,
    GreaterThan,
    LessThan,
    Ne,
    Not,
    S,
    StrictGreaterThan,
    StrictLessThan,
    false,
    true,
)
from sympy.core.relational import Rel, Relational

from estimates.basic import Type, describe
from estimates.linprog import Inequality, feasibility
from estimates.order_of_magnitude import (
    OrderMax,
    OrderMin,
    OrderMul,
    OrderOfMagnitude,
    OrderPow,
    Theta,
)
from estimates.proofstate import ProofState
from estimates.tactic import Tactic


class ApplyTheta(Tactic):
    """A tactic to apply the Theta function to an hypothesis."""

    def __init__(self, hyp: str = "this", newhyp: str = None):
        """`hyp` is the hypothesis to apply the Theta function to.  `newhyp` is the name of the new hypothesis.  If None, it will be set to `hyp` with a _theta suffix."""
        self.hyp = hyp
        self.newhyp = newhyp

    def activate(self, state: ProofState) -> list[ProofState]:
        if not self.hyp in state.hypotheses:
            raise ValueError(
                f"{self.hyp} is not a hypothesis in the current proof state."
            )

        hyp_statement = state.hypotheses[self.hyp]
        if not isinstance(hyp_statement, Relational):
            raise ValueError(f"{self.hyp} is not a relational hypothesis.")

        if isinstance(hyp_statement, Ne):
            raise ValueError(f"Unequalities do not have useful asymptotic forms.")
        elif isinstance(hyp_statement, Eq):
            new_rel_op = "="
        elif isinstance(hyp_statement, LessThan | StrictLessThan):
            new_rel_op = (
                "<="  # Asymptotically, strict inequalities become non-strict ones.
            )
        elif isinstance(hyp_statement, GreaterThan | StrictGreaterThan):
            new_rel_op = (
                ">="  # Asymptotically, strict inequalities become non-strict ones.
            )

        newhyp = self.newhyp
        if self.newhyp is None:
            newhyp = self.hyp + "_theta"
        newhyp = state.new(newhyp)
        hyp_statement = state.hypotheses[self.hyp]

        newhyp_statement = Rel(
            Theta(hyp_statement.args[0]), Theta(hyp_statement.args[1]), new_rel_op
        )
        print(
            f"Adding asymptotic version of {describe(self.hyp, hyp_statement)} as {describe(newhyp, newhyp_statement)}."
        )
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
    """Returns a string representation of the inequality in multiplicative form.  Assumes the constant term vanishes."""
    assert self.rhs == 0, "The right-hand side must be zero for this representation."
    coeffs_str = " * ".join(f"{v}**{c}" for v, c in self.coeffs.items())
    match self.sense:
        case "leq":
            return f"{coeffs_str} <= Theta(1)"
        case "lt":
            return f"{coeffs_str} < Theta(1)"
        case "geq":
            return f"{coeffs_str} >= Theta(1)"
        case "gt":
            return f"{coeffs_str} > Theta(1)"
        case "eq":
            return f"{coeffs_str} = Theta(1)"
        case _:
            raise ValueError(f"Invalid sense: {self.sense}")


Inequality.order_str = order_str


def inequality_of(hyp: Expr) -> Inequality:
    """Convert a hypothesis into an Inequality.  Implicitly assumes that the hypothesis is a relation (but not unequality) involving orders of magnitude."""

    coeffs = extract_monomials(hyp.args[0] / hyp.args[1])

    if isinstance(hyp, Eq):
        return Inequality(coeffs, "eq", S(0))
    elif isinstance(hyp, LessThan):
        return Inequality(coeffs, "leq", S(0))
    elif isinstance(hyp, StrictLessThan):
        return Inequality(coeffs, "lt", S(0))
    elif isinstance(hyp, GreaterThan):
        return Inequality(coeffs, "geq", S(0))
    elif isinstance(hyp, StrictGreaterThan):
        return Inequality(coeffs, "gt", S(0))


def max_objects(expr: Basic) -> set[Basic]:
    """Returns a set of the objects in the expression that are of type OrderMax."""
    if isinstance(expr, OrderMax):
        objects = {expr}
        for arg in expr.args:
            objects.update(max_objects(arg))
        return objects
    elif isinstance(expr, OrderMin | OrderMul):
        objects = set()
        for arg in expr.args:
            objects.update(max_objects(arg))
        return objects
    elif isinstance(expr, OrderPow):
        return max_objects(expr.args[0])
    elif isinstance(expr, Relational):
        objects = max_objects(expr.args[0])
        objects.update(max_objects(expr.args[1]))
        return objects
    else:
        return set()


def min_objects(expr: Basic) -> list[Basic]:
    """Returns a list of the objects in the expression that are of type OrderMin."""
    if isinstance(expr, OrderMin):
        objects = {expr}
        for arg in expr.args:
            objects.update(min_objects(arg))
        return objects
    elif isinstance(expr, OrderMax | OrderMul):
        objects = set()
        for arg in expr.args:
            objects.update(min_objects(arg))
        return objects
    elif isinstance(expr, OrderPow):
        return min_objects(expr.args[0])
    elif isinstance(expr, Relational):
        objects = min_objects(expr.args[0])
        objects.update(min_objects(expr.args[1]))
        return objects
    else:
        return set()


class LogLinarith(Tactic):
    """A tactic to try to establish a goal via logaithmic linear arithmetic for asymptotic inequalities.  Inspired by the linarith tactic in Lean."""

    def __init__(self, verbose: bool = False, split_max: bool = True):
        """
        :param verbose: If true, print the inequalities generated.
        :param split_max: If true, split the max objects into their components.  This makes the tactic more powerful, but also slower.
        """
        self.verbose = verbose
        self.split_max = split_max

    def activate(self, state: ProofState) -> list[ProofState]:
        # First, gather all the hypotheses that can generate inequalities.
        if false in state.list_hypotheses() or state.goal == true:
            print("Goal trivially follows from hypotheses.")
            return []

        hypotheses = set()

        for hypothesis in state.list_hypotheses(variables=true):
            if isinstance(
                hypothesis,
                Eq
                | LessThan
                | StrictLessThan
                | GreaterThan
                | StrictGreaterThan
                | Ne
                | Type,
            ):
                hypotheses.add(hypothesis)
        if isinstance(
            state.goal,
            Eq | LessThan | StrictLessThan | GreaterThan | StrictGreaterThan | Ne,
        ):
            hypotheses.add(Not(state.goal))

        # Now gather a list of inequalities for each hypothesis.  In most cases, only one inequality is generated.
        inequality_lists = []
        max_objects_set = set()
        min_objects_set = set()
        for hypothesis in hypotheses:
            # convert the hypothesis to an asymptotic form, which in the case of unequalities generates two hypotheses.
            newhypotheses = []
            if isinstance(
                hypothesis, Type
            ):  # check for positivity conditions to add to the inequalities
                if hypothesis.var().is_positive and hypothesis.var().is_integer:
                    newhypotheses = [
                        Rel(Theta(hypothesis.var()), Theta(1), ">=")
                    ]  # the integrality gap!
                else:
                    continue
            elif isinstance(hypothesis, Relational):
                # Obtain the associated relation involving orders of magnitude.
                if isinstance(hypothesis.args[0], OrderOfMagnitude) and isinstance(
                    hypothesis.args[1], OrderOfMagnitude
                ):
                    if isinstance(hypothesis, Ne):
                        newhypotheses = [
                            Rel(
                                Theta(hypothesis.args[0]),
                                Theta(hypothesis.args[1]),
                                "<",
                            ),
                            [
                                Rel(
                                    Theta(hypothesis.args[0]),
                                    Theta(hypothesis.args[1]),
                                    ">",
                                )
                            ],
                        ]
                    else:
                        newhypotheses = [hypothesis]
                elif isinstance(hypothesis.args[0], OrderOfMagnitude):
                    print(
                        f"Warning: somehow an order of magnitude {hypothesis.args[0]} is being compared with a non-order of magnitude {hypothesis.args[1]}."
                    )
                    continue
                elif isinstance(hypothesis.args[1], OrderOfMagnitude):
                    print(
                        f"Warning: somehow an order of magnitude {hypothesis.args[1]} is being compared with a non-order of magnitude {hypothesis.args[0]}."
                    )
                    continue
                elif hypothesis.args[0].is_positive and hypothesis.args[1].is_positive:
                    if isinstance(hypothesis, LessThan | StrictLessThan):
                        # Note that Theta turns strict inequalities into non-strict ones.
                        newhypotheses = [
                            Rel(
                                Theta(hypothesis.args[0]),
                                Theta(hypothesis.args[1]),
                                "<=",
                            )
                        ]
                    elif isinstance(hypothesis, GreaterThan | StrictGreaterThan):
                        newhypotheses = [
                            Rel(
                                Theta(hypothesis.args[1]),
                                Theta(hypothesis.args[0]),
                                ">=",
                            )
                        ]
                    elif isinstance(hypothesis, Eq):
                        newhypotheses = [
                            Rel(
                                Theta(hypothesis.args[0]),
                                Theta(hypothesis.args[1]),
                                "=",
                            )
                        ]
                    else:
                        continue
            else:
                continue

            newhypotheses = [
                hyp for hyp in newhypotheses if hyp != false
            ]  # remove false hypotheses

            if len(newhypotheses) == 0:
                print("Goal trivially follows from hypotheses.")
                return []

            # If we are splitting max objects, do so.
            if self.split_max:
                for newhypothesis in newhypotheses:
                    max_objects_set.update(max_objects(newhypothesis))
                    min_objects_set.update(min_objects(newhypothesis))

            # Now, convert the new hypotheses into inequalities.
            inequality_lists.append(
                [inequality_of(newhypothesis) for newhypothesis in newhypotheses]
            )

        # For each max object and min object, add further inequalities
        for max_object in max_objects_set:
            extra_inequality = []
            for arg in max_object.args:
                inequality_lists.append([inequality_of(Rel(arg, max_object, "<="))])
                extra_inequality.append(inequality_of(Rel(arg, max_object, "==")))
            inequality_lists.append(extra_inequality)
        for min_object in min_objects_set:
            extra_inequality = []
            for arg in min_object.args:
                inequality_lists.append([inequality_of(Rel(arg, min_object, ">="))])
                extra_inequality.append(inequality_of(Rel(arg, min_object, "==")))
            inequality_lists.append(extra_inequality)

        if self.verbose:
            print(
                "Identified the following disjunctions of asymptotic inequalities that we need to obtain a contradiction from:"
            )
            for inequalities in inequality_lists:
                print([order_str(ineq) for ineq in inequalities])

        # Now, iterate over all possible combinations of inequalities, and check if they are feasible.
        found_counterexample = False
        proofs = []

        for inequalities in product(*inequality_lists):
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
                print(
                    "Feasible with the following values, for an unbounded order of magnitude X:"
                )
                for var, value in dict.items():
                    print(f"{var} = X**{value}")
            else:
                print("Log-linear arithmetic was unable to prove goal.")
            return [state.copy()]
        else:
            if self.verbose:
                n = 0
                for inequalities in product(*inequality_lists):
                    print("Checking feasibility of the following inequalities:")
                    for ineq in inequalities:
                        print(order_str(ineq))
                    print("Infeasible by multiplying the following:")
                    dict = proofs[n]
                    for ineq, coeff in dict.items():
                        if not coeff == Fraction(0, 1):
                            print(f"{order_str(ineq)} raised to power {coeff}")
                    n += 1
                if n == 0:
                    print("Conclusion followed tautologically from hypotheses.")
            else:
                print("Goal solved by log-linear arithmetic!")
            return []

    def __str__(self):
        if self.split_max:
            return "log_linarith!"
        else:
            return "log_linarith"
