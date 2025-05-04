# Code to automatically prove or verify estimates in analysis

A project to develop a framework to automatically (or semi-automatically) prove estimates in analysis.  Estimates are inequalities of the form $X \lesssim Y$ (which means $X = O(Y)$ in asymptotic notation) or $X \ll Y$ (which means that $X = o(Y)$ in asymptotic notation).

- [Blog post explaining the project](https://terrytao.wordpress.com/2025/05/01/a-proof-of-concept-tool-to-verify-estimates/)
- [A proof-of-concept prototype](src/first_attempt/README.md)

## First example: Propositional logic

Examples of the code can be found [here](src/examples.py).  We now give some worked out cases.

Even though the primary motivation was to prove asymptotic estimates, it turned out to be natural to build a framework that can handle propositional logic, in particular boolean connectives such as `AND` and `OR`, basically in order to take advantage of dichotomies such as "$X \lesssim Y$ OR $X \gg Y$".  So we will begin with an example of the code in pure propositional logic.

The code is inspired by the tactic mode of modern proof assistants such as Lean, in which at any given moment one is in a "proof state" with several "goals", each of which aims to deduce a conclusion from some hypotheses.  Here is a starting example (where the text indented by arrows is Python code, and the unindented text is the output):

```
>>> A = Proposition("A")
>>> B = Proposition("B")
>>> C = Proposition("C")
>>> D = Proposition("D")
>>> proof_state = begin_proof( Or(And(A,C),And(B,C),And(A,D),And(B,D)), { Or(A,B), Or(C,D) } )

Starting proof with goal: Assuming: (A OR B), (C OR D), prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
```

Here, we have a problem to solve in propositional logic: `A`, `B`, `C`, `D` are atomic propositions (statements that can be true or false), we are given the two hypothesis `A OR B` and `C OR D`, and we wish to show that one of `A AND C`, `B OR C`, `A AND D`, and `B AND D` is true.

At any time, one can print out the proof state:
```
>>> print(proof_state)

1. [Current Goal] Assuming: (A OR B), (C OR D), prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
```

To proceed further one has to apply a suitable tactic.  For this example, we will choose to `split()` the hypothesis `A OR B` into two cases, one where `A` holds and one where `B` holds.

```
>>> proof_state.split(Or(A,B))

Splitting hypothesis (A OR B) into cases.
```

Again, we can inspect the proof state to see what has changed:
```
>>> print(proof_state)

1. [Current Goal] Assuming: (C OR D), A, prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
2. Assuming: (C OR D), B, prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
```
Note that we now have two goals to prove, corresponding to the two cases.  But the "Current goal" is "pointing" at Goal 1; this is the goal that tactics will currently try to resolve.

Now that we have that `A` is true, we should be able to simplify many of the expressions in our proof state; for instance, `A AND D` should simplify to `D`.  We have a `simp_all()` tactic to do this automatically:
```
>>> proof_state.simp_all()

Simplifying hypotheses and conclusion in the current goal...
Simplifying ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D)) to (C OR (B AND C) OR D OR (B AND D)).
```
Again, we can inspect the proof state:
```
>>> print(proof_state)

1. [Current Goal] Assuming: (C OR D), A, prove: (C OR (B AND C) OR D OR (B AND D))
2. Assuming: (C OR D), B, prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
```
Note that `simp_all()` has only simplified the current goal, not the other goals.  (I may upgrade the functionality of this tactic later so that it simplifies all goals simultaneously.)

To proceed further, we can also `split()` the hypothesis `C OR D` and try `simp_all()` again:
```
>>> proof_state.split(C OR D)
Splitting hypothesis (C OR D) into cases.
>>> proof_state.simp_all()
Simplifying hypotheses and conclusion in the current goal...
Simplifying (C OR D OR (B AND C) OR (B AND D)) to TRUE.
Current goal solved!
```
Now the conclusion got simplified all the way to `TRUE`, in which case the goal got resolved, leaving two further goals remaining:
```
>>> print(proof_state)

1. [Current Goal] Assuming: A, D, prove: (C OR D OR (B AND C) OR (B AND D))
2. Assuming: (C OR D), B, prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
```
One can continue in this fashion until all the goals are resolved, though in this particular case one can also apply a combined `simp_and_split()` tactic to one-shot the whole thing:
```
>>> A = Proposition("A")
>>> B = Proposition("B")
>>> C = Proposition("C")
>>> D = Proposition("D")
>>> proof_state = begin_proof( Or(And(A,C),And(B,C),And(A,D),And(B,D)), { Or(A,B), Or(C,D) } )

Starting proof with goal: Assuming: (A OR B), (C OR D), prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))

>>> proof_state.simp_and_split()

Trying the repeated simplification and splitting tactic.
Current goal: Assuming: (A OR B), (C OR D), prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
Simplifying hypotheses and conclusion in the current goal...
Splitting hypothesis (A OR B) into cases.
Current goal: Assuming: (C OR D), A, prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
Simplifying hypotheses and conclusion in the current goal...
Simplifying ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D)) to (C OR D OR (B AND C) OR (B AND D)).
Splitting hypothesis (C OR D) into cases.
Current goal: Assuming: A, C, prove: (C OR D OR (B AND C) OR (B AND D))
Simplifying hypotheses and conclusion in the current goal...
Simplifying (C OR D OR (B AND C) OR (B AND D)) to TRUE.
Current goal solved!
Current goal: Assuming: (C OR D), B, prove: ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D))
Simplifying hypotheses and conclusion in the current goal...
Simplifying ((A AND C) OR (B AND C) OR (A AND D) OR (B AND D)) to ((A AND C) OR C OR D OR (A AND D)).
Splitting hypothesis (C OR D) into cases.
Current goal: Assuming: B, C, prove: ((A AND C) OR C OR D OR (A AND D))
Simplifying hypotheses and conclusion in the current goal...
Simplifying ((A AND C) OR C OR D OR (A AND D)) to TRUE.
Current goal solved!
Current goal: Assuming: B, D, prove: ((A AND C) OR C OR D OR (A AND D))
Simplifying hypotheses and conclusion in the current goal...
Simplifying ((A AND C) OR C OR D OR (A AND D)) to TRUE.
Current goal solved!
Current goal: Assuming: A, D, prove: (C OR D OR (B AND C) OR (B AND D))
Simplifying hypotheses and conclusion in the current goal...
Simplifying (C OR D OR (B AND C) OR (B AND D)) to TRUE.
All goals solved!
```
Basically, this tactic brute forced this propositional logic problem by repeatedly splitting into cases and simplifying until all goals were solved.

## Second example: simple multiplicative inequalities

The main goal of this project is to obtain estimates involving non-negative quantities such as `X`, where we are only interested in the order of magnitude of these quantities rather than their exact value; in particular, our estimates are up to multiplicative constants.  We will be interested in the following type of asymptotic estimates:

1.  $X \lesssim Y$ (also denoted $X = O(Y)$), which means that $X$ is bounded by a constant times $Y$.
2.  $X \sim Y$ (also denoted $X \asymp Y$), which means that $X \lesssim Y \lesssim X$, that is to say $X$ and $Y$ are bounded by constant multiples of each other.
3.  $X \ll Y$ (also denoted $X = o(Y)$), which means that, for any fixed $\varepsilon>0$, that $X \leq \varepsilon Y$ if a certain asymptotic parameter is large enough.

One can also formalize these asymptotics using the language of nonstandard analysis, but we will not dwell on these foundational issues here.

Such non-negative quantities are instantiated using the `Variable()` constructor, and the usual ordering symbols `<`, `<=`, `>`, `>=` are used to describe $\ll$, $\lesssim$, $\gg$, $\gtrsim$ relationships, though for technical reasons we cannot use either of the Python equality symbols `=`, `==` to define comparability, and will use `asymp()` instead.  For simple multiplicative problems, the tactic `log_linarith()`, which performs linear arithmetic at the log scale, suffices:

```
>>> X = Variable("X")
>>> Y = Variable("Y")
>>> Z = Variable("Z")
>>> W = Variable("W")
>>> U = Variable("U")
>>> proof_state = begin_proof( X*Z**2 < Y*U*W, { X <= Y, Z < W, Z.asymp(U) })

Starting proof with goal: Assuming: X <~ Y, Z << W, Z ~ U, prove: (X * (Z ^ 2)) << (Y * U * W)

>>> proof_state.log_linarith()

Assume for contradiction that (X * (Z ^ 2)) << (Y * U * W) fails.
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
Z * W^-1 << 1 raised to power -1
X * Y^-1 <~ 1 raised to power -1
X * Z^2 * Y^-1 * U^-1 * W^-1 >~ 1 raised to power 1
Z * U^-1 ~ 1 raised to power -1
All goals solved!
```

The `log_linarith()` tactic first uses proof by contradiction to add the (negation of the) desired conclusion as an additional hypothesis, then one normalizes all the estimates to have 1 on the right-hand side.  An (exact arithmetic) linear programming package (from Z3) is then called to determine if a contradiction is found; if so, a certificate to give the contradiction, by multiplying various hypotheses raised to suitable powers, is provided, in order to obtain an absurd conclusion such as $1 \gg 1$.

Of course, sometimes the linear program fails.  In that case, a dual program is run to locate an asymptotic counterexample:
```
>>> x = Variable("x")
>>> y = Variable("y")
>>> z = Variable("z")
>>> proof_state = begin_proof( x <= z, {x**2 < y, y**2 < z } )

Starting proof with goal: Assuming: (x ^ 2) << y, (y ^ 2) << z, prove: x <~ z

>>> proof_state.log_linarith()

Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):
y = N^-5/6
z = N^-7/6
x = N^-2/3
```
In this case, we can show that the hypotheses $X^2 \ll Y$, $Y^2 \ll Z$ fail to imply $X \lesssim Z$ by exhibiting a (somewhat arbitrarily chosen) asymptotic family of counterexamples.

Basic algebraic simplifications, such as gathering like terms, is supported:
```
>>> x = Variable("x")
>>> y = Variable("y")
>>> z = Variable("z")
>>> proof_state = begin_proof( (x*sqrt(y))**4 * 3 / x < z * y * z**(-2))

Starting proof with goal: Prove: ((((x * (y ^ 1/2)) ^ 4) * 3) / x) << (z * y * (z ^ -2))

>>> proof_state.simp_all()

Simplifying ((((x * (y ^ 1/2)) ^ 4) * 3) / x) << (z * y * (z ^ -2)) to ((z ^ -1) * (y ^ -1) * (x ^ -3)) >> 1.
```

Note that the simplifier is designed to be useful to computers, rather than elegant for human readers; humans may for instance wish to move the negative exponent terms to the other side to make the exponents positive.

## Third example: addition and max/min

Importantly, these tools can not only handle purely multiplicative estimates, but also estimates involving addition, as well as the `max` and `min` operations.  In fact, in this order of magnitude setting, addition and `max` are equivalent; for instance, $X+Y \sim \max(X,Y)$.

Our main way of dealing with expressions such as $\max(X,Y)$ is to make these expressions variables in their own right.  If we let $[\max(X,Y)]$ denote a new variable that is supposed to represent the maximum of $X$ and $Y$, then a estimate such as $\max(X,Y) * Z \ll W$ which involves both multiplicative operations and the `max` operation can now be written as the purely multiplicative estimate $[\max(X,Y)] * Z \ll W$, as well as the defining relation $[\max(X,Y)] \sim \max(X,Y)$.  This defining relation can then be decomposed into two further estimates
$$ X \lesssim [\max(X,Y)] \hbox{ AND } Y \lesssim [\max(X,Y)]$$
as well as a further disjunction
$$ X \sim [\max(X,Y)] \hbox{ OR } Y \sim [\max(X,Y)].$$
On performing a `split()` of the latter disjunction one now has purely multiplicative estimates, suitable for tackling by tools such as `log_linarith()`.

The tactic `unfold_max()` is designed to convert all `max` type expressions into variables in this fashion.  Here is a simple example of it in action:

```
>>> a = Variable("a")
>>> b = Variable("b")
>>> proof_state = begin_proof( min(a,b) <= max(a,b) )

Starting proof with goal: Prove: min(a, b) <~ max(a, b)

>>> proof_state.unfold_max()

Creating new variables: "min(a, b)", "max(a, b)"

>>> print(proof_state)

1. [Current Goal] Assuming: b >~ "min(a, b)", a <~ "max(a, b)", a >~ "min(a, b)", (a ~ "min(a, b)" OR b ~ "min(a, b)"), b <~ "max(a, b)", (a ~ "max(a, b)" OR b ~ "max(a, b)"), prove: "min(a, b)" <~ "max(a, b)"

>>> proof_state.log_linarith()

Assume for contradiction that "min(a, b)" <~ "max(a, b)" fails.
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
"min(a, b)" * "max(a, b)"^-1 >> 1 raised to power 1
b * "min(a, b)"^-1 >~ 1 raised to power 1
b * "max(a, b)"^-1 <~ 1 raised to power -1
All goals solved!
```

Here is another example, proving the arithmetic mean-geometric mean inequality (up to constants):

```
>>> a = Variable("a")
>>> b = Variable("b")
>>> c = Variable("c")
>>> proof_state = begin_proof( (a*b*c)**Fraction(1,3) <= (a+b+c)/3 )

Starting proof with goal: Prove: ((a * b * c) ^ 1/3) <~ ((a + b + c) / 3)

>>> proof_state.unfold_max()

Creating new variables: "(a + b + c)"

>>> proof_state.log_linarith()

Assume for contradiction that ((a * b * c) ^ 1/3) <~ ("(a + b + c)" / 3) fails.
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
a * "(a + b + c)"^-1 <~ 1 raised to power -1/3
a^1/3 * b^1/3 * c^1/3 * "(a + b + c)"^-1 >> 1 raised to power 1
c * "(a + b + c)"^-1 <~ 1 raised to power -1/3
b * "(a + b + c)"^-1 <~ 1 raised to power -1/3
```

The most powerful tactic currently available is `autosolve()`, which repeatedly tries all of the above tactics to exhaustively resolve all goals.  However, the proofs produced are rather lengthy.  Here is an example, using the "Littlewood-Paley property" `LP(x,y,z)` that `x,y,z` are the magnitudes of three vectors summing to zero (which means that two of these three magnitudes are comparable, and bound the third):

```
>>> x = Variable("x")
>>> y = Variable("y")
>>> z = Variable("z")
>>> proof_state = begin_proof( min(x,y,z)*max(x,y,z)**2 <= x*y*z, { LP_property(x,y,z) } )
   
Starting proof with goal: Assuming: ((x ~ y AND z <~ x) OR (x ~ z AND y <~ x) OR (y ~ z AND x <~ y)), prove: (min(x, y, z) * (max(x, y, z) ^ 2)) <~ (x * y * z)

>>> proof_state.autosolve()

Trying to automatically solve all goals with all existing tactics.
Current goal: Assuming: ((x ~ y AND z <~ x) OR (x ~ z AND y <~ x) OR (y ~ z AND x <~ y)), prove: (min(x, y, z) * (max(x, y, z) ^ 2)) <~ (x * y * z)
Assume for contradiction that (min(x, y, z) * (max(x, y, z) ^ 2)) <~ (x * y * z) fails.
Simplifying hypotheses and conclusion in the current goal...
Simplifying ((x ~ y AND z <~ x) OR (x ~ z AND y <~ x) OR (y ~ z AND x <~ y)) to (((x * (y ^ -1)) ~ 1 AND (x * (z ^ -1)) >~ 1) OR ((x * (z ^ -1)) ~ 1 AND (x * (y ^ -1)) >~ 1) OR ((y * (z ^ -1)) ~ 1 AND (y * (x ^ -1)) >~ 1)).
Simplifying (min(x, y, z) * (max(x, y, z) ^ 2)) >> (x * y * z) to (min(x, y, z) * (max(x, y, z) ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1.      
Creating new variables: "min(x, y, z)", "max(x, y, z)"
Trying to obtain a contradiction by logarithmic linear arithmetic...
Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):
"min(x, y, z)" = N^-1/2
y = N^0
z = N^-1/2
"max(x, y, z)" = N^0
x = N^-1/2
Splitting hypothesis (((x * (y ^ -1)) ~ 1 AND (x * (z ^ -1)) >~ 1) OR ((x * (z ^ -1)) ~ 1 AND (x * (y ^ -1)) >~ 1) OR ((y * (z ^ -1)) ~ 1 AND (y * (x ^ -1)) >~ 1)) into cases.
Current goal: Assuming: y >~ "min(x, y, z)", x <~ "max(x, y, z)", z <~ "max(x, y, z)", (x ~ "max(x, y, z)" OR z ~ "max(x, y, z)" OR y ~ "max(x, y, z)"), y <~ "max(x, y, z)", (x ~ "min(x, y, z)" OR y ~ "min(x, y, z)" OR z ~ "min(x, y, z)"), z >~ "min(x, y, z)", x >~ "min(x, y, z)", ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, ((x * (y ^ -1)) ~ 1 AND (x * (z ^ -1)) >~ 1), prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Simplifying y >~ "min(x, y, z)" to (y * ("min(x, y, z)" ^ -1)) >~ 1.
Simplifying x <~ "max(x, y, z)" to ("max(x, y, z)" * (x ^ -1)) >~ 1.
Simplifying z <~ "max(x, y, z)" to ("max(x, y, z)" * (z ^ -1)) >~ 1.
Simplifying (x ~ "max(x, y, z)" OR z ~ "max(x, y, z)" OR y ~ "max(x, y, z)") to ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1).
Simplifying y <~ "max(x, y, z)" to ("max(x, y, z)" * (y ^ -1)) >~ 1.
Simplifying (x ~ "min(x, y, z)" OR y ~ "min(x, y, z)" OR z ~ "min(x, y, z)") to ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1).
Simplifying z >~ "min(x, y, z)" to (z * ("min(x, y, z)" ^ -1)) >~ 1.
Simplifying x >~ "min(x, y, z)" to (x * ("min(x, y, z)" ^ -1)) >~ 1.
Expanding hypothesis ((x * (y ^ -1)) ~ 1 AND (x * (z ^ -1)) >~ 1) into conjuncts ((x * (y ^ -1)) ~ 1, (x * (z ^ -1)) >~ 1).
Trying to obtain a contradiction by logarithmic linear arithmetic...
Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):
"min(x, y, z)" = N^0
y = N^0
z = N^0
"max(x, y, z)" = N^1/2
x = N^0
Splitting hypothesis ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1) into cases.
Current goal: Assuming: (x * (z ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (x * (y ^ -1)) ~ 1, ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1), (z * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (x * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
z * "min(x, y, z)"^-1 >~ 1 raised to power 1
x * "max(x, y, z)"^-1 ~ 1 raised to power 2
x * y^-1 ~ 1 raised to power -1
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
Current goal solved!
Current goal: Assuming: x >~ "min(x, y, z)", y <~ "max(x, y, z)", ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, z <~ "max(x, y, z)", (x ~ "min(x, y, z)" OR y ~ "min(x, y, z)" OR z ~ "min(x, y, z)"), y >~ "min(x, y, z)", z >~ "min(x, y, z)", x <~ "max(x, y, z)", (x ~ "max(x, y, z)" OR z ~ "max(x, y, z)" OR y ~ "max(x, y, z)"), ((x * (z ^ -1)) ~ 1 AND (x * (y ^ -1)) >~ 1), prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Simplifying x >~ "min(x, y, z)" to (x * ("min(x, y, z)" ^ -1)) >~ 1.
Simplifying y <~ "max(x, y, z)" to ("max(x, y, z)" * (y ^ -1)) >~ 1.
Simplifying z <~ "max(x, y, z)" to ("max(x, y, z)" * (z ^ -1)) >~ 1.
Simplifying (x ~ "min(x, y, z)" OR y ~ "min(x, y, z)" OR z ~ "min(x, y, z)") to ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1).
Simplifying y >~ "min(x, y, z)" to (y * ("min(x, y, z)" ^ -1)) >~ 1.
Simplifying z >~ "min(x, y, z)" to (z * ("min(x, y, z)" ^ -1)) >~ 1.
Simplifying x <~ "max(x, y, z)" to ("max(x, y, z)" * (x ^ -1)) >~ 1.
Simplifying (x ~ "max(x, y, z)" OR z ~ "max(x, y, z)" OR y ~ "max(x, y, z)") to ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1).
Expanding hypothesis ((x * (z ^ -1)) ~ 1 AND (x * (y ^ -1)) >~ 1) into conjuncts ((x * (z ^ -1)) ~ 1, (x * (y ^ -1)) >~ 1).
Trying to obtain a contradiction by logarithmic linear arithmetic...
Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):
x = N^0
z = N^0
"max(x, y, z)" = N^1/2
y = N^0
"min(x, y, z)" = N^0
Splitting hypothesis ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1) into cases.
Current goal: Assuming: (x * (z ^ -1)) ~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (x * (y ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1), ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (x * ("min(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):
x = N^0
y = N^0
"min(x, y, z)" = N^0
z = N^0
"max(x, y, z)" = N^1/2
Splitting hypothesis ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1) into cases.
Current goal: Assuming: (x * (z ^ -1)) ~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) ~ 1, (x * ("max(x, y, z)" ^ -1)) ~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (x * (y ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
x * "max(x, y, z)"^-1 ~ 1 raised to power 2
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
y * "min(x, y, z)"^-1 >~ 1 raised to power 1
x * z^-1 ~ 1 raised to power -1
Current goal solved!
Current goal: Assuming: (x * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (x * (z ^ -1)) ~ 1, (y * ("min(x, y, z)" ^ -1)) ~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1), (x * (y ^ -1)) >~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):
y = N^0
z = N^0
"min(x, y, z)" = N^0
"max(x, y, z)" = N^1/2
x = N^0
Splitting hypothesis ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1) into cases.
Current goal: Assuming: (y * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (x * (z ^ -1)) ~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) ~ 1, (x * (y ^ -1)) >~ 1, (x * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
x * z^-1 ~ 1 raised to power -1
y * "min(x, y, z)"^-1 >~ 1 raised to power 1
x * "max(x, y, z)"^-1 ~ 1 raised to power 2
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
Current goal solved!
Current goal: Assuming: ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (x * (z ^ -1)) ~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (x * (y ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1), ("max(x, y, z)" * (x ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):
"max(x, y, z)" = N^1/2
y = N^0
"min(x, y, z)" = N^0
x = N^0
z = N^0
Splitting hypothesis ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1) into cases.
Current goal: Assuming: (x * (z ^ -1)) ~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (x * (y ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, (x * ("max(x, y, z)" ^ -1)) ~ 1, (z * ("min(x, y, z)" ^ -1)) ~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
x * "max(x, y, z)"^-1 ~ 1 raised to power 2
y * "min(x, y, z)"^-1 >~ 1 raised to power 1
x * z^-1 ~ 1 raised to power -1
Current goal solved!
Current goal: Assuming: ("max(x, y, z)" * (y ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (y * ("max(x, y, z)" ^ -1)) ~ 1, (x * (z ^ -1)) ~ 1, (x * (y ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (x * ("min(x, y, z)" ^ -1)) ~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
x * "min(x, y, z)"^-1 >~ 1 raised to power 1
y * "max(x, y, z)"^-1 ~ 1 raised to power 2
x * y^-1 >~ 1 raised to power 1
x * z^-1 ~ 1 raised to power -1
Current goal solved!
Current goal: Assuming: ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1), (y * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (x * (y ^ -1)) ~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (x * (z ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (y * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
z * "min(x, y, z)"^-1 >~ 1 raised to power 1
x * y^-1 ~ 1 raised to power 1
y * "max(x, y, z)"^-1 ~ 1 raised to power 2
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
Current goal solved!
Current goal: Assuming: y <~ "max(x, y, z)", y >~ "min(x, y, z)", ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (x ~ "min(x, y, z)" OR y ~ "min(x, y, z)" OR z ~ "min(x, y, z)"), z >~ "min(x, y, z)", (x ~ "max(x, y, z)" OR z ~ "max(x, y, z)" OR y ~ "max(x, y, z)"), x <~ "max(x, y, z)", x >~ "min(x, y, z)", z <~ "max(x, y, z)", ((y * (z ^ -1)) ~ 1 AND (y * (x ^ -1)) >~ 1), prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Simplifying y <~ "max(x, y, z)" to ("max(x, y, z)" * (y ^ -1)) >~ 1.
Simplifying y >~ "min(x, y, z)" to (y * ("min(x, y, z)" ^ -1)) >~ 1.
Simplifying (x ~ "min(x, y, z)" OR y ~ "min(x, y, z)" OR z ~ "min(x, y, z)") to ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1).
Simplifying z >~ "min(x, y, z)" to (z * ("min(x, y, z)" ^ -1)) >~ 1.
Simplifying (x ~ "max(x, y, z)" OR z ~ "max(x, y, z)" OR y ~ "max(x, y, z)") to ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1).
Simplifying x <~ "max(x, y, z)" to ("max(x, y, z)" * (x ^ -1)) >~ 1.
Simplifying x >~ "min(x, y, z)" to (x * ("min(x, y, z)" ^ -1)) >~ 1.
Simplifying z <~ "max(x, y, z)" to ("max(x, y, z)" * (z ^ -1)) >~ 1.
Expanding hypothesis ((y * (z ^ -1)) ~ 1 AND (y * (x ^ -1)) >~ 1) into conjuncts ((y * (z ^ -1)) ~ 1, (y * (x ^ -1)) >~ 1).
Trying to obtain a contradiction by logarithmic linear arithmetic...
Unfortunately, the purely multiplicative hypotheses are feasible.  Sample feasible values (for N large):
x = N^0
y = N^0
"min(x, y, z)" = N^0
"max(x, y, z)" = N^1/4
z = N^0
Splitting hypothesis ((x * ("max(x, y, z)" ^ -1)) ~ 1 OR (y * ("max(x, y, z)" ^ -1)) ~ 1 OR (z * ("max(x, y, z)" ^ -1)) ~ 1) into cases.
Current goal: Assuming: (y * (z ^ -1)) ~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1), (x * ("min(x, y, z)" ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (y * (x ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (x * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
y * x^-1 >~ 1 raised to power 1
x * "max(x, y, z)"^-1 ~ 1 raised to power 2
y * z^-1 ~ 1 raised to power -1
y * "min(x, y, z)"^-1 >~ 1 raised to power 1
Current goal solved!
Current goal: Assuming: (z * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (y * (z ^ -1)) ~ 1, (y * (x ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1), ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (z * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
x * "min(x, y, z)"^-1 >~ 1 raised to power 1
z * "max(x, y, z)"^-1 ~ 1 raised to power 2
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
y * z^-1 ~ 1 raised to power 1
Current goal solved!
Current goal: Assuming: ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) ~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (x * (z ^ -1)) ~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (x * (y ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, (z * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
y * "min(x, y, z)"^-1 >~ 1 raised to power 1
z * "max(x, y, z)"^-1 ~ 1 raised to power 2
x * z^-1 ~ 1 raised to power 1
Current goal solved!
Current goal: Assuming: (x * (z ^ -1)) ~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (z * ("max(x, y, z)" ^ -1)) ~ 1, (x * (y ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) ~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
x * z^-1 ~ 1 raised to power 1
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
y * "min(x, y, z)"^-1 >~ 1 raised to power 1
z * "max(x, y, z)"^-1 ~ 1 raised to power 2
Current goal solved!
Current goal: Assuming: (y * ("min(x, y, z)" ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (x * (y ^ -1)) >~ 1, (x * (z ^ -1)) ~ 1, (y * ("min(x, y, z)" ^ -1)) ~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (y * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
z * "min(x, y, z)"^-1 >~ 1 raised to power 1
x * "min(x, y, z)"^-1 >~ 1 raised to power 1
y * "max(x, y, z)"^-1 ~ 1 raised to power 2
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
y * "min(x, y, z)"^-1 ~ 1 raised to power -1
Current goal solved!
Current goal: Assuming: (x * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (x * (y ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) ~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (x * (z ^ -1)) ~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (y * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
z * "min(x, y, z)"^-1 ~ 1 raised to power 1
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
y * "max(x, y, z)"^-1 ~ 1 raised to power 2
x * y^-1 >~ 1 raised to power 1
Current goal solved!
Current goal: Assuming: ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (y * (z ^ -1)) ~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1), (y * ("min(x, y, z)" ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, (y * (x ^ -1)) >~ 1, (y * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
x * "min(x, y, z)"^-1 >~ 1 raised to power 1
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
y * "max(x, y, z)"^-1 ~ 1 raised to power 2
y * z^-1 ~ 1 raised to power -1
Current goal solved!
Current goal: Assuming: (x * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, ((x * ("min(x, y, z)" ^ -1)) ~ 1 OR (y * ("min(x, y, z)" ^ -1)) ~ 1 OR (z * ("min(x, y, z)" ^ -1)) ~ 1), (x * (y ^ -1)) ~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) >~ 1, (x * (z ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, (z * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
x * z^-1 >~ 1 raised to power 2
z * "min(x, y, z)"^-1 >~ 1 raised to power 1
x * y^-1 ~ 1 raised to power -1
z * "max(x, y, z)"^-1 ~ 1 raised to power 2
Current goal solved!
Current goal: Assuming: (y * ("min(x, y, z)" ^ -1)) >~ 1, (x * ("min(x, y, z)" ^ -1)) >~ 1, (z * ("min(x, y, z)" ^ -1)) >~ 1, ("max(x, y, z)" * (y ^ -1)) >~ 1, ("max(x, y, z)" * (z ^ -1)) >~ 1, (x * (y ^ -1)) >~ 1, ("max(x, y, z)" * (x ^ -1)) >~ 1, (y * ("min(x, y, z)" ^ -1)) ~ 1, (x * (z ^ -1)) ~ 1, ("min(x, y, z)" * ("max(x, y, z)" ^ 2) * (x ^ -1) * (y ^ -1) * (z ^ -1)) >> 1, (z * ("max(x, y, z)" ^ -1)) ~ 1, prove: FALSE
Simplifying hypotheses and conclusion in the current goal...
Trying to obtain a contradiction by logarithmic linear arithmetic...
A contradiction can be obtained by multiplying the following estimates:
"min(x, y, z)" * "max(x, y, z)"^2 * x^-1 * y^-1 * z^-1 >> 1 raised to power 1
x * z^-1 ~ 1 raised to power 1
y * "min(x, y, z)"^-1 >~ 1 raised to power 1
z * "max(x, y, z)"^-1 ~ 1 raised to power 2
All goals solved!
```
