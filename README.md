# A mathematical proof assistant 

This project aims to develop (in Python) a lightweight proof assistant that is substantially less powerful than full proof assistants such as Lean, Isabelle or Coq, but which (hopefully) is easy to use to prove short, tedious tasks, such as verifying that one inequality or estimate follows from others.

## Documentation links

- [List of tactics](docs/tactics.md)
- [List of exercises and examples](docs/exercises.md)
- [List of navigation tools](docs/navigation.md)

## Other links

- [Blog post explaining the project](https://terrytao.wordpress.com/2025/05/01/a-proof-of-concept-tool-to-verify-estimates/) - Terence Tao, May 1 2025
    - A [companion post](https://terrytao.wordpress.com/2025/05/04/orders-of-infinity/) on the algebraic structure of orders of infinity - Terence Tao - May 4 2025
- [Version 0.0: A proof-of-concept prototype](src/ver_0_0/README.md)
- [Version 1.0: A rudimentary proof assistant](src/ver_1_0/README.md)
    -  As a byproduct of this version, an [exact linear programming proof certificate tool](src/ver_1_0/linprog/README.md) was written.

## Getting started

To start the assistant in an interactive Python session:

- Install Python and the following packages (unless they are already pre-installed):
    - `sympy`, for intsance via `pip install sympy`
    - `z3-solver`, for instance via `pip install z3-solver` 
- Download all the Python files in this directory.
- In this directory, start Python from the command line to start an interactive Python session, and type `from main import *`
- To launch a new proof assistant, type `p = ProofAssistant()`.
- Alternatively, to try one of the exercises, such as `linarith_exercise()`, type `p = linarith_exercise()`.  A list of exercises can be found [here](docs/exercises.md).

## How the assistant works

The assistant can be in one of two modes: **Assumption mode** and **Tactic mode**.  We will get to assumption mode later, but let us first discuss tactic mode, which is the mode one ends up in when one tries any of the exercises.  The format of this mode is deliberately designed to resemble the tactic mode in modern proof assistant languages such as Lean, Isabelle or Coq.

Let's start for instance with `linarith_exercise()`.  Informally, this exercise asks to establish the following claim:

**Informal version**: If $x,y,z$ are positive reals with $x < 2y$ and $y < 3z+1$, prove that $x < 7z+2$.

If one follows the above quick start instructions, one should now see the following:
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
```
We are now in **Tactic mode**, in which we try to establish a desired goal (the assertion after the |- symbol, which in this case is $x < 7z+2$) from the given hypotheses `x`, `y`, `z`, `h1`, `h2`.  Hypotheses come in two types:
* **Variable declarations**, such as `x: pos_real`, which asserts that we have a variable `x` that is a positive real number.
* **Predicates**, such as `h1: x < 2*y`, which have a name (in this case, `h1`), and a boolean-valued assertion involving the variables, in this case $x < 2y$.

The goal is also a predicate.  The list of hypotheses together with a goal is collectively referred to as a **proof state**.

In order to obtain the goal from the hypotheses, one usually uses a sequence of **tactics**, which can transform a given proof state to zero or more further proof states.  This can decrease, increase, or hold steady the number of outstanding goals.  The "game" is then to keep using tactics until the number of outstanding goals drops to zero, at which point the proof is complete.  A full list of tactics can be [found here](docs/tactics.md).

In this particular case, there is a "linear arithmetic" tactic `Linarith()` (inspired by the [Lean tactic `linarith`](https://leanprover-community.github.io/mathlib4_docs/Mathlib/Tactic/Linarith/Frontend.html)) that is specifically designed for the task of obtaining a goal as a linear combination of the hypotheses, and it "one-shots" this particular exercise:

```
>>> p.use(Linarith())
Goal solved by linear arithmetic!
Proof complete!
```

This may seem suspiciously easy, but one can ask `Linarith` to give a more detailed explanation:
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
1*z > 0 multiplied by 1/4p0---899999999999999999
1*x + -7*z >= 2 multiplied by 1/4
1*y + -3*z < 1 multiplied by -1/2
1*x + -2*y < 0 multiplied by -1/4
Goal solved by linear arithmetic!
Proof complete!
```
This gives more details as to what `Linarith` actually did:
* First, it argued by contradiction, by taking the negation $x \geq 7z+2$ of the goal $x < 7z+2$ and added it to the hypotheses.
* Then, it converted all the inequalities that were explicit or implicit in the hypotheses into a "linear programming" form in which the variables are on the left-hand side, and constants on the right-hand side.  For instance, the assertion that `x` was a positive real became $1*x>0$, and the assertion $y < 3z$ became $1*y + -3*z < 1$.
* Finally, it sought a linear combination of these inequalities that would lead to an absurd inequality, in this case $0 < 1$.

One can also inspect the final proof after solving the problem by using the `proof()` method, although in this case the proof is extremely simple:
```
>>> print(p.proof())
example (x: pos_real) (y: pos_real) (z: pos_real) (h1: x < 2*y) (h2: y < 3*z + 1): x < 7*z + 2 := by
  linarith
```

Here, the original hypotheses and goal are listed in a pseudo-Lean style, followed by the actual proof, which in this case is just one line.

One could ask what happens if `Linarith` fails to resolve the goal.  With the verbose flag, it will give a specific counterexample consistent with all the inequalities it could find:
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
Here, the task given was an impossible one: to deduce $x < 7z$ from the hypotheses that $x,y,z$ are positive reals with $x < 2y$ and $y < 3z+1$.  A specific counterexample $x=7/2$, $y=2$, $z=1/2$ was given to this problem.  (In this case, this means that the original problem was impossible to solve; but in general one cannot draw such a conclusion, because it may have been possible to establish the goal by using some non-inequality hypotheses).

Now let us consider a slightly more complicated proof, in which some branching of cases is required.  
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
```
Here, we have four atomic propositions (boolean variables) `P`, `Q`, `R`, `S`, with the hypothesis `h1` that either `P` or `Q` is true, as well as the hypothesis `h2` that either `R` or `S` is true.  The objective is then to prove that one of the four statements `P & R` (i.e., `P` and `R` are both true), `P & S`, `Q & R`, and `Q & S` is true.

Here we can split the hypothesis `h1 : P | Q` into two cases:
```
>>> p.use(Cases("h1"))
Splitting h1: P | Q into cases.
2 goals remaining.
```
Let's now look at the current proof state:
```
>>> print(p)
Proof Assistant is in tactic mode.  Current proof state:
P: bool
Q: bool
R: bool
S: bool
h1: P
h2: R | S
|- (P & R) | (P & S) | (Q & R) | (Q & S)
This is goal 1 of 2.
```
Note how the hypothesis `h1` has changed from `P | Q` to just `P`.  But this is just one of the two goals.  We can see this by looking at the current state of the proof:
```
>>> print(p.proof())
example (P: bool) (Q: bool) (R: bool) (S: bool) (h1: P | Q) (h2: R | S): (P & R) | (P & S) | (Q & R) | (Q & S) := by
  cases h1
  . **sorry**
  sorry 
```
The proof has now branched into a tree with two leaf nodes (marked ``sorry''), representing the two unresolved goals.  We are currently located at the first goal (as indicated by the asterisks).  We can move to the next goal:
```
>>> p.next_goal()
Moved to goal 2 of 2.
>>> print(p.proof())
example (P: bool) (Q: bool) (R: bool) (S: bool) (h1: P | Q) (h2: R | S): (P & R) | (P & S) | (Q & R) | (Q & S) := by
  cases h1
  . sorry
  **sorry**
>>> print(p)
Proof Assistant is in tactic mode.  Current proof state:
P: bool
Q: bool
R: bool
S: bool
h1: Q
h2: R | S
|- (P & R) | (P & S) | (Q & R) | (Q & S)
This is goal 2 of 2.
```
So we see that in this second branch of the proof tree, `h1` is now set to `Q`.  For further ways to navigate the proof tree, [see this page](docs/navigation.md).

Now that we know that `Q` is true, we would like to use this to simplify our goal, for instance simplifying `Q & R` to `Q`.  This can be done using the `SimpAll()` tactic:
```
>>> p.use(SimpAll())
Simplified (P & R) | (P & S) | (Q & R) | (Q & S) to R | S using Q.
Simplified R | S to True using R | S.
Goal solved!
1 goal remaining.
```
Here, the hypothesis `Q` was used to simplify the goal (using `sympy`'s powerful simplification tools), all the way down to `R | S`.  But this is precisely hypothesis `h2`, so on using that hypothesis as well, the conclusion was simplified to `True`, which of course closes off this goal.  This then lands us automatically in the first goal, which can be solved by the same method:
```
>>> p.use(SimpAll())
Simplified (P & R) | (P & S) | (Q & R) | (Q & S) to R | S using P.
Simplified R | S to True using R | S.
Goal solved!
Proof complete!
```
And here is the final proof:
```
>>> print(p.proof())
example (P: bool) (Q: bool) (R: bool) (S: bool) (h1: P | Q) (h2: R | S): (P & R) | (P & S) | (Q & R) | (Q & S) := by
  cases h1
  . simp_all
  simp_all
```
One can combine propositional tactics with linear arithmetic tactics.  Here is one example (using some propositional tactics we have not yet discussed, but whose purpose should be clear, and which one can look up [in this page](docs/tactics.md)):
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
