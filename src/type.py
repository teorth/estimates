# A concept is a mathematical expression with a notion of definitional equality.  This is a way to check if two types are considered equal in the context of a proof or mathematical reasoning, even if they are not the same object in memory.
# Concepts can be either mutable or immutable.  Generally speaking, one uses mutable concepts when manipulating the proof state (e.g., replacing a hypothesis with a simplified hypothesis), but uses immutable concepts in all other cases.
class Concept:
    def __hash__(self):
        """Return a hash of the concept.  This is used to allow concepts to be used in sets and as dictionary keys."""
        return id(self)    
    def __str__(self):
        return self.name
    def __repr__(self):
        return str(self)
    def is_mutable(self): 
        """Returns whether this object is mutable.  Can be overridden."""
        return False
    def mutable(self): 
        """Return a mutable version of the concept.  Can be overridden.  Used for creating new hypotheses and conclusions."""
        return self
    def immutable(self): 
        """Return an immutable version of the concept.  Can be overridden.  Used for analyzing the mathematical content of a hypothesis or conclusion."""
        return self
    def defeq(self, other): 
        """Check if two types are definitionally equal (but not necessarily the same object).  Can be overridden.  This should be the default equality check for types.  It is important that this does not override __eq__, which is used for object identity (e.g., to form sets of types)."""
        return self is other
    def defeq_immutable(self, other):
        """Same as defeq, but projected onto the immutable version of the types.  Slightly preferable to defeq because it works when self is immutable and other is mutable, whereas defeq does not.  Should not be overridden."""
        return self.immutable().defeq(other.immutable())
    def appears_in(self, collection):
        """Check if the type appears in a collection of types (up to defeq)."""
        return any(self.defeq_immutable(object) for object in collection)
    def match(self, collection):
        """Check if the type matches any type in a collection of types (up to defeq). If so, return the matching type."""
        for object in collection:
            if self.defeq_immutable(object):
                return object
        return None
    def add_to(self, collection):
        """Add the type to a collection of types, if it is not already present (up to defeq)."""
        if not self.appears_in(collection):
            collection.add(self)
        return collection

def set_defeq( objects1, objects2):
    """Check if two sets of objects are equal (up to defeq)."""
    if len(objects1) != len(objects2):
        return False
    return all(any(s1.defeq_immutable(s2) for s2 in objects2) for s1 in objects1)

def immutable(type):
    """Convert one or more (possibly mutable) types to immutable type(s)."""
    if isinstance(type, (Type,MutableType)):
        return type.immutable()
    elif isinstance(type, set):
        return {immutable(t) for t in type}
    else:
        raise ValueError(f"immutable() must be called with (collections of) Type or MutableType, not {type}.")

def mutable(type):
    """Convert one or more (possibly immutable) types to mutable type(s)."""
    if isinstance(type, (Type, MutableType)):
        return type.mutable()
    elif isinstance(type, set):
        return {mutable(t) for t in type}
    else:
        raise ValueError(f"mutable() must be called with (collections of) Type or MutableType, not {type}.")


# A type is an immutable statement, expression, or other first-class mathematical object.

class Type(Concept):
    """A type is a statement, expression, or other first-class mathematical object."""
    def __str__(self):
        return self.name
    def simp(self, hypotheses=set()):
        """Simplify the type to a type that is logically equivalent subject to the given hypotheses.  Can be overridden."""
        return self
    def is_mutable(self):
        return False
    def immutable(self):
        """Return an immutable version of the type."""
        return self
    def mutable(self):
        """Return a mutable version of the type."""
        return MutableType(self)

# A mutable type is a type that can be modified after creation; it is a wrapper around an immutable type.  This is useful for types that are used in proofs, where the type may need to be updated as the proof progresses but one wants to keep the object identifier constant.

class MutableType(Concept):
    def __init__(self, type):
        if isinstance(type, MutableType):
            self.type = type.type
        elif isinstance(type, Type):
            self.type = type
        else:
            raise ValueError(f"MutableType must be initialized with a Type or MutableType, not {type}.")
    def __str__(self):
        return str(self.type)
    def defeq(self, other):
        """Check if two mutable types are definitionally equal (up to defeq)."""
        if isinstance(other, (Type,MutableType)):
            return self.type.defeq(other.immutable())
        return False
    def simp(self, hypotheses=set()):
        """Simplify the mutable type to a type that is logically equivalent subject to the given hypotheses."""
        
        new_type = self.type.simp(immutable(hypotheses))
        if not new_type.defeq_immutable(self.type):
            print(f"Simplifying {self.type} to {new_type}.")
            self.type = new_type
    def copy(self):
        """Return a copy of the mutable type."""
        return MutableType(self.type)
    def is_mutable(self):
        return True
    def immutable(self):
        """Return an immutable version of the mutable type.  Use this when doing instance checks, or when accessing type data."""
        return self.type
    def mutable(self):
        """Return the mutable type itself, since it is already mutable."""
        return self
    
