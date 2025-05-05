
# An Object witnesses a type of a mathematical object, such as a typeclass (e.g., a real number) or a proposition, as well as a name for that object.  The hypotheses and goals of a proof state will be made up of objects.  The objects are mutable: it is possible to change the value of the object after it is created, for instance by applying a simplifier to it.  This is in contrast to the value of the object, which is an immutable type.  For now, objects will be represented as strings; later, we will use sympy's Basic class to represent them.

# Numerical example: 
# Object("int", "x") gives an object "x" of type "integer". One should think of x as a symbolic representation of an integer.

# Propositional example:
# Object("bool", "P") gives an object "P" of type "boolean".  One should think of P as a symbolic representation of an atomic proposition.

# Sentential example:
# Object("x+y<1", "h") gives an object "h" of type "x+y<1" (here "x" and "y" should be previously defined objects). One should think if P as a hypothesis or proof that x+y<1 is true.

class Object:
    def __init__(self, obj_type: str, name: str = "this"):
        """
        Initialize an object with a name and a type.
        
        :param name: The name of the object.  If the object is the conclusion of a goal, the name should be None
        :param type: The type of the object.
        """
        self.name = name
        self.type = obj_type
        return self

    def __str__(self):
        if self.name is None:
            return f"{self.type}"
        else:
            return f"{self.name} : {self.type}"

    def __repr__(self):
        return f"Object({self.type}, {self.name})" 



