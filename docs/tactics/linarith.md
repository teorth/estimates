# Linear arithmetic tactics

## `Linarith(verbose = False)`

Attempts to resolve a goal as a linear combination of the equalities and inequalities present (either explicitly or implicitly) in the hypotheses.  It does this by the following steps:

1.  Negate the goal and temporarily add it to the hypotheses.
2.  Extract all inequalities present in the hypotheses (and negated conclusion), including any non-negativity or positivity properties implicit in variable declarations.  
3.  Normalize the inequalities to have constants on the right-hand side and variables on the left-hand side, and collect terms if possible.
4.  Use `z3-solver` to see if an absurd inequality such as $0 < 0$ or $0 \geq 1$ can be obtained as a linear combination of these normalized inequalities.

If the `verbose` flag is set to `True`, this tactic will output the specific linear combination required to complete the goal (if possible), or else a specific assignment of variables that shows that there is no way to reach the goal from linear arithmetic.

Limitations:
* Only real variables and rational coefficients can be treated currently.  (But because we avoid floating point arithmetic, there are no issues with roundoff errors.)

Example:
```
>>> from main import *
>>> p = linarith_exercise()
Starting proof.  Current proof state:
x: pos_real
y: pos_real
z: pos_real
h1: x < 2*y
h2: y < 3*z + 1
|- x < 7*z + 2
>>> p.use(Linarith())
Goal solved by linear arithmetic!
Proof complete!
```
Verbose version of example:
```
>>> from main import *
>>> p = linarith_exercise()
Starting proof.  Current proof state:
x: pos_real
y: pos_real
z: pos_real
h1: x < 2*y
h2: y < 3*z + 1
|- x < 7*z + 2
>>> p.use(Linarith(verbose=true))
Checking feasibility of the following inequalities:
1*z > 0
1*x + -7*z >= 2
1*y + -3*z < 1
1*y > 0
1*x > 0
1*x + -2*y < 0
Infeasible by summing the following:
1*z > 0 multiplied by 1/4
1*x + -7*z >= 2 multiplied by 1/4
1*y + -3*z < 1 multiplied by -1/2
1*x + -2*y < 0 multiplied by -1/4
Goal solved by linear arithmetic!
Proof complete!
```
If linarith fails to find a contradiction, then (with the verbose flag) it will report a specific counterexample consistent with all the inequalities it could find:
```
>>> from main import *
>>> p = linarith_impossible_example()
Starting proof.  Current proof state:
x: pos_real
y: pos_real
z: pos_real
h1: x < 2*y
h2: y < 3*z + 1
|- x < 7*z
>>> p.use(Linarith(verbose=true))
Checking feasibility of the following inequalities:
1*x + -7*z >= 0
1*x > 0
1*y + -3*z < 1
1*x + -2*y < 0
1*z > 0
1*y > 0
Feasible with the following values:
y = 2
x = 7/2
z = 1/2
Linear arithmetic was unable to prove goal.
1 goal remaining.
>>>
```

## `LogLinarith(verbose = False, splitmax = True)`

Similar to `Linarith()`, but now applies to order of magnitude inequalities rather than inequalities regarding real numbers; and uses multiplicative operations rather than additive ones.  Additive relations between order of magnitudes (which are converted to `OrderMax` expressions) are case split, unless `splitmax' is set to `False`.  (Caution: splitting maxmima (and minima) means that the run time of this method increases exponentially with the number of additions/maxima/minima present.)

Example:
```
>>> from main import *
>>> p = loglinarith_imposssible_example()
Starting proof.  Current proof state:
N: pos_int
x: pos_real
y: pos_real
h1: x <= 2*N**2 + 1
h2: y < 3*N + 4
|- Theta(x)*Theta(y) <= Theta(N)**2
>>> p.use(LogLinarith(verbose=True))
Identified the following disjunctions of asymptotic inequalities that we need to obtain a contradiction from:
['Theta(x)**1 * Max(Theta(1), Theta(N)**2)**-1 <= Theta(1)']
['Theta(N)**1 >= Theta(1)']
['Theta(y)**1 * Max(Theta(1), Theta(N))**-1 <= Theta(1)']
['Theta(x)**1 * Theta(y)**1 * Theta(N)**-2 > Theta(1)']
['Max(Theta(1), Theta(N))**-1 <= Theta(1)']
['Theta(N)**1 * Max(Theta(1), Theta(N))**-1 <= Theta(1)']
['Max(Theta(1), Theta(N))**-1 = Theta(1)', 'Theta(N)**1 * Max(Theta(1), Theta(N))**-1 = Theta(1)']
['Max(Theta(1), Theta(N)**2)**-1 <= Theta(1)']
['Theta(N)**2 * Max(Theta(1), Theta(N)**2)**-1 <= Theta(1)']
['Max(Theta(1), Theta(N)**2)**-1 = Theta(1)', 'Theta(N)**2 * Max(Theta(1), Theta(N)**2)**-1 = Theta(1)']
Checking feasibility of the following inequalities:
Theta(x)**1 * Max(Theta(1), Theta(N)**2)**-1 <= Theta(1)
Theta(N)**1 >= Theta(1)
Theta(y)**1 * Max(Theta(1), Theta(N))**-1 <= Theta(1)
Theta(x)**1 * Theta(y)**1 * Theta(N)**-2 > Theta(1)
Max(Theta(1), Theta(N))**-1 <= Theta(1)
Theta(N)**1 * Max(Theta(1), Theta(N))**-1 <= Theta(1)
Theta(N)**1 * Max(Theta(1), Theta(N))**-1 = Theta(1)
Max(Theta(1), Theta(N)**2)**-1 <= Theta(1)
Theta(N)**2 * Max(Theta(1), Theta(N)**2)**-1 <= Theta(1)
Theta(N)**2 * Max(Theta(1), Theta(N)**2)**-1 = Theta(1)
Feasible with the following values, for an unbounded order of magnitude X:
Theta(x) = X**1/2
Theta(y) = X**1/4
Max(Theta(1), Theta(N)) = X**1/4
Max(Theta(1), Theta(N)**2) = X**1/2
Theta(N) = X**1/4
```
In this case, the problem is not solvable, and an explicit asymptotic counterexample was provided.  Note that the hypothesis that `N` was a positive integer was incorporated as a hypothesis `Theta(N)**1 >= Theta(1)`.

