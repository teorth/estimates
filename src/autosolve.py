from log_linarith import *
from unfold_max import *


# This is the most powerful autosolver currently available in this repository, trying all the proof techniques intelligently until it gets stuck.

def autosolve(proof_state):
    print("Trying to automatically solve all goals with all existing tactics.")
    while not proof_state.solved():
        print(f"Current goal: {proof_state.current_goal}")
        proof_state.by_contra()
        if proof_state.simp_all():
            continue
        proof_state.unfold_max()
        if proof_state.log_linarith():
            continue
        if proof_state.split_first():
            continue
        print("No existing tactics fully resolved current goal.")
        return False