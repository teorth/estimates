# Interactive proof assistant

This project aims to develop (in Python) a lightweight proof assistant that is substantially less powerful than full proof assistants such as Lean, Isabelle or Coq, but which (hopefully) is easy to use to prove short, tedious tasks, such as verifying that one inequality or estimate follows from others.

## Getting started

To start the assistant in an interactive Python session:

- Install Python and the following packages (unless they are already pre-installed):
    - `sympy`, for intsance via `pip install sympy`
    - `z3-solver`, for instance via `pip install z3-solver` 
- Download all the Python files in this directory.
- In this directory, start Python from the command line to start an interactive Python session, and type `from main import *`
- To launch a new proof assistant, type `p = ProofAssistant()`.
- Alternatively, to try one of the exercises, such as `linarith_exercise()`, type `p = linarith_exercise()`.  A list of exercises can be found here.

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

In order to obtain the goal from the hypotheses, one usually uses a sequence of **tactics**, which can transform a given proof state to zero or more further proof states.  This can decrease, increase, or hold steady the number of outstanding goals.  The "game" is then to keep using tactics until the number of outstanding goals drops to zero, at which point the proof is complete.  A full list of tactics can be [found here](tactics.md).

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
1*z > 0 multiplied by 1/4
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
