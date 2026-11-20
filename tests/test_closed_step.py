from sympy import Eq, S, StrictLessThan

from estimates.proofassistant import ProofAssistant
from estimates.propositional_tactics import ByCases, Claim


def test_use_on_closed_step_keeps_the_tree(capsys):
    p = ProofAssistant()
    p.auto_finish_off()
    z = p.var("pos_real", "z")
    p.begin_proof(StrictLessThan(z, S(2), evaluate=False))
    p.use(ByCases(Eq(z, S(1), evaluate=False), "h"))
    parent = p.current_node.parent
    assert parent is not None
    p.set_current_node(parent)
    p.use(Claim(StrictLessThan(z, S(3), evaluate=False), "c"))
    assert parent.tactic is not None
    assert str(parent.tactic).startswith("by_cases")
    assert len(parent.children) == 2
    captured = capsys.readouterr()
    assert "Undo it before applying another." in captured.out
