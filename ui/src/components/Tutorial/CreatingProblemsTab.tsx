import TutorialArticle from "./TutorialArticle";
import TutorialExample from "./TutorialExample";
export default function CreatingProblemsTab(): React.ReactElement {
  return (
    <TutorialArticle>
      The previous demonstrations of the Proof Assistant used some "canned"
      examples which placed one directly in Tactic Mode with some pre-made
      hypotheses and goal. To make one's own problem to solve, one begins with
      the ProofAssistant constructor:
      <TutorialExample
        lines={[
          ">>> from estimates.main import *",
          ">>> p = ProofAssistant()",
          "Proof Assistant is in assumption mode.  Current proof state:",
          "|- True",
        ]}
        problem={{
          variables: [],
          assumptions: [],
          goal: {
            input: "True",
          },
        }}
      />
      <p>
        This places the proof assistant in Assumption Mode. Now one can add
        variables and assumptions. For instance, to introduce a positive real
        variable x, one can use the var() method to write
      </p>
      <TutorialExample
        lines={['>>> x = p.var("real", "x")', "x: real"]}
        variables={[
          {
            name: "x",
            type: "real",
          },
        ]}
      />
      <p>
        This creates a sympy Python variable x, which is real and can be
        manipulated symbolically using the full range of sympy methods:
      </p>
      <pre>
        <code>
          &gt;&gt;&gt; x
          <br />
          x
          <br />
          &gt;&gt;&gt; x.is_real
          <br />
          True
          <br />
          &gt;&gt;&gt; x+x
          <br />
          2*x
          <br />
          &gt;&gt;&gt; from sympy import expand
          <br />
          &gt;&gt;&gt; expand((x+2)**2)
          <br />
          x**2 + 4*x + 4
          <br />
          &gt;&gt;&gt; x&lt;5
          <br />x &lt; 5
          <br />
          &gt;&gt;&gt; isinstance(x&lt;5, Boolean) True
        </code>
      </pre>
      <p>One can also use vars() to introduce multiple variables at once:</p>
      <TutorialExample
        lines={[
          '>>> y,z = p.vars("pos_int", "y", "z")   # "pos_int" means "positive integer"',
          ">>> y.is_positive",
          "True",
          ">>> (y+z).is_positive",
          "True",
          ">>> (x+y).is_positive",
          ">>> (x+y).is_real",
          "True",
        ]}
        variables={[
          {
            name: "y",
            type: "pos_int",
          },
          {
            name: "z",
            type: "pos_int",
          },
        ]}
      />
      <p>
        (Here, (x+y).is_positive returned None, reflecting the fact that the
        hypotheses do not allow one to easily assert that x+y is positive.)
      </p>
      <p>One can then add additional hypotheses using the assume() command:</p>
      <TutorialExample
        lines={[
          '>>> p.assume(x+y+z &lt;= 3, "h")',
          '>>> p.assume((x>y) & (y>=z), "h2")',
          ">>> print(p)",
        ]}
        assumptions={[
          {
            input: "x+y+z >= 3",
            name: "h1",
          },
          {
            input: "(x>=y) & (y>=z)",
            name: "h2",
          },
        ]}
      />
      <p>Now, one can start a goal with the begin_proof() command:</p>
      <TutorialExample
        lines={[
          ">>> p.begin_proof(Eq(z,1))",
          "Starting proof.  Current proof state:",
          "x: real",
          "y: pos_int",
          "z: pos_int",
          "h: x + y + z < 3",
          "h2: (x >= y) & (y >= z)",
          "|- Eq(z, 1)",
        ]}
        goal={{
          input: "Eq(z, 1)",
        }}
      />
      <p>
        (Here we are using sympy's symbolic equality relation Eq, because Python
        has reserved the = and == operators for other purposes.) Now one is in
        Tactic Mode and can use tactics as before.
      </p>
      <p>
        For a full list of navigation commands that one can perform in either
        Assumption Mode or Tactic Mode, see the{" "}
        <a
          href="https://github.com/teorth/estimates/blob/main/docs/navigation.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          navigation documentation
        </a>
        .
      </p>
    </TutorialArticle>
  );
}
