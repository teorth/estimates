# Propositional logic tactics

## `Cases(hyp:str="this")`

Takes a hypothesis `hyp` that can be split into a disjunction of several statements, and splits into one subgoal for each disjunct, in which the hypothesis `hyp` is replaced by that disjunct.

Some examples of statements that can be split into disjuncts:

| Statement | Splits into disjuncts 
| --------- | ------ 
| `P \| Q \| R` | `P`, `Q`, `R` 
| `x <= Max(y,z)` | `x <= y`, `x <= z`
| `x < Max(y,z)` | `x < y`, `x < z`
| `Min(x,y) <= z` | `x <= z`, `y <= z`
| `Min(x,y) < z` | `x < z`, `y < z`
| `LittlewoodPaley(x,y,z)` | `x = Max(y,z)`, `y = Max(x,z)`, `z = Max(x,y)`


Example:
```
>>> from estimates.main import *
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

## `ByCases(statement:Boolean, name:str = "this")`

Similar to `Cases()`, but splits into cases based on whether `statement` is true or false.  In either case, the resulting assertion is named `name` (or the next available name, if this name is taken).

Example:
```
>>> from estimates.main import *
>>> p = bracket_submult_exercise()
Starting proof.  Current proof state:
x: real
y: real
|- Theta(x**2*y**2 + 1)**1/2 <= Theta(x**2 + 1)**1/2*Theta(y**2 + 1)**1/2
>>> p.use(ByCases(Eq(x,0)))
Splitting into cases this: Eq(x, 0) and this: Ne(x, 0).
2 goals remaining.
>>> print(p)
Proof Assistant is in tactic mode.  Current proof state:
x: real
y: real
this: Eq(x, 0)
|- Theta(x**2*y**2 + 1)**1/2 <= Theta(x**2 + 1)**1/2*Theta(y**2 + 1)**1/2
This is goal 1 of 2.
>>> p.next_goal()
Moved to goal 2 of 2.
>>> print(p)
Proof Assistant is in tactic mode.  Current proof state:
x: real
y: real
this: Ne(x, 0)
|- Theta(x**2*y**2 + 1)**1/2 <= Theta(x**2 + 1)**1/2*Theta(y**2 + 1)**1/2
This is goal 2 of 2.
```

## `Option(n:int)`

If the goal is a disjunction (using the same table as in the `Cases()` tactic), replace it with the `n`th disjunct in that goal.

Example:
```
>>> from estimates.main import *     
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

## `SplitGoal()`
## `SplitHyp(hyp:str="this", *names:str)`

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
>>> from estimates.main import *
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

## `Claim(expr:Boolean, name:str = "this")`

Create a subgoal to prove `expr`, and then a further subgoal to establish the original goal with the additional hypothesis `name: expr`.  Similar to the "have" tactic in Lean.  If either of the two subclaim goals follows trivially from their respective hypotheses, that subgoal will be removed.

Example:
```
>>> from estimates.main import *        
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

## `Contrapose(hyp:str="this")`

Contrapose the goal with hypothesis `hyp`, by replacing `hyp` with the negation of the goal, and the goal with the negation of `hyp`.  Of course, `hyp` needs to be a Boolean hypothesis for this to work.  If `hyp` does not exist, then this becomes a proof by contradiction, with the goal becoming `False`.

Example:
```
>>> from estimates.main import *              
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
