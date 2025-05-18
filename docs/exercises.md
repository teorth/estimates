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
>>> from estimates.main import *
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
>>> from estimates.main import *
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
>>> from estimates.main import *              
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
>>> from estimates.main import *              
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
>>> from estimates.main import *
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
>>> from estimates.main import *       
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
    p.begin_proof(0 < x)
    return p
```

**In an interactive Python environment**:
```
>>> from estimates.main import *  
>>> p = trivial_exercise()
Starting proof.  Current proof state:
x: real
h: x > 0
|- x > 0
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
>>> from estimates.main import *  
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
>>> from estimates.main import *  
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
>>> from estimates.main import *  
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
>>> from estimates.main import *  
>>> p = loglinarith_hard_exercise()
Starting proof.  Current proof state:
N: pos_int
x: pos_real
y: pos_real
h1: x <= 2*N**2 + 1
h2: y < 3*N + 4
|- Theta(x)*Theta(y) <= Theta(N)**3
```

**Hint**: `LogLinarith()` is powerful enough to resolve this directly. Alternatively, one can `ApplyTheta()` to the hypotheses, and `Claim()` some additional useful facts such as `lesssim(1, N**2)` that can be used by `SimpAll()`.

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
>>> from estimates.main import *  
>>> p = amgm_exercise()
Starting proof.  Current proof state:
x: nonneg_real
y: nonneg_real
|- 2*x*y <= x**2 + y**2
```

**Hint**: Apply the `Amgm()` lemma, as listed on the [lemmas page](lemmas.md).

## Bracket submultiplicativity example

**Informal version** If $x,y$ are reals, then $\langle x y \rangle \lesssim \langle x \rangle \langle y\rangle$, where $\langle x \rangle := (1+|x|^2)^{1/2}$ is the ``Japanese bracket''.

**Python code**:
```
def bracket_submult_exercise():
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y") 
    p.begin_proof(lesssim(bracket(x*y), bracket(x)*bracket(y)))
    return p
```

**In an interactive Python environment**:
```
>>> from estimates.main import *
>>> p = bracket_submult_exercise()
Starting proof.  Current proof state:
x: real
y: real
|- Theta(x**2*y**2 + 1)**1/2 <= Theta(x**2 + 1)**1/2*Theta(y**2 + 1)**1/2
```

**Hint**: Due to the fact that `x`, `y` could vanish, one cannot directly simplify the order of magnitudes here because we do not assign an order of magnitude to 0.  Hence, one must first split `ByCases()` depending on whether `x` or `y` vanish.  If they do, then `SimpAll()` will work (but generate some warnings due to `sympy`'s simplifier trying to use some non-positive substitutions). Otherwise, one can ensure that `x` `IsNonzero()`, and similarly for `y`, at which point `LogLinarith()`. will work.

## Littlewood-Paley example

**Informal version** If $N_1,N_2,N_3$ are orders of magnitude obeying the [Littlewood-Paley property](littlewood_paley.md), then $\min(N_1,N_2,N_3) \max(N_1,N_2,N_3)^2 \lesssim N_1 N_2 N_3$.

**Python code**:
```
def littlewood_paley_exercise():
    p = ProofAssistant()
    N_1, N_2, N_3 = p.vars("order", "N_1", "N_2", "N_3")
    p.assume(LittlewoodPaley(N_1,N_2,N_3), "h")
    p.begin_proof(OrderMin(N_1,N_2,N_3) * OrderMax(N_1,N_2,N_3)**2 <= N_1*N_2*N_3)
    return p
```

**In an interactive Python environment**:
```
>>> from estimates.main import *
>>> p = littlewood_paley_exercise()
Starting proof.  Current proof state:
N_1: order
N_2: order
N_3: order
h: LittlewoodPaley(N_1, N_2, N_3)
|- Max(N_1, N_2, N_3)**2*Min(N_1, N_2, N_3) <= N_1*N_2*N_3
```

**Hint**: Case split the Littlewood-Paley hypothesis then apply `LogLinarith()`.

## Complex Littlewood-Paley example

**Informal version** If $(N_1,N_2,N_3), (L_1,L_2,L_3)$ are triples of orders of magnitude obeying the [Littlewood-Paley property](littlewood_paley.md), with $\max(N_1,N_2,N_3) \asymp N \gtrsim 1$ and $\max(L_1,L_2,L_3) \gtrsim N_1 N_2 N_3$, then $\frac{\langle N_2 \rangle^{1/4}}{\langle N_1\rangle^{1/4}} N^{-1} (N_1 N_2 N_3)^{1/2} \lesssim 1$.

**Python code**:
```
def complex_littlewood_paley_exercise():
    p = ProofAssistant()
    N_1, N_2, N_3 = p.vars("order", "N_1", "N_2", "N_3")
    L_1, L_2, L_3 = p.vars("order", "L_1", "L_2", "L_3")
    N = p.var("order", "N")
    p.assume(LittlewoodPaley(N_1,N_2,N_3), "hN")
    p.assume(LittlewoodPaley(L_1,L_2,L_3), "hL")
    p.assume(gtrsim(N,1), "hN1")
    p.assume(asymp(OrderMax(N_1,N_2,N_3),N), "hmax")
    p.assume(OrderMax(L_1,L_2,L_3) >= N_1*N_2*N_3, "hlower")
    
    p.begin_proof(lesssim(sqrt(bracket(N_2)) / (bracket(N_1)**Fraction(1,4) * sqrt(L_1) * sqrt(L_2)) *sqrt(OrderMin(L_1,L_2,L_3)) *N**(-1) * sqrt(N_1*N_2*N_3), 1))
    return p
```

**In an interactive Python environment**:
```
Starting proof.  Current proof state:
N_1: order
N_2: order
N_3: order
L_1: order
L_2: order
L_3: order
N: order
hN: LittlewoodPaley(N_1, N_2, N_3)
hL: LittlewoodPaley(L_1, L_2, L_3)
hN1: N >= Theta(1)
hmax: Eq(Max(N_1, N_2, N_3), N)
hlower: Max(L_1, L_2, L_3) >= N_1*N_2*N_3
|- Max(Theta(1), N_2**2)**1/4*Max(Theta(1), N_1**2)**-1/8*L_1**-1/2*L_2**-1/2*Min(L_1, L_2, L_3)**1/2*N**-1*N_1**1/2*N_2**1/2*N_3**1/2 <= Theta(1)
```

**Hint**: Brute force case splitting and `LogLinarith()` will work, but requires about a minute of CPU.  More intelligent splitting will cut down the runtime.

## Substitution example

**Informal version** If $x,y,z,w$ are reals with $x=z^2$ and $y=w^2$, then $x-y = z^2-w^2$.

**Python code**:
```
def subst_example():
    p = ProofAssistant()
    x, y, z, w = p.vars("real", "x", "y", "z", "w")
    p.assume(Eq(x,z**2), "hx")
    p.assume(Eq(y,w**2), "hy")
    p.begin_proof(Eq(x-y,z**2-w**2))
    return p
```

**In an interactive Python environment**:
```
>>> from estimates.main import *
>>> p = subst_example()
Starting proof.  Current proof state:
x: real
y: real
z: real
w: real
hx: Eq(x, z**2)
hy: Eq(y, w**2)
|- Eq(x - y, -w**2 + z**2)
```

**Hint**: One can `Subst()` the hypotheses `hx`, `hy` into the goal, either in forward or in reverse.

## Substitution example II

**Informal version** If $x,y,z \leq N$ and $N=10$, then $x+y+z \leq N^2$.

**Python code**:
```
def subst_all_example():
    p = ProofAssistant()
    N = p.var("pos_int", "N")
    x, y, z = p.vars("real", "x", "y", "z")
    p.assume(x <= N, "hx")
    p.assume(y <= N, "hy")
    p.assume(z <= N, "hz")
    p.assume(Eq(N,10), "hN")
    p.begin_proof(x+y+z <= N**2)
    return p
```

**In an interactive Python environment**:
```
>>> from estimates.main import *     
>>> p = subst_all_example()
Starting proof.  Current proof state:
N: pos_int
x: real
y: real
z: real
hx: x <= N
hy: y <= N
hz: z <= N
hN: Eq(N, 10)
|- x + y + z <= N**2
```

**Hint**: A single `SubstAll()` will make this problem fall to `Linarith()`.

## Substitution example III

**Informal version** If $x,y,z \leq N$ and $10=N$, then $x+y+z \leq N^2$.

**Python code**:
```
def subst_all_example_reversed():
    p = ProofAssistant()
    N = p.var("pos_int", "N")
    x, y, z = p.vars("real", "x", "y", "z")
    p.assume(x <= N, "hx")
    p.assume(y <= N, "hy")
    p.assume(z <= N, "hz")
    p.assume(Eq(10,N), "hN")
    p.begin_proof(x+y+z <= N**2)
    return p
```

**In an interactive Python environment**:
```
>>> from estimates.main import *     
>>> p = subst_all_example_reversed()
Starting proof.  Current proof state:
N: pos_int
x: real
y: real
z: real
hx: x <= N
hy: y <= N
hz: z <= N
hN: Eq(10, N)
|- x + y + z <= N**2
```

**Hint**: One needs to set `reversed` to true.

## Sympy simplification example

**Informal version** If $x,y \in \R$, then $(x-y)(x+y) = x^2-y^2$.

**Python code**:
```
def sympy_simplify_example() -> ProofAssistant:
    p = ProofAssistant()
    x, y = p.vars("real", "x", "y")
    p.begin_proof(Eq((x-y)*(x+y), x**2 - y**2))
    return p
```

**In an interactive Python environment**:
```
>>> from estimates.main import *
>>> p = sympy_simplify_exercise()
Starting proof.  Current proof state:
x: real
y: real
|- Eq((x - y)*(x + y), x**2 - y**2)
```

**Hint**: Use `SimpAll()` with the `use_sympy` flag set to `True`.
