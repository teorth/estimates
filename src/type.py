# A type is a statement, expression, or other first-class mathematical object.
# A key notion here is that of *definitional equality* (defeq), which is a way to check if two types are considered equal in the context of a proof or mathematical reasoning, even if they are not the same object in memory.

class Type:
    """A type is a statement, expression, or other first-class mathematical object."""
    def __hash__(self):
        return id(self)    # This allows types to be used in sets and as dictionary keys.
    def __str__(self):
        return self.name
    def __repr__(self):
        return str(self)
    def defeq(self, other): 
        """Check if two types are definitionally equal (but not necessarily the same object).  Can be overridden.  This should be the default equality check for types.  It is important thiat this does not override __eq__, which is used for object identity (e.g., to form sets of types)."""
        return self is other
    def appears_in(self, collection):
        """Check if the type appears in a collection of types (up to defeq)."""
        return any(self.defeq(object) for object in collection)
    def add_to(self, collection):
        """Add the type to a collection of types, if it is not already present (up to defeq)."""
        if not self.appears_in(collection):
            collection.add(self)
        return collection
    def simp(self, hypotheses=set()):
        """Simplify the type.  Can be overridden.  Can use the hypotheses in the `hypotheses` to simplify."""
        return self



def set_defeq( objects1, objects2):
    """Check if two sets of objects are equal (up to defeq)."""
    if len(objects1) != len(objects2):
        return False
    return all(any(s1.defeq(s2) for s2 in objects2) for s1 in objects1)
