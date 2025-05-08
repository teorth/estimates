# List of tactics

Tactics are methods to transform a given proof state into zero or more further proof states.  They will normally be called by the `use()` method of `ProofAssistant`.

The proof assistant is designed to be easily extensible by the addition of further tactics. Please feel free to suggest or contribute ideas for such tactics.

## Propositional logic tactics

### `Cases(hyp:str="this")`

Takes a hypothesis `hyp` that is a disjunction (several statements joined together by the "or" operator `|`) and splits into one subgoal for each disjunct, in which the hypothesis `hyp` is replaced by that disjunct.

Example:
```
>>> from main import *
>>> p = case_split_exercise()
Starting proof.  Current proof state:
P: bool
Q: bool
R: bool
S: bool
h1: P | Q
h2: R | S
|- (P & R) | (P & S) | (Q & R) | (Q & S)
>>> p.use(Cases("h1"))
Splitting h1: P | Q into cases.
2 goals remaining.
```

### `SplitGoal()`
### `SplitHyp(hyp:str="this", *names:str)`

`SplitGoal()` splits the goal (if it is a conjunction - several statements joined together by the "and" operator `&`) into one subgoal for each conjunct.  `SplitHyp(hyp,*names)` is similar but splits a hypothesis `hyp` (if it is a conjunction) into multiple new hypotheses (using the provided `names` if available, or using a default naming system otherwise.)

Example:
```
>>> from main import *
>>> p = split_exercise()
Starting proof.  Current proof state:
x: real
y: real
h1: (x > -1) & (x < 1)
h2: (y > -2) & (y < 2)
|- (x + y > -3) & (x + y < 3)
>>> p.use(SplitHyp("h1"))
Decomposing h1: (x > -1) & (x < 1) into components x > -1, x < 1.
1 goal remaining.
>>> p.use(SplitHyp("h2"))
Decomposing h2: (y > -2) & (y < 2) into components y > -2, y < 2.
1 goal remaining.
>>> p.use(SplitGoal())
Split into conjunctions: x + y > -3, x + y < 3
2 goals remaining.
>>> p.use(Linarith())
Goal solved by linear arithmetic!
1 goal remaining.
>>> p.use(Linarith())
Goal solved by linear arithmetic!
Proof complete!
>>> print(p.proof())
example (x: real) (y: real) (h1: (x > -1) & (x < 1)) (h2: (y > -2) & (y < 2)): (x + y > -3) & (x + y < 3) := by
  split_hyp h1
  split_hyp h2
  split_goal
  . linarith
  linarith
```


### `Contrapose(hyp:str="this")`


## Linear arithmetic tactics

### `Linarith(verbose = False)`

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

## Simplification tactics

### `SimpAll()`