from estimates import *

# verify that min(a,b) <= max(a,b)
def example1():
    a = Variable("a")
    b = Variable("b")
    assumptions = Assumptions()
    assumptions.can_bound(min(a, b), max(a, b))

# verify that (abc)^(1/3) <= max(a,b,c)
def example2():
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    assumptions = Assumptions()
    assumptions.can_bound((a * b * c) ** (1 / 3), max(a, b, c))

# verify that if a <= b <= c <= d, then a*c <= b*d
def example3():
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    d = Variable("d")
    assumptions = Assumptions()
    assumptions.add(a <= b)
    assumptions.add(b <= c)
    assumptions.add(c <= d)
    assumptions.can_bound(a * c, b * d)
    
# fail to verify that a <= b <= c <= d, then a*d <= b*c
def example4():
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    d = Variable("d")
    assumptions = Assumptions()
    assumptions.add(a <= b)
    assumptions.add(b <= c)
    assumptions.add(c <= d)
    assumptions.can_bound(a * d, b * c)

# verify that if (a,b,c) is Littlewood-Paley, then max(a,b,c)^2 * min(a,b,c) <= a*b*c
def example5():
    a = Variable("a")
    b = Variable("b")
    c = Variable("c")
    assumptions = Assumptions()
    assumptions.add_lp(a,b,c)
    assumptions.can_bound(max(a, b, c)**2 * min(a,b,c), a * b * c)

# verify that a <~ max(1,a)^2
def example6():
    a = Variable("a")
    assumptions = Assumptions()
    assumptions.can_bound(a, max(1,a)**2)

# verify a*b <= a*b with a pointless split at a=b
def example7():
    a = Variable("a")
    b = Variable("b")
    assumptions = Assumptions()
    assumptions.split_at(a,b)
    assumptions.can_bound(a*b, a*b)


# example1()
# example2()
# example3()
# example4()
# example5()
example6()
# example7()

