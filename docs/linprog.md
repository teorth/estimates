# Exact linear programming

The file [linprog.py](../src/estimates/linprog.py) is an exact linear programming wrapper that utilizes the Z3 linear programming package.  It introduces a class `Inequality` that describes formal linear inequalities between variables, constructed by `Inequality(coeffs, sense, rhs)`, where `coeffs` is a dictionary of pairs `variable : coefficient` with the coefficient `coefficient` a rational number (using the `Fraction` python package) and `variable` an arbitrary object, `sense` is one of `"lt"`, `"leq"`, `"eq"`, `"gt"`, `"geq"`, and `rhs` is another rational number.  Given a set `inequalities` of `Inequality` objects, the `feasibility(inequalities)` routine will determine whether this set of inequalities is feasible, providing a proof certificate in both the feasible and infeasible cases.  Specifically:

- If the inequalities are feasible, it returns `(True, assignment)`, where `assignment` maps each variable to a rational value satisfying all the inequalities.
- If the inequalities are infeasible, it returns `(False, multipliers)`, where `multipliers` maps each inequality to a rational coefficient such that a non-negative linear combination yields an inconsistent relation (e.g. `0 < 0` or `1 ≤ 0`).

Unlike floating-point linear arithmetic packages, the tool here is exact and can handle both strict and non-strict inequalities with no possibility of roundoff error.  (But in order to do this, the coefficients are required to be rational numbers.  In principle one can use symbolic math packages to handle other types of numbers with computable ordering, but that is a future project.)

## Examples:

```
>>> from fractions import Fraction
>>> from estimates.linprog import Inequality, feasibility
>>> inequalities = []
>>> inequalities.append(Inequality({'x': Fraction(1)}, 'leq', Fraction(3)))         # x <= 3
>>> inequalities.append(Inequality({'y': Fraction(1)}, 'leq', Fraction(2)))         # y <= 2
>>> inequalities.append(Inequality({'x': Fraction(1), 'y': Fraction(1)}, 'geq', Fraction(5))) # x+y >= 5
>>> feasibility(inequalities)
(True, {'y': 2, 'x': 3})

>>> inequalities.append(Inequality({'x': Fraction(1), 'y': Fraction(1)}, 'gt', Fraction(5)))  # x+y > 5
>>> feasible, certificate = feasibility(inequalities)
>>> feasible
False
```
