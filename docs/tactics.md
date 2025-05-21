# Tactics

Tactics are methods to transform a given proof state into zero or more further proof states.  Tactics are used via the following methods (for a given `ProofAssistant` `p`):

## `p.use(tactic:Tactic)`

Apply a tactic to the current goal, which typically will be built as via constructor from one of the subclasses of `Tactic`.  Note: if one has somehow navigated (e.g., via `p.go_back()`) to a node in the proof tree that was already treated by some existing tactic, then `p.use()` will overwrite that tactic with a new one.

## `p.all_goals_use(tactic:Tactic)`

Apply a tactic to all "sorried" goals.

# List of tactics

The proof assistant is designed to be easily extensible by the addition of further tactics. Please feel free to suggest or contribute ideas for such tactics.

The list of tactics is loosely organized into categories:

* [Propositional tactics](tactics/propositional.md) (that mostly center around the manipulation of propositions via boolean operations)
* [Linear arithmetic tactics](tactics/linarith.md) (that rely on linear programming and its variants)
* [Substitution tactics](tactics/substitution.md) - various techniques to replace one hypothesis or goal with another
* [Simplification tactics](tactics/simplification.md) - ways to "simplify" a hypothesis or goal, using other available hypotheses

# Lemmas

## `UseLemma(name:str, lemma:Lemma)`

A tactic that invokes a lemma and places it as a hypothesis under the name `name`.

## `p.use_lemma(lemma:Lemma, name:str)`

A synonym for `p.use(UseLemma(name,lemma))`.  In that case, `name` will default to `this`.

# List of lemmas

For a list of lemmas, see [this page](lemmas.md).