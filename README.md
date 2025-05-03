# Code to automatically prove or verify estimates in analysis

A project to develop a framework to automatically (or semi-automatically) prove estimates in analysis.  Estimates are inequalities of the form $X \lesssim Y$ (which means $X = O(Y)$ in asymptotic notation) or $X \ll Y$ (which means that $X = o(Y)$ in asymptotic notation).

- [Blog post](https://terrytao.wordpress.com/2025/05/01/a-proof-of-concept-tool-to-verify-estimates/)


A crude working prototype of the code has already been written; a somewhat different second attempt (creating a pseudo proof assistant environment) is currently underway.

## First attempt (crude working prototype)

Initially we will focus on proving bounds involving positive quantities (up to constants) via (inefficient) brute force case splitting.

Example: to prove that $\min(a,b) \lesssim \max(a,b)$ for all positive $a,b$, run the following code

```
    a = Variable("a")
    b = Variable("b")
    assumptions = Assumptions()
    assumptions.can_bound(min(a, b), max(a, b))
```
to obtain the following verification:
```
Checking if we can bound min(a, b) by max(a, b) from the given axioms.
We will split into the following cases:
[[a <~ b], [b <~ a]]
[[b <~ a], [a <~ b]]
Trying case: ([a <~ b], [b <~ a])
Simplify to proving (b * (a ** -1)) >= 1.
Bound was proven true by multiplying the following hypotheses :
a <~ b raised to power 1.0
Trying case: ([a <~ b], [a <~ b])
Simplify to proving (b * (a ** -1)) >= 1.
Bound was proven true by multiplying the following hypotheses :
a <~ b raised to power 1.0
Trying case: ([b <~ a], [b <~ a])
Simplify to proving (a * (b ** -1)) >= 1.
Bound was proven true by multiplying the following hypotheses :
b <~ a raised to power 1.0
Trying case: ([b <~ a], [a <~ b])
Simplify to proving (b * (a ** -1)) >= 1.
Bound was proven true by multiplying the following hypotheses :
a <~ b raised to power 1.0
Bound was proven true in all cases!
```

Similarly, to prove the weak form $(abc)^{1/3} \lesssim \max(a,b,c)$ of the AM-GM inequality, use the code
```
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    assumptions = Assumptions()
    assumptions.can_bound((a * b * c) ** (1 / 3), max(a, b, c))
```
to obtain
```
Checking if we can bound (((a * b) * c) ** 0.3333333333333333) by max(a, b, c) from the given axioms.
We will split into the following cases:
[[b <~ a, c <~ a], [a <~ b, c <~ b], [a <~ c, b <~ c]]
Trying case: ([b <~ a, c <~ a],)
Simplify to proving (((a ** 0.6666666666666667) * (b ** -0.3333333333333333)) * (c ** -0.3333333333333333)) >= 1.
Bound was proven true by multiplying the following hypotheses :
b <~ a raised to power 0.33333333
c <~ a raised to power 0.33333333
Trying case: ([a <~ b, c <~ b],)
Simplify to proving (((b ** 0.6666666666666667) * (a ** -0.3333333333333333)) * (c ** -0.3333333333333333)) >= 1.
Bound was proven true by multiplying the following hypotheses :
a <~ b raised to power 0.33333333
c <~ b raised to power 0.33333333
Trying case: ([a <~ c, b <~ c],)
Simplify to proving (((c ** 0.6666666666666667) * (a ** -0.3333333
333333333)) * (b ** -0.3333333333333333)) >= 1.
Bound was proven true by multiplying the following hypotheses :
a <~ c raised to power 0.33333333
b <~ c raised to power 0.33333333
Bound was proven true in all cases!
```
One can add initial hypotheses.  For instance, to show that $ac \lesssim bd$ whenever $a \lesssim b \lesssim c \lesssim d$, the code
```
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    d = Variable("d")
    assumptions = Assumptions()
    assumptions.add(a <= b)
    assumptions.add(b <= c)
    assumptions.add(c <= d)
    assumptions.can_bound(a * c, b * d)
```
will produce
```
Adding assumption: a <~ b
Adding assumption: b <~ c
Adding assumption: c <~ d
Checking if we can bound (a * c) by (b * d) from the given axioms.
Simplify to proving (((b * d) * (a ** -1)) * (c ** -1)) >= 1.
Bound was proven true by multiplying the following hypotheses :
a <~ b raised to power 1.0
c <~ d raised to power 1.0
Bound was proven true in all cases!
```
Of course, sometimes the hypotheses are not sufficient to establish the claim, for instance $a \lesssim b \lesssim c \lesssim d$ does not imply $ad \lesssim bc$.  Indeed, running
```
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    d = Variable("d")
    assumptions = Assumptions()
    assumptions.add(a <= b)
    assumptions.add(b <= c)
    assumptions.add(c <= d)
    assumptions.can_bound(a * d, b * c)
```
gives
```
Adding assumption: a <~ b
Adding assumption: b <~ c
Adding assumption: c <~ d
Checking if we can bound (a * d) by (b * c) from the given axioms.
Simplify to proving (((b * c) * (a ** -1)) * (d ** -1)) >= 1.
Unable to verify bound.
```

One can also impose "Littlewood-Paley conditions" on tuples such as $(a,b,c)$, which means that these numbers can be the magnitudes (up to constants) of vectors that sum to zero.  In other words: either $a \lesssim b \sim c$, $b \lesssim c \sim a$, or $c \lesssim a \sim b$.  These sorts of conditions arise when considering nonlinear interactions between different frequencies in a PDE.  For instance, a Littlewood-Paley condition on $(a,b,c)$ can imply that $\max(a,b,c)^2 \min(a,b,c) \lesssim abc$:
```
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    assumptions = Assumptions()
    assumptions.add_lp(a,b,c)
    assumptions.can_bound(max(a, b, c)**2 * min(a,b,c), a * b * c)
```
The brute-force solver splits into $3^3 = 27$ cases here, so will not be reproduced here.