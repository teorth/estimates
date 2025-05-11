# Littlewood-Paley tools

Some support for the "Littlewood-Paley" manipulation of frequency order of magnitudes, which often occurs in the analysis of nonlinear dispersive and wave equations.

## `sqrt(x)`

Symtactic sugar for $x^{1/2}$, where $1/2$ should be viewed as a rational number.

## `bracket(x)`

Syntactic sugar for the "Japanese bracket" $\langle x \rangle := (1+|x|^2)^{1/2}$ which frequently occurs in this topic.

Note: for technical reasons, the order of magnitude does not handle well the case when $x$ can potentially vanish, because $0$ is not assigned an order of magnitude in our setup.  So some case splitting may be required in such cases.

## `LittlewoodPaley(*args:OrderOfMagnitude)`

Asserts that one of the orders of magnitude in the arguments is equal to the maximum of the others. This is necessary and sufficient for these magnitudes to be the magnitudes of vectors summing to zero.  Can be split using `Cases()`.