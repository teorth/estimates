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

## `p.undo()`

Go back a step in the proof and clear the tactic.  (Cannot be reversed.)

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

## `p.get_hypothesis(hyp:str) -> Basic`

Return the assumption or hypothesis named `hyp` (as a `sympy` `Basic` objects).

## `p.get_var(name:str) -> Basic`

Return the variable named `name` (as a `sympy` `Basic` object).

## `p.get_vars(*names:str) -> List[Basic]`

Return the variables named in `names` (as a `List` of `sympy` `Basic` objects).

## `p.get_all_vars() -> Set[Basic]`

Return the variables in the hypotheses.

## `p.var(type:str, name:str) -> Basic`

Introduce a variable `name` of type `type`.  Only valid in assumption mode.  Currently supported variable types:

* `"real"` - real numbers
    * `"pos_real"` - positive real numbers
    * `"nonneg_real"` - nonnegative real numbers
* `"int"` - integers
    * `"pos_int"` - positive integers (natural numbers, in some contexts)
    * `"nonneg_int"` - nonnegative integers (natural numbers, in some other contexts)
* `"rat"` - rational numbers
    * `"pos_rat"` - positive rationals
    * `"noneg_rat"` - nonnegative rationals
* `"bool"` - boolean variables
* `"order"` - an order of magnitude (necessarily positive)

## `p.vars(type:str, *names:str) -> List[Basic]`

Introduce multiple variables of type `type`.  Only valid in assumption mode.  Same list of supported variable types as `p.var()`.

## `p.assume(assumption:Basic, name:str)`

Introduce an assumption `assumption` named `name`.  Only valid in assumption mode.  `assumption` must be a proposition.

## `p.begin_proof(goal:Basic)`

Enter tactic mode, with the aim of proving `goal` from previously given assumptions.  `goal` must be a proposition.