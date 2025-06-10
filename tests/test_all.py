import pytest

from estimates.main import *

class TestAll(object):

    def proof_complete(self, capsys):
        captured = capsys.readouterr()
        assert captured.out.endswith("Proof complete!\n")

    def test_linarith_solution(self, capsys):
        linarith_solution()
        self.proof_complete(capsys)

    def test_linarith_failure_example(self, capsys):
        linarith_failure_example()
        captured = capsys.readouterr()
        assert captured.out.endswith("Linear arithmetic was unable to prove goal.\n")

    def test_case_split_solution(self, capsys):
        case_split_solution()
        self.proof_complete(capsys)
    
    def test_split_solution(self, capsys):
        split_solution()
        self.proof_complete(capsys)
    
    def test_pigeonhole_solution(self, capsys):
        pigeonhole_solution()
        self.proof_complete(capsys)

    def test_ineq_solution(self, capsys):
        ineq_solution()
        self.proof_complete(capsys)

    def test_ineq_solution2(self, capsys):
        ineq_solution2()
        self.proof_complete(capsys)

    def test_min_max_solution(self, capsys):
        min_max_solution()
        self.proof_complete(capsys)

    def test_nonnegative_solution(self, capsys):
        nonnegative_solution()
        self.proof_complete(capsys)

    def test_positive_solution(self, capsys):
        positive_solution()
        self.proof_complete(capsys)

    def test_trivial_solution(self, capsys):
        trivial_solution()
        self.proof_complete(capsys)

    def test_loglinarith_solution(self, capsys):
        loglinarith_solution()
        self.proof_complete(capsys)

    def test_loglinarith_hard_solution(self, capsys):
        loglinarith_hard_solution()
        self.proof_complete(capsys)

    def test_loglinarith_failure_example(self, capsys):
        loglinarith_failure_example()
        captured = capsys.readouterr()
        assert "Feasible with the following values, for an unbounded order of magnitude X:" in captured.out

    def test_amgm_solution(self, capsys):
        amgm_solution()
        self.proof_complete(capsys)

    def test_bracket_submult_solution(self, capsys):
        bracket_submult_solution()
        self.proof_complete(capsys)

    def test_loglinarith_hard_solution2(self, capsys):
        loglinarith_hard_solution2()
        self.proof_complete(capsys)

    def test_littlewood_paley_solution(self, capsys):
        littlewood_paley_solution()
        self.proof_complete(capsys)

    def test_complex_littlewood_paley_solution(self, capsys):
        complex_littlewood_paley_solution()
        self.proof_complete(capsys)

    def test_subst_solution(self, capsys):
        subst_solution()
        self.proof_complete(capsys)

    def test_subst_all_solution(self, capsys):
        subst_all_solution()
        self.proof_complete(capsys)

    def test_subst_all_solution_reversed(self, capsys):
        subst_all_solution_reversed()
        self.proof_complete(capsys)

    def test_sympy_simplify_solution(self, capsys):
        sympy_simplify_solution()
        self.proof_complete(capsys)
