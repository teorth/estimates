# Lemmas

Lemmas are methods that generate proven propositional sentences assuming that any hypotheses required by the lemma are present in the proof state.  A `lemma` is deployed in a proof assistant `p` by using either `p.use(UseLemma(name,lemma))` or `p.use_lemma(lemma, name="this")`.

Currently only a proof of concept lemma is in place.  The plan is to have an extensive library of lemmas for various mathematical applications.

## Amgm(x,y)

The arithmetic mean-geometric mean inequality $(xy)^{1/2} \leq \frac{x+y}{2}$.  Needs $x,y$ to be non-negative in order to be applied.