# Lemmas

Lemmas are methods that generate proven propositional sentences assuming that any hypotheses required by the lemma are present in the proof state.  A `lemma` is deployed in a proof assistant `p` by using either `p.use(UseLemma(name,lemma))` or `p.use_lemma(lemma, name="this")`.

Currently only aproof of concept lemmas are in place.  The plan is to have an extensive library of lemmas for various mathematical applications.

## Rfl(expr)

The reflexive axiom `expr = expr`.

## Amgm(x_1, ..., x_n)

The arithmetic mean-geometric mean inequality $(x_1 \dots X_n)^{1/n} \leq \frac{x_1+\dots+x_n}{2}$.  Needs the $x_i$ to be non-negative in order to be applied.

Example:
```
>>> from estimates.main import *
>>> p = amgm_exercise()
Starting proof.  Current proof state:
x: nonneg_real
y: nonneg_real
|- 2*x*y <= x**2 + y**2
>>> x,y = p.get_vars("x","y")
>>> p.use_lemma(Amgm(x**2,y**2))
Applying lemma am_gm(x**2, y**2) to conclude this: x**1.0*y**1.0 <= x**2/2 + y**2/2.
1 goal remaining.
>>> p.use(SimpAll())
Goal solved!
Proof complete!
```