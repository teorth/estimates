# List of tactics

Tactics are methods to transform a given proof state into zero or more further proof states.  They will normally be called by the `use()` method of `ProofAssistant`.

The proof assistant is designed to be easily extensible by the addition of further tactics. Please feel free to suggest or contribute ideas for such tactics.

## Propositional logic tactics

### `Cases(hyp:str="this")`

Takes a hypothesis `hyp` that can be split into a disjunction of several statements, and splits into one subgoal for each disjunct, in which the hypothesis `hyp` is replaced by that disjunct.

Some examples of statements that can be split into disjuncts:

| Statement | Splits into disjuncts 
| --------- | ------ 
| `P \| Q \| R` | `P`, `Q`, `R` 
| `x <= Max(y,z)` | `x <= y`, `x <= z`
| `x < Max(y,z)` | `x < y`, `x < z`
| `Min(x,y) <= z` | `x <= z`, `y <= z`
| `Min(x,y) < z` | `x < z`, `y < z`


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
Splitting h1: P | Q into cases P, Q.
2 goals remaining.
```

### `Option(n:int)`

If the goal is a disjunction (using the same table as in the `Cases()` tactic), replace it with the `n`th disjunct in that goal.

Example:
```
>>> from main import *     
>>> p = min_max_exercise()
Starting proof.  Current proof state:
x: real
y: real
|- Min(x, y) <= Max(x, y)
>>> p.use(Option(1))
Replacing goal Min(x, y) <= Max(x, y) with option 1: Min(x, y) <= x.
1 goal remaining.
>>> p.use(Option(1))
Replacing goal Min(x, y) <= x with option 1: True.
1 goal remaining.
>>> p.use(SimpAll())
Goal solved!
Proof complete!
```

### `SplitGoal()`
### `SplitHyp(hyp:str="this", *names:str)`

`SplitGoal()` splits the goal into subgoals.  `SplitHyp(hyp,*names)` is similar but splits a hypothesis `hyp` (if it is a conjunction) into multiple new hypotheses (using the provided `names` if available, or using a default naming system otherwise.)

Some examples of statements that can be split into conjuncts:

| Statement | Splits into conjuncts 
| --------- | ------ 
| `P & Q & R` | `P`, `Q`, `R` 
| `Eq(x,Max(y,z))` | `x >= y`, `x >= z`, `Eq(x,y) \| Eq(x,z)` 
| `Eq(x,Min(y,z))` | `x <= y`, `x <= z`, `Eq(x,y) \| Eq(x,z)`
| `x <= Min(y,z)` | `x <= y`, `x <= z`
| `x < Min(y,z)` | `x < y`, `x < z`
| `Max(x,y) <= z` | `x <= z`, `y <= z`
| `Max(x,y) < z` | `x < z`, `y < z`

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

### `Claim(expr:Boolean, name:str = "this")`

Create a subgoal to prove `expr`, and then a further subgoal to establish the original goal with the additional hypothesis `name: expr`.  Similar to the "have" tactic in Lean.

Example:
```
>>> from main import *        
>>> p = ineq_exercise2()
Starting proof.  Current proof state:
x: real
y: pos_int
z: pos_int
h: x + y + z <= 3
h2: (x >= y) & (y >= z)
|- Eq(z, 1)
>>> x,z = p.get_vars("x", "z")
>>> p.use(Claim(x >= z))      
We claim that x >= z.
2 goals remaining.
>>> p.list_goals()
Goal 1 of 2:
x: real
y: pos_int
z: pos_int
h: x + y + z <= 3
h2: (x >= y) & (y >= z)
|- x >= z
Goal 2 of 2:
x: real
y: pos_int
z: pos_int
h: x + y + z <= 3
h2: (x >= y) & (y >= z)
this: x >= z
|- Eq(z, 1)
```

### `Contrapose(hyp:str="this")`

Contrapose the goal with hypothesis `hyp`, by replacing `hyp` with the negation of the goal, and the goal with the negation of `hyp`.  Of course, `hyp` needs to be a Boolean hypothesis for this to work.  If `hyp` does not exist, then this becomes a proof by contradiction, with the goal becoming `False`.

Example:
```
>>> from main import *              
>>> p = pigeonhole_exercise()
Starting proof.  Current proof state:
x: real
y: real
h: x + y > 5
|- (x > 2) | (y > 3)
>>> p.use(Contrapose("h"))                   
Contraposing h: x + y > 5 with (x > 2) | (y > 3).
1 goal remaining.
>>> print(p)
Proof Assistant is in tactic mode.  Current proof state:
x: real
y: real
h: (x <= 2) & (y <= 3)
|- x + y <= 5
>>> p.use(SplitHyp("h"))
Decomposing h: (x <= 2) & (y <= 3) into components x <= 2, y <= 3.
1 goal remaining.
>>> p.use(Linarith())
Goal solved by linear arithmetic!
Proof complete!
```

## `Trivial()`

Closes a goal if it follows immediately from the hypotheses.

Example:
```
>>> p = trivial_exercise()
Starting proof.  Current proof state:
x: real
h: x > 0
|- x >= 0
>>> p.use(Trivial())
Goal x >= 0 follows trivially from the hypotheses.
Proof complete!
```

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

### `LogLinarith(verbose = False)`

Similar to `Linarith()`, but now applies to order of magnitude inequalities rather than inequalities regarding real numbers; and uses multiplicative operations rather than additive ones.

Example:
```
>>> from main import *
>>> p = loglinarith_exercise()
Starting proof.  Current proof state:
N: pos_int
x: pos_real
y: pos_real
h1: x <= 2*N**2
h2: y < 3*N
|- Theta(x)*Theta(y) <= Theta(N)**4
>>> p.use(LogLinarith(verbose=True))
Checking feasibility of the following inequalities:
Theta(N)**1 >= Theta(1)
Theta(x)**1 * Theta(N)**-2 <= Theta(1)
Theta(y)**1 * Theta(N)**-1 <= Theta(1)
Theta(x)**1 * Theta(y)**1 * Theta(N)**-4 > Theta(1)
Infeasible by multiplying the following:
Theta(N)**1 >= Theta(1) raised to power 1
Theta(x)**1 * Theta(N)**-2 <= Theta(1) raised to power -1
Theta(y)**1 * Theta(N)**-1 <= Theta(1) raised to power -1
Theta(x)**1 * Theta(y)**1 * Theta(N)**-4 > Theta(1) raised to power 1
Proof complete!
```

Note that the hypothesis that `N` was a positive integer was incorporated as a hypothesis `Theta(N)**1 >= Theta(1)`.

## Substitution and definition tactics

### `Let(var:str, expr:Expr)`

Introduces a new variable `var` and sets it equal to `expr`.  Of course, `expr` needs to be defined in terms of existing variables.  An additional hypothesis `var_def: var = expr` is introduced.

### `Set(var:str, expr:Expr)`

Same as `Let(var, expr)`, except that all other appearances of `expr` in the hypotheses are changed to `var`.

Example:
```
>>> from main import *
>>> p = min_max_exercise()
Starting proof.  Current proof state:
x: real
y: real
|- Min(x, y) <= Max(x, y)
>>> x,y = p.get_vars("x","y")
>>> p.use(Set("a", Min(x,y)))
Setting a := Min(x, y).
1 goal remaining.
>>> p.use(Set("b", Min(x,y)))
Setting b := Max(x, y).
1 goal remaining.
>>> print(p)
Proof Assistant is in tactic mode.  Current proof state:
x: real
y: real
a: real
a_def: Eq(a, Min(x, y))
b: real
b_def: Eq(b, Max(x, y))
|- a <= b
```

### `IsPositive(name:str|Basic=this)`
### `IsNonnegative(name:str|Basic=this)`

Makes the variable `name` positive or nonnegative, if this can be inferred from the hypotheses.

Example:
```
>>> p = positive_exercise()
Starting proof.  Current proof state:
x: real
h: x > 0
|- x**2 > 0
>>> p.use(IsPositive("x")) 
x is now of type pos_real.
Goal solved!
Proof complete!
```

### `ApplyTheta(hyp:str="this", newhyp:str)`

Applies `Theta` to a hypothesis `hyp` to obtain its asymptotic version, which is then named `newhyp` (default is `hyp+"_theta"`).  This can be useful in manipulating the asymptotic form of an inequality.

Example:
```
>>> from main import *
>>> p = loglinarith_hard_exercise()
Starting proof.  Current proof state:
N: pos_int
x: pos_real
y: pos_real
h1: x <= 2*N**2 + 1
h2: y < 3*N + 4
|- Theta(x)*Theta(y) <= Theta(N)**3
>>> p.use(ApplyTheta("h1"))
Adding asymptotic version of h1: x <= 2*N**2 + 1 as h1_theta: Theta(x) <= Max(Theta(1), Theta(N)**2).
1 goal remaining.
>>> print(p)
Proof Assistant is in tactic mode.  Current proof state:
N: pos_int
x: pos_real
y: pos_real
h1: x <= 2*N**2 + 1
h2: y < 3*N + 4
h1_theta: Theta(x) <= Max(Theta(1), Theta(N)**2)
|- Theta(x)*Theta(y) <= Theta(N)**3
```

## Simplification tactics

### `SimpAll()`

Applies "obvious" simplifications to each hypothesis, using each of the other hypotheses in turn.  For instance, if the other hypothesis is of the form `P` and the current hypothesis is of the form `P|Q`, it gets simplified to `Q`.  Then, simplify the goal using all the other hypotheses.  If, in the course of doing so, a hypothesis turns into `false`, or the goal turns into `true`, complete the goal.

"Expensive" simplifications that require linear algebra or SAT solving are not implemented in this tactic. On the other hand, sympy's native simplifier `simplify` is invoked; as a consequence, sometimes this tactic will perform simplification even in the presence of an irrelevant hypothesis.

Some examples of supported simplifications:

| Statement | Hypothesis | Simplification
| --------- | ---------- | --------------
| `P` | `P` | `true`
| `P` | `Not(P)` | `false`
| `x >= y` | `x <= y` | `Eq(x,y)`
| `x >= y` | `Ne(x,y)` | `x > y`
| `Max(x,y)` | `x <= y` | `y`
| `Min(x,y)` | `x <= y` | `x`

The set of simplifications performed is currently far from complete.  If you discover that a situation where an "obvious" simplification should have occurred, but didn't, please inform me (e.g., via a github issue) to see if it can be added to the simplification routine.

**CAVEAT**:  This tactic uses `sympy`'s native simplifier, which does not fully guard against issues such as division by zero.  For instance, `x/x` will simplify to `1` even if `x` is not proven to be non-zero.  As such, the proofs using this simplifier may possibly have some edge cases that will require additional attention if this Proof Assistant-generated proof is to be converted to a fully verified proof.  

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
>>> p.use(SimpAll())
Simplified (P & R) | (P & S) | (Q & R) | (Q & S) to R | S using Q.
Simplified R | S to True using R | S.
Goal solved!
1 goal remaining.
>>> p.use(SimpAll())
Simplified (P & R) | (P & S) | (Q & R) | (Q & S) to R | S using P.
Simplified R | S to True using R | S.
Goal solved!
Proof complete!
```

## Lemmas

### `UseLemma(name:str, lemma:Lemma)`

Invokes a lemma and places it as a hypothesis under the name `name`.

One can use `p.use_lemma(lemma, name)` as a synonym for `p.use(UseLemma(name,lemma))`.  In that case, `name` will default to `this`.

For a list of lemmas, see [this page](lemmas.md).