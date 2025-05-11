# List of tactics

Tactics are methods to transform a given proof state into zero or more further proof states.  They will normally be called by the `use()` method of `ProofAssistant`.

The proof assistant is designed to be easily extensible by the addition of further tactics. Please feel free to suggest or contribute ideas for such tactics.

The list of tactics is loosely organized into categories:

* [Propositional tactics](tactics/propositional.md) (that mostly center around the manipulation of propositions via boolean operations)
* [Linear arithmetic tactics](tactics/linarith.md) (that rely on linear programming and its variants)
* [Substitution tactics](tactics/substitution.md) - various techniques to replace one hypothesis or goal with another
* [Simplification tactics](tactics/simplification.md) - ways to "simplify" a hypothesis or goal, using other available hypotheses

# Lemmas

## `UseLemma(name:str, lemma:Lemma)`

Invokes a lemma and places it as a hypothesis under the name `name`.

One can use `p.use_lemma(lemma, name)` as a synonym for `p.use(UseLemma(name,lemma))`.  In that case, `name` will default to `this`.

For a list of lemmas, see [this page](lemmas.md).