from sympy import And, S

from estimates.proofassistant import ProofAssistant
from estimates.proofstate import ProofState
from estimates.prooftree import ProofTree
from estimates.propositional_tactics import SplitGoal
from estimates.simp import SimpAll


def branch(parent):
    parent.tactic = SplitGoal()
    return parent.add_sorry(ProofState(S.true))


def test_previous_goal_survives_a_completed_sibling():
    root = ProofTree(ProofState(S.true))
    first = branch(root)
    middle = branch(root)
    middle.tactic = SimpAll()
    target = branch(root)
    assert root.find_sorry(target) == (True, first, None)


def test_next_goal_descends_into_a_nested_branch():
    root = ProofTree(ProofState(S.true))
    target = branch(root)
    nested = branch(root)
    next_goal = branch(nested)
    assert root.find_sorry(target) == (True, None, next_goal)
    assert root.find_sorry(root) == (True, None, target)
    target.tactic = SimpAll()
    assert root.find_sorry(root) == (True, None, next_goal)


def test_solving_later_goals_keeps_the_first_goal_active():
    assistant = ProofAssistant()
    x, y, z = assistant.vars('real', 'x', 'y', 'z')
    for variable in (x, y, z):
        assistant.assume(variable > 0)
    assistant.begin_proof(And(x > 0, y > 0, z > 0))
    assistant.use(SplitGoal())
    root = assistant.proof_tree
    assert len(root.children) == 3
    assistant.set_current_node(root.children[1])
    assistant.use(SimpAll())
    assistant.use(SimpAll())
    assert root.num_sorries() == 1
    assert assistant.mode == 'tactic'
    assert assistant.current_node is root.children[0]
    assistant.use(SimpAll())
    assert root.num_sorries() == 0
    assert assistant.mode == 'assumption'


def test_counts_include_nested_goals_after_the_target():
    root = ProofTree(ProofState(S.true))
    target = branch(root)
    nested = branch(root)
    branch(nested)
    branch(nested)
    assert root.count_sorries(target) == (True, 0, 2)
    assert root.count_sorries(root) == (True, 0, 3)


def test_missing_target_reports_both_edges_of_the_subtree():
    root = ProofTree(ProofState(S.true))
    first = branch(root)
    last = branch(root)
    missing = ProofTree(ProofState(S.true))
    assert root.find_sorry(missing) == (False, last, first)
    assert root.count_sorries(missing) == (False, 2, 2)
