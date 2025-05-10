# List of exercises and examples

## Simple linear arithmetic exercise

**Informal version**: If $x,y,z$ are positive reals with $x < 2y$ and $y < 3z+1$, prove that $x < 7z+2$.

**Python code**:
```
def linarith_exercise():
    p = ProofAssistant()
    x, y, z = p.vars("pos_real", "x", "y", "z")
    p.assume(x < 2*y, "h1")
    p.assume(y < 3*z+1, "h2")
    p.begin_proof(x < 7*z+2)
    return p
```

**In an interactive Python environment**:
```
>>> from main import *
>>> p = linarith_exercise()
Starting proof.  Current proof state:
x: pos_real
y: pos_real
z: pos_real
h1: x < 2*y
h2: y < 3*z+1
|- x < 7*z+2
```

**Hint**: use the `Linarith()` tactic.

## Unsolvable linear arithmetic example

**Informal version**: If $x,y,z$ are positive reals with $x < 2y$ and $y < 3z+1$, prove that $x < 7z$.

**Python code**:
```
def linarith_failure_example():
    p = ProofAssistant()
    x, y, z = p.vars("pos_real", "x", "y", "z")
    p.assume(x < 2*y, "h1")
    p.assume(y < 3*z+1, "h2")
    p.begin_proof(x < 7*z)
    return p
```

**In an interactive Python environment**:
```
>>> from main import *
>>> p = linarith_failure_example()
Starting proof.  Current proof state:
x: pos_real
y: pos_real
z: pos_real
h1: x < 2*y
h2: y < 3*z+1
|- x < 7*z
```

## Case splitting exercise

**Informal version** If either $P$ or $Q$ holds, and either $R$ or $S$ holds, show that one of "$P$ and $R$", "$P$ and $S$", "$Q$ and $R$", or "$Q$ and $S$" holds.

**Python code**:
```
def case_split_exercise():
    p = ProofAssistant()
    P, Q, R, S = p.vars("bool", "P", "Q", "R", "S")
    p.assume(P|Q, "h1")
    p.assume(R|S, "h2")
    p.begin_proof((P&R) | (P&S) | (Q&R) | (Q&S))
    return p
```

**In an interactive Python environment**:
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

**Hint**: use the `Cases()` and `SimpAll()` tactics.

## Pigeonhole principle exercise

**Informal version** If $x,y$ are real numbers with $x+y > 5$, show that either $x>2$ or $y>3$.

**Python code**:
```
def pigeonhole_exercise():
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.assume(x + y > 5, "h")
    p.begin_proof((x > 2) | (y > 3))
    return p
```

**In an interactive Python environment**:
```
>>> from main import *              
>>> p = pigeonhole_exercise()
Starting proof.  Current proof state:
x: real
y: real
h: x + y > 5
|- (x > 2) | (y > 3)
```

**Hint**: Use the tactics `Contrapose()`, `SplitHyp()`, and `Linarith()`.

## Inequality exercise

**Informal version** If $x,y$ are real numbers with $x \leq y$ and $y \leq x$, then $x=y$.

**Python code**:
```
def ineq_exercise():
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.assume(x <= y, "h1")
    p.assume(x >= y, "h2")
    p.begin_proof(Eq(x,y))
    return p
```

**In an interactive Python environment**:
```
>>> from main import *              
>>> p = ineq_exercise()
Starting proof.  Current proof state:
x: real
y: real
h1: x <= y
h2: x >= y
|- Eq(x, y)
```

**Hint**: Either `SimpAll()` or `Linarith()` will work here.

## Inequality exercise 2

**Informal version** If $x$ is real and $y,z$ are positive integers with $x \geq y \geq z$ and $x+y+z \leq 3$, then $z=1$.

**Python code**:
```
def ineq_exercise2():
    p = ProofAssistant()
    x = p.var("real", "x")
    y,z = p.vars("pos_int", "y", "z")
    p.assume(x+y+z <= 3, "h")
    p.assume((x>=y) & (y>=z), "h2")
    p.begin_proof(Eq(z,1))
    return p
```

**In an interactive Python environment**:
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
```

## Min-max example

**Informal version** If $x$, $y$ are real, then $\min(x,y) \leq \max(x,y)$.

**Python code**:
```
def min_max_exercise():
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.begin_proof(Min(x,y) <= Max(x,y))
    return p
```

**In an interactive Python environment**:
```
>>> from main import *       
>>> p = min_max_exercise()
Starting proof.  Current proof state:
x: real
y: real
|- Min(x, y) <= Max(x, y)
```

**Hint**: `Set()` $\min(x,y)$ and $\max(x,y)$ to new variables.  (You will first need to `get_var()` these variables to do this.)

## Trivial example

**Informal version** If $x$ is real and $x > 0$, then $x \geq 0$.

**Python code**:
```
def trivial_exercise():
    p = ProofAssistant()
    x = p.var("real", "x")
    p.assume(x>0, "h")
    p.begin_proof(x >= 0)
    return p
```

**In an interactive Python environment**:
```
>>> from main import *  
>>> p = trivial_exercise()
Starting proof.  Current proof state:
x: real
h: x > 0
|- x >= 0
```

**Hint**: This is `Trivial()`.

## Positive example

**Informal version** If $x$ is real and $x>0$, then $x^2>0$.

**Python code**:
```
def positive_exercise():
    p = ProofAssistant()
    x = p.var("real", "x")
    p.assume(x>0, "h")
    p.begin_proof(x**2 > 0)
    return p
```

**In an interactive Python environment**:
```
>>> from main import *  
>>> p = positive_exercise()
Starting proof.  Current proof state:
x: real
h: x > 0
|- x**2 > 0
```

**Hint**: Ensure that $x$ `IsPositive()`.

## Nonnegative example

**Informal version** If $x$ is real and $x \geq 0$, then $x^3 \geq 0$.

**Python code**:
```
def nonnegative_exercise():
    p = ProofAssistant()
    x = p.var("real", "x")
    p.assume(x>=0, "h")
    p.begin_proof(x**3 >= 0)
    return p
```

**In an interactive Python environment**:
```
>>> from main import *  
>>> p = nonnegative_exercise()
Starting proof.  Current proof state:
x: real
h: x >= 0
|- x**3 >= 0
```

**Hint**: Ensure that $x$ `IsNonnegative()`.

## Log linear arithmetic example (easy)

**Informal version** If $N$ is a positive integer and $x,y$ are positive reals with $x \leq 2N^2$ and $y < 3N$, then $xy \lesssim N^4$.

**Python code**:
```
def loglinarith_exercise():
    p = ProofAssistant()
    N = p.var("pos_int", "N")
    x, y = p.vars("pos_real", "x", "y")
    p.assume(x <= 2*N**2, "h1")
    p.assume(y < 3*N, "h2")
    p.begin_proof(lesssim(x*y, N**4))
    return p
```

**In an interactive Python environment**:
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
```
**Hint**: Can be directly handled by `LogLinarith()`.

## Log linear arithmetic example (hard)

**Informal version** If $N$ is a positive integer and $x,y$ are positive reals with $x \leq 2N^2+1$ and $y < 3N+4$, then $xy \lesssim N^3$.

**Python code**:
```
def loglinarith_hard_exercise():
    p = ProofAssistant()
    N = p.var("pos_int", "N")
    x, y = p.vars("pos_real", "x", "y")
    p.assume(x <= 2*N**2+1, "h1")
    p.assume(y < 3*N+4, "h2")
    p.begin_proof(lesssim(x*y, N**3))
    return p
```

**In an interactive Python environment**:
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
```

**Hint**: `LogLinarith()` is not powerful enough to resolve this directly due to the `Max` operations implicitly arising from addition.  One may need to first `ApplyTheta()` to the hypotheses, and `Claim()` some additional useful facts such as `lesssim(1, N**2)` that can be used by `SimpAll()`.

## Arithmetic mean-geometric mean inequality example

**Informal version** If $x,y$ are non-negative reals, then $2xy \leq x^2+y^2$.

**Python code**:
```
def amgm_exercise():
    p = ProofAssistant()
    x, y = p.vars("nonneg_real", "x", "y")
    p.begin_proof(2*x*y <= x**2 + y**2)
    return p
```

**In an interactive Python environment**:
```
>>> from main import *  
>>> p = amgm_exercise()
Starting proof.  Current proof state:
x: nonneg_real
y: nonneg_real
|- 2*x*y <= x**2 + y**2
```

**Hint**: Apply the `Amgm()` lemma, as listed on the [lemmas page](lemmas.md).