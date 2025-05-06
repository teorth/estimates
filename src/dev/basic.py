from sympy import Basic, Symbol

# Some code to handle sympy classes


def describe( name:str, object:Basic ) -> str:
    """Return a string description of a named sympy object."""
    if isinstance(object, Symbol):
        if object.is_integer:
            return f"{name}: int"
        elif object.is_real:
            return f"{name}: real"
    else:
        return f"{name}: {object}"