import os
import subprocess
import sys
from pathlib import Path


def test_unsound_calc_chain_is_rejected_with_optimization() -> None:
    source = """
from sympy import symbols
from estimates.proofstate import ProofState
from estimates.simp import Calc
x, y, z = symbols('x y z', real=True)
try:
    Calc('<', z, '>').activate(ProofState(x < y))
except (AssertionError, ValueError):
    pass
else:
    raise RuntimeError('A mixed-direction chain cannot prove x < y')
"""
    result = subprocess.run(
        [sys.executable, "-O", "-c", source],
        env={
            **os.environ,
            "PYTHONPATH": str(Path(__file__).resolve().parents[1] / "src"),
        },
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr


def test_valid_monotone_calc_chain_still_splits() -> None:
    from sympy import symbols

    from estimates.proofstate import ProofState
    from estimates.simp import Calc

    x, y, z = symbols("x y z", real=True)
    result = Calc("<", z, "<=").activate(ProofState(x < y))
    assert [state.goal for state in result] == [x < z, z <= y]
