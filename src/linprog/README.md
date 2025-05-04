# Exact linear programming 

The file [linprog.py](linprog.py) is a exact linear programming wrapper that utilizes the Z3 linear programming package.  It introduces a class `Inequality` that describes formal linear inequalities between variables, constructed by `Inequality(coeffs, sense, rhs)`, where `coeffs` is a dictionary of pairs `variable : coefficient` with the coefficient `coefficient` a rational number (using the `Fraction` python package) and `variable` an arbitrary object, `sense` is one of `"lt"`, `"leq"`, `"eq"`, `"gt"`, `"geq"`, and `rhs` is another rational number.  Given a set `inequalities` of `Inequality` objects, the `feasibility(inequalities)` routine will determine whether this set of inequalities is feasible, providing a proof certificate in both the feasible and infeasible cases.  Specifically:

- If the inequalities are feasible, it will provide as part of its output an assignment of a rational number to each variable that satisfies all the inequalities.
- If the inequalities are infeasible, it will provide as part of its output specific rational numbers that one can multiply each inequality with, such that they sum to an inconsistent inequality such as $0 < 0$ or $1 \leq 0$.

The `verbose_feasibility(inequalities)` method is similar, but outputs these certificates as console text rather than as a data type.

Unlike floating-point linear arithmetic packages, the tool here is exact and can handle both strict and non-strict inequalities with no possibility of roundoff error.  (But in order to do this, the coefficients are required to be rational numbers.  In principle one can use symbolic math packages to handle other types of numbers with computable ordering, but that is a future project.)

## Examples:

```
>>> inequalities = set()
>>> inequalities.add(Inequality({'x': 1}, 'leq', 3))         # x <= 3
>>> inequalities.add(Inequality({'y': 1}, 'leq', 2))         # y <= 2
>>> inequalities.add(Inequality({'x': 1, 'y': 1}, 'geq', 5)) # x+y >= 5
>>> verbose_feasibility(inequalities)    

Checking feasibility of the following inequalities:
1*x <= 3
1*y <= 2
1*x + 1*y >= 5
Feasible with the following values:
y = 2
x = 3

>>> inequalities.add(Inequality({'x': 1, 'y': 1}, 'gt', 5))  # x+y > 5
>>> verbose_feasibility(inequalities)    

Checking feasibility of the following inequalities:
1*x <= 3
1*y <= 2
1*x + 1*y > 5
1*x + 1*y >= 5
Infeasible by summing the following:
1*x <= 3 multiplied by -1
1*y <= 2 multiplied by -1
1*x + 1*y > 5 multiplied by 1
```

