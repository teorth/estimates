from fractions import Fraction

from sympy import Eq, Max, Min

from estimates.lemma import Amgm
from estimates.linarith import Linarith
from estimates.littlewood_paley import LittlewoodPaley, bracket, sqrt
from estimates.log_linarith import ApplyTheta, LogLinarith
from estimates.order_of_magnitude import OrderMax, OrderMin, asymp, gtrsim, lesssim
from estimates.proofassistant import ProofAssistant
from estimates.propositional_tactics import ByCases, Cases, Claim, SplitGoal, SplitHyp, Contrapose
from estimates.simp import (
    IsNonnegative,
    IsNonzero,
    IsPositive,
    SimpAll,
)
from estimates.subst import Set, Subst, SubstAll
from estimates.test import Trivial


def linarith_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x, y, z = p.vars("pos_real", "x", "y", "z")
    p.assume(x < 2 * y, "h1")
    p.assume(y < 3 * z + 1, "h2")
    p.begin_proof(x < 7 * z + 2)
    return p


def linarith_solution() -> None:
    p = linarith_exercise()
    p.use(Linarith(verbose=True))


def linarith_impossible_example() -> ProofAssistant:
    p = ProofAssistant()
    x, y, z = p.vars("pos_real", "x", "y", "z")
    p.assume(x < 2 * y, "h1")
    p.assume(y < 3 * z + 1, "h2")
    p.begin_proof(x < 7 * z)
    return p


def linarith_failure_example() -> None:
    p = linarith_impossible_example()
    p.use(Linarith(verbose=True))


def case_split_exercise() -> ProofAssistant:
    p = ProofAssistant()
    P, Q, R, S = p.vars("bool", "P", "Q", "R", "S")
    p.assume(P | Q, "h1")
    p.assume(R | S, "h2")
    p.begin_proof((P & R) | (P & S) | (Q & R) | (Q & S))
    return p


def case_split_solution() -> None:
    p = case_split_exercise()
    p.use(Cases("h1"))
    p.use(SimpAll())
    p.use(SimpAll())


def split_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.assume((x > -1) & (x < 1), "h1")
    p.assume((y > -2) & (y < 2), "h2")
    p.begin_proof((x + y > -3) & (x + y < 3))
    return p


def split_solution() -> None:
    p = split_exercise()
    p.use(SplitHyp("h1"))
    p.use(SplitHyp("h2"))
    p.use(SplitGoal())
    p.use(Linarith())
    p.use(Linarith())


def pigeonhole_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.assume(x + y > 5, "h")
    p.begin_proof((x > 2) | (y > 3))
    return p

def pigeonhole_solution() -> None:
    p = pigeonhole_exercise()
    p.use(Contrapose("h"))
    p.use(SplitHyp("h"))
    p.use(Linarith())

def ineq_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.assume(x <= y, "h1")
    p.assume(x >= y, "h2")
    p.begin_proof(Eq(x, y))
    return p


def ineq_solution() -> None:
    p = ineq_exercise()
    p.use(SimpAll())  # can also use p.use(Linarith())


def ineq_exercise2():
    p = ProofAssistant()
    x = p.var("real", "x")
    y, z = p.vars("pos_int", "y", "z")
    p.assume(x + y + z <= 3, "h")
    p.assume((x >= y) & (y >= z), "h2")
    p.begin_proof(Eq(z, 1))
    return p


def ineq_solution2() -> None:
    p = ineq_exercise2()
    p.use(SplitHyp("h2"))
    p.use(Linarith())


def min_max_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.begin_proof(Min(x, y) <= Max(x, y))
    return p


def min_max_solution() -> None:
    p = min_max_exercise()
    x, y = p.get_vars("x", "y")
    p.use(Set("a", Min(x, y)))
    p.use(Set("b", Max(x, y)))
    p.use(SplitHyp("a_def"))
    p.use(SplitHyp("b_def"))
    p.use(Linarith())


def positive_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x = p.var("real", "x")
    p.assume(x > 0, "h")
    p.begin_proof(x**2 > 0)
    return p


def positive_solution() -> None:
    p = positive_exercise()
    p.use(IsPositive("x"))


def nonnegative_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x = p.var("real", "x")
    p.assume(x >= 0, "h")
    p.begin_proof(x**3 >= 0)
    return p


def nonnegative_solution() -> None:
    p = nonnegative_exercise()
    p.use(IsNonnegative("x"))


def trivial_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x = p.var("real", "x")
    p.assume(x > 0, "h")
    p.begin_proof(0 < x)
    return p


def trivial_solution() -> None:
    p = trivial_exercise()
    p.use(Trivial())


def loglinarith_exercise() -> ProofAssistant:
    p = ProofAssistant()
    N = p.var("pos_int", "N")
    x, y = p.vars("pos_real", "x", "y")
    p.assume(x <= 2 * N**2, "h1")
    p.assume(y < 3 * N, "h2")
    p.begin_proof(lesssim(x * y, N**4))
    return p


def loglinarith_solution() -> None:
    p = loglinarith_exercise()
    p.use(LogLinarith())


def loglinarith_hard_exercise() -> ProofAssistant:
    p = ProofAssistant()
    N = p.var("pos_int", "N")
    x, y = p.vars("pos_real", "x", "y")
    p.assume(x <= 2 * N**2 + 1, "h1")
    p.assume(y < 3 * N + 4, "h2")
    p.begin_proof(lesssim(x * y, N**3))
    return p


def loglinarith_hard_solution() -> None:
    p = loglinarith_hard_exercise()
    p.use(ApplyTheta("h1"))
    p.use(ApplyTheta("h2"))
    N = p.get_var("N")
    p.use(Claim(lesssim(1, N), "h3"))
    p.use(LogLinarith())
    p.use(Claim(lesssim(1, N**2), "h4"))
    p.use(LogLinarith())
    p.use(SimpAll())
    p.use(LogLinarith())


def loglinarith_hard_solution2() -> None:
    p = loglinarith_hard_exercise()
    p.use(LogLinarith())


def loglinarith_imposssible_example() -> ProofAssistant:
    p = ProofAssistant()
    N = p.var("pos_int", "N")
    x, y = p.vars("pos_real", "x", "y")
    p.assume(x <= 2 * N**2 + 1, "h1")
    p.assume(y < 3 * N + 4, "h2")
    p.begin_proof(lesssim(x * y, N**2))
    return p


def loglinarith_failure_example() -> None:
    p = loglinarith_imposssible_example()
    p.use(LogLinarith(verbose=True))


def amgm_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x, y = p.vars("nonneg_real", "x", "y")
    p.begin_proof(2 * x * y <= x**2 + y**2)
    return p


def amgm_solution() -> None:
    p = amgm_exercise()
    x, y = p.get_vars("x", "y")
    p.use_lemma(Amgm(x**2, y**2))
    p.use(Linarith())


def bracket_submult_exercise() -> ProofAssistant:
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.begin_proof(lesssim(bracket(x * y), bracket(x) * bracket(y)))
    return p


# New solution needed here.
def bracket_submult_solution() -> None:
    p = bracket_submult_exercise()
    x, y = p.get_vars("x", "y")
    p.use(ByCases(Eq(x, 0),"hx"))
    p.use(Subst("hx"))
    p.use(ByCases(Eq(y, 0),"hy"))
    p.use(Subst("hy"))
    p.use(LogLinarith())
    p.use(IsNonzero("y"))
    p.use(LogLinarith())
    p.use(IsNonzero("x"))
    p.use(ByCases(Eq(y, 0),"hy"))
    p.use(Subst("hy"))
    p.use(LogLinarith())
    p.use(IsNonzero("y"))
    p.use(LogLinarith())


def littlewood_paley_exercise() -> ProofAssistant:
    p = ProofAssistant()
    N_1, N_2, N_3 = p.vars("order", "N_1", "N_2", "N_3")
    p.assume(LittlewoodPaley(N_1, N_2, N_3), "h")
    p.begin_proof(OrderMin(N_1, N_2, N_3) * OrderMax(N_1, N_2, N_3) ** 2 <= N_1 * N_2 * N_3)
    return p


def littlewood_paley_solution() -> None:
    p = littlewood_paley_exercise()
    p.use(Cases("h"))
    p.use(LogLinarith())
    p.use(LogLinarith())
    p.use(LogLinarith())


# this is adapted from the equation afer equation (51) from https://arxiv.org/abs/math/0005001
def complex_littlewood_paley_exercise() -> ProofAssistant:
    p = ProofAssistant()
    N_1, N_2, N_3 = p.vars("order", "N_1", "N_2", "N_3")
    L_1, L_2, L_3 = p.vars("order", "L_1", "L_2", "L_3")
    N = p.var("order", "N")
    p.assume(LittlewoodPaley(N_1, N_2, N_3), "hN")
    p.assume(LittlewoodPaley(L_1, L_2, L_3), "hL")
    p.assume(gtrsim(N, 1), "hN1")
    p.assume(asymp(OrderMax(N_1, N_2, N_3), N), "hmax")
    p.assume(OrderMax(L_1, L_2, L_3) >= N_1 * N_2 * N_3, "hlower")

    p.begin_proof(
        lesssim(
            sqrt(bracket(N_2))
            / (bracket(N_1) ** Fraction(1, 4) * sqrt(L_1) * sqrt(L_2))
            * sqrt(OrderMin(L_1, L_2, L_3))
            * N ** (-1)
            * sqrt(N_1 * N_2 * N_3),
            1,
        )
    )
    return p


def complex_littlewood_paley_solution() -> None:
    """This solution works, but is quite slow (it maximally case splits).  A more targetd case split would work faster."""
    p = complex_littlewood_paley_exercise()
    p.use(Cases("hN"))
    p.use(Cases("hL"))
    p.use(LogLinarith())
    p.use(LogLinarith())
    p.use(LogLinarith())
    p.use(Cases("hL"))
    p.use(LogLinarith())
    p.use(LogLinarith())
    p.use(LogLinarith())
    p.use(Cases("hL"))
    p.use(LogLinarith())
    p.use(LogLinarith())
    p.use(LogLinarith())


def subst_example() -> ProofAssistant:
    p = ProofAssistant()
    x, y, z, w = p.vars("real", "x", "y", "z", "w")
    p.assume(Eq(x, z**2), "hx")
    p.assume(Eq(y, w**2), "hy")
    p.begin_proof(Eq(x - y, z**2 - w**2))
    return p


def subst_solution() -> None:
    p = subst_example()
    p.use(Subst("hx"))
    p.use(Subst("hy", reversed=True))


def subst_all_example() -> ProofAssistant:
    p = ProofAssistant()
    N = p.var("pos_int", "N")
    x, y, z = p.vars("real", "x", "y", "z")
    p.assume(x <= N, "hx")
    p.assume(y <= N, "hy")
    p.assume(z <= N, "hz")
    p.assume(Eq(N, 10), "hN")
    p.begin_proof(x + y + z <= N**2)
    return p


def subst_all_solution() -> None:
    p = subst_all_example()
    p.use(SubstAll("hN"))
    p.use(Linarith())
