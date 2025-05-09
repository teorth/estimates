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

**Hint** Use the tactics `Contrapose()`, `SplitHyp()`, and `Linarith()`.

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

**Hint** Either `SimpAll()` or `Linarith()` will work here.

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