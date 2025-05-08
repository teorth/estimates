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