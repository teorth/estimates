# Substitution and definition tactics

## `Let(var:str, expr:Expr)`

Introduces a new variable `var` and sets it equal to `expr`.  Of course, `expr` needs to be defined in terms of existing variables.  An additional hypothesis `var_def: var = expr` is introduced.

## `Set(var:str, expr:Expr)`

Same as `Let(var, expr)`, except that all other appearances of `expr` in the hypotheses are changed to `var`.

Example:
```
>>> from estimates.main import *
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

## `IsPositive(name:str|Basic=this)`
## `IsNonnegative(name:str|Basic=this)`
## `IsNonzero(name:str|Basic=this)`

Makes the variable `name` positive, nonnegative, or non-zero, if this can be inferred from the hypotheses.

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

## `ApplyTheta(hyp:str="this", newhyp:str)`

Applies `Theta` to a hypothesis `hyp` to obtain its asymptotic version, which is then named `newhyp` (default is `hyp+"_theta"`).  This can be useful in manipulating the asymptotic form of an inequality.

Example:
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

## `Subst(hyp:str, target:str=None, reversed:bool=False)`
## `SubstAll(hyp:str, reversed:bool=False)`

If `hyp` is an equality, substitutes the left hand side for the right-hand side in `target` (which, by default, is the current goal).  If the `reversed` flag is set to `True`, substitute the right-hand side for the left-hand side instead.

`SubstAll()` is similar to `Subst()` but the substitution is applied both to the goal and to all other hypotheses (other than variable declarations).

Example:
```
>>> p = subst_example()
Starting proof.  Current proof state:
x: real
y: real
z: real
w: real
hx: Eq(x, z**2)
hy: Eq(y, w**2)
|- Eq(x - y, -w**2 + z**2)
>>> p.use(Subst("hx"))
Substituted hx to replace Eq(x - y, -w**2 + z**2) with Eq(-y + z**2, -w**2 + z**2).
1 goal remaining.
>>> p.use(Subst("hy",reversed=true))
Substituted hy in reverse to replace Eq(-y + z**2, -w**2 + z**2) with True.
Goal proved!
Proof complete!
```
Example:
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
>>> p.use(SubstAll("hN"))
Substituted hN to replace x <= N with x <= 10.
Substituted hN to replace y <= N with y <= 10.
Substituted hN to replace z <= N with z <= 10.
Substituted hN to replace x + y + z <= N**2 with x + y + z <= 100.
1 goal remaining.
>>> p.use(Linarith())
Goal solved by linear arithmetic!
Proof complete!
```
Example:
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
>>> p.use(SubstAll("hN",reversed=True))
Substituted hN in reverse to replace x <= N with x <= 10.
Substituted hN in reverse to replace y <= N with y <= 10.
Substituted hN in reverse to replace z <= N with z <= 10.
Substituted hN in reverse to replace x + y + z <= N**2 with x + y + z <= 100.
1 goal remaining.
```

