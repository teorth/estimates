# A type is a statement, expression, or other first-class mathematical object.

class Type:
    """A type is a statement, expression, or other first-class mathematical object."""
    def __hash__(self):
        return id(self)    
    def __str__(self):
        return self.name
    def __repr__(self):
        return str(self)
    def defeq(self, other): 
        """Check if two types are definitionally equal (but not necessarily the same object).  Can be overridden.  This should be the default equality check for types."""
        return self is other
    def appears_in(self, collection):
        """Check if the type appears in a collection of types (up to defeq)."""
        return any(self.defeq(object) for object in collection)
    def simp(self, hypotheses=set()):
        """Simplify the type.  Can be overridden.  Can use the hypotheses in the `hypotheses` to simplify."""
        return self


def add_nodup(collection, object):
    """ Add an object to a set of object, if it is not defeq to any existing object. """
    if not(object.appears_in(collection)):
        collection.add(object)
    return collection

def defeq_set( objects1, objects2):
    """Check if two sets of objects are equal (up to defeq)."""
    if len(objects1) != len(objects2):
        return False
    return all(any(s1.defeq(s2) for s2 in objects2) for s1 in objects1)
