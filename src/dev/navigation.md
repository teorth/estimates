# Navigation tools

In this page, `p` is assumed to be a `ProofState()` object, created either by `p = ProofState()` or by using [one of the provided examples](exercises.md).

## `print(p)`

Prints the current proof state.

## `print(p.proof())`

Prints the current proof.

## `p.next_goal()`

Advance to the next unresolved goal (if any).

## `p.previous_goal()`

Move back to the previous unresolved goal (if any).

## `p.first_goal()`

Move to the first unresolved goal (if any).

## `p.last_goal()`

Move to the last unresolved goal (if any).

## `p.go_back()`

Go back a step in the proof (to a step that was already handled by some tactic).

## `p.go_forward(n:int)`

Go forward to the `n`th branch in the proof immediately following the current step.  (This assumes that the current step generated at least `n` new proof states.)


## `p.auto_finish_on()`

Automatically finish a proof when all goals are completed. (This is the default.)

## `p.auto_finish_off()`

Do not automatically finish a proof when all goals are complete.

## `p.exit_proof()`

Exit Tactic mode and return to Assumption mode (but keep the current proof tree).

## `p.enter_proof()`

Exit Assumption mode and enter Tactic mode (assuming that a proof has been started).

## `p.abandon_proof()`

Exit Tactic mode and return to Assumption mode, clearing the hypotheses and goal of the proof.

## `p.status()`

List how many goals are remaining.

## `p.list_goals()`

List all the goals remaining.

