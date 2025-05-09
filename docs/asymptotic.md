# Asymptotic analysis in the proof assistant

One of the original motivations for this proof assistant was to create an environment in which one can manipulate asymptotic estimates such as the following:

- $X \lesssim Y$ (also written $X = O(Y)$), which asserts that $|X| \leq CY$ for some absolute constant $C$.
- $X \ll Y$ (also written $X = o(Y)$), which asserts that for every constant $\varepsilon >0$, one has $|X| \leq \varepsilon Y$ if a suitable asymptotic parameter is large enough.
- $X \asymp Y$ (also written $X = \Theta(Y)$), which asserts that $X \lesssim Y \lesssim X$.

This is implemented within `sympy` as follows.  One first defines a new type of sympy expression, which I call `OrderOfMagnitude`, and corresponds to the space ${\mathcal O}$ discussed in [this blog post](https://terrytao.wordpress.com/2025/05/04/orders-of-infinity/).  These expressions are not numbers, but still support several algebraic operations, such as addition, multiplication, raising to numerical real exponents, and order comparison.  There is then an operation `Theta` that maps positive real `sympy` expressions to `OrderOfMagnitude` expressions, which then allows one to interpret the above asymptotic statements:

- $X \lesssim Y$ is formalized as `lesssim(X,Y)`, which is syntactic sugar for `Theta(Abs(X)) <= Theta(Y)`.
- $X \ll Y$ is formalized as `ll(X,Y)`, which is syntactic sugar for `Theta(Abs(X)) < Theta(Y)`.
- $X \asymp Y$ is formalized as `asymp(X,Y)`, which is syntactic sugar for `Eq(Theta(X), Theta(Y))`.

Various laws of asymptotic arithmetic have been encoded within the syntax of `sympy`, for instance `Theta(C)` simplifies to `Theta(1)` for any numerical constant `C`, `Theta(X+Y)` simplifies to `Max(Theta(X),Theta(Y))`, and so forth.

(A technical note: to avoid some unwanted applications of `sympy`'s native simplifier (in particular, those applications that involve subtraction, which we leave purely formal for orders of magnitude), and to force certain type inferences to work, `OrderOfMagnitude` overrides the usual `Add`, `Mul`, `Pow`, `Max`, and `Min` operations with custom alternatives `OrderAdd`, `OrderMul`, `OrderPow`, `OrderMax`, `OrderMin`.)

Here is a simple example of the proof assistant establishing an asymptotic estimate. Informally, one is given a positive integer $N$ and positive reals $x,y$ such that $x \leq 2N^2$ and $y < 3N$, and the task is to conclude that $xy \lesssim N^4$.

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
