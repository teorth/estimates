import TutorialArticle from "./TutorialArticle";
import TutorialExample from "./TutorialExample";

export default function HowItWorksTab(): React.ReactElement {
  return (
    <TutorialArticle>
      <p>
        This project aims to develop (in Python) a lightweight proof assistant
        that is substantially less powerful than full proof assistants such as
        Lean, Isabelle or Rocq, but which (hopefully) is easy to use to prove
        short, tedious tasks, such as verifying that one inequality or estimate
        follows from others. One specific intention of this assistant is to
        provide support for asymptotic estimates.
      </p>
      <p>
        The assistant can be in one of two modes: Assumption mode and Tactic
        mode. We will get to assumption mode later, but let us first discuss
        tactic mode, which is the mode one ends up in when one tries any of the
        exercises. The format of this mode is deliberately designed to resemble
        the tactic mode in modern proof assistant languages such as Lean,
        Isabelle or Rocq.
      </p>
      <p>
        Let's start for instance with <code>linarith_exercise()</code>.
        Informally, this exercise asks to establish the following claim:
      </p>
      <p>
        <em>
          Informal version: If x, y, z are positive reals with x &lt; 2y and y
          &lt; 3z + 1, prove that x &lt; 7z + 2.
        </em>
      </p>
      <p>
        If one follows the above quick start instructions, one should now see
        the following:
      </p>
      <TutorialExample
        lines={[
          ">>> from estimates.main import *",
          ">>> p = linarith_exercise()",
          "Starting proof.  Current proof state:",
          "x: pos_real",
          "y: pos_real",
          "z: pos_real",
          "h1: x &lt; 2*y",
          "h2: y &lt; 3*z + 1",
          "|- x &lt; 7*z + 2",
        ]}
        problem={{
          variables: [
            {
              name: "x",
              type: "pos_real",
            },
            {
              name: "y",
              type: "pos_real",
            },
            {
              name: "z",
              type: "pos_real",
            },
          ],
          assumptions: [
            {
              input: "x < 2*y",
              name: "h1",
            },
            {
              input: "y < 3*z + 1",
              name: "h2",
            },
          ],
          goal: {
            input: "x < 7*z + 2",
          },
        }}
      />
      <p>
        We are now in <strong>Tactic mode</strong>, in which we try to establish
        a desired goal (the assertion after the <code>|-</code> symbol, which in
        this case is <code>x &lt; 7*z + 2</code>) from the given hypotheses x,
        y, z, h1, h2. Hypotheses come in two types:
      </p>
      <ul>
        <li>
          <strong>Variable declarations</strong>, such as{" "}
          <code>x: pos_real</code>, which asserts that we have a variable x that
          is a positive real number.
        </li>
        <li>
          <strong>Predicates</strong>, such as <code>h1: x &lt; 2*y</code>,
          which have a name (in this case, h1), and a boolean-valued assertion
          involving the variables, in this case <code>x &lt; 2*y</code>.
        </li>
      </ul>
      <p>
        The goal is also a predicate. The list of hypotheses together with a
        goal is collectively referred to as a <strong>proof state</strong>.
      </p>
      <p>
        In order to obtain the goal from the hypotheses, one usually uses a
        sequence of <strong>tactics</strong>, which can transform a given proof
        state to zero or more further proof states. This can decrease, increase,
        or hold steady the number of outstanding goals. The "game" is then to
        keep using tactics until the number of outstanding goals drops to zero,
        at which point the proof is complete.
      </p>
      <p>
        In this particular case, there is a "linear arithmetic" tactic{" "}
        <code>Linarith()</code> (inspired by the Lean tactic linarith) that is
        specifically designed for the task of obtaining a goal as a linear
        combination of the hypotheses, and it "one-shots" this particular
        exercise:
      </p>
      <TutorialExample
        lines={[">>> p.use(Linarith())", "Proof complete!"]}
        tactic={{
          target: "Linarith()",
          position: "last",
        }}
      />
      <p>
        This may seem suspiciously easy, but one can ask Linarith to give a more
        detailed explanation:
      </p>
      <TutorialExample
        lines={[
          ">>> p.use(Linarith(verbose=True))",
          "Checking feasibility of the following inequalities:",
          "1*z > 0",
          "1*x + -7*z >= 2",
          "1*y + -3*z < 1",
          "1*y > 0",
          "1*x > 0",
          "1*x + -2*y < 0",
          "Infeasible by summing the following:",
          "1*z > 0 multiplied by 1/4",
          "1*x + -7*z >= 2 multiplied by 1/4",
          "1*y + -3*z < 1 multiplied by -1/2",
          "1*x + -2*y < 0 multiplied by -1/4",
          "Goal solved by linear arithmetic!",
          "Proof complete!",
        ]}
        tactic={{
          target: "Linarith(verbose=True)",
          position: "last",
        }}
      />
      <p>This gives more details as to what Linarith actually did:</p>
      <ul>
        <li>
          First, it argued by contradiction, by taking the negation{" "}
          <code>x ≥ 7z + 2</code> of the goal <code>x &lt; 7z + 2</code> and
          added it to the hypotheses.
        </li>
        <li>
          Then, it converted all the inequalities that were explicit or implicit
          in the hypotheses into a "linear programming" form in which the
          variables are on the left-hand side, and constants on the right-hand
          side. For instance, the assertion that x was a positive real became{" "}
          <code>1x &gt; 0</code>, and the assertion <code>y &lt; 3z</code>{" "}
          became <code>1y + -3*z &lt; 1</code>.
        </li>
        <li>
          Finally, it used exact linear programming to seek out a linear
          combination of these inequalities that would lead to an absurd
          inequality, in this case <code>0 &lt; 1</code>.
        </li>
      </ul>
      <p>
        One can also inspect the final proof after solving the problem by using
        the <code>proof()</code> method, although in this case the proof is
        extremely simple:
      </p>
      <pre>
        <code>
          &gt;&gt;&gt; print(p.proof())
          <br />
          example (x: pos_real) (y: pos_real) (z: pos_real) (h1: x &lt; 2*y)
          (h2: y &lt; 3*z + 1): x &lt; 7*z + 2 := by
          <br />
          linarith
        </code>
      </pre>
      <p>
        Here, the original hypotheses and goal are listed in a pseudo-Lean
        style, followed by the actual proof, which in this case is just one
        line.
      </p>
      <p>
        One could ask what happens if Linarith fails to resolve the goal. With
        the verbose flag, it will give a specific counterexample consistent with
        all the inequalities it could find:
      </p>
      <TutorialExample
        lines={[
          ">>> from estimates.main import *",
          ">>> p = linarith_impossible_example()",
          "Starting proof.  Current proof state:",
          "x: pos_real",
          "y: pos_real",
          "z: pos_real",
          "h1: x < 2*y",
          "h2: y < 3*z + 1",
          "|- x < 7*z",
          ">>> p.use(Linarith(verbose=True))",
          "Checking feasibility of the following inequalities:",
          "1*x + -7*z >= 0",
          "1*x > 0",
          "1*y + -3*z < 1",
          "1*x + -2*y < 0",
          "1*z > 0",
          "1*y > 0",
          "Feasible with the following values:",
          "y = 2",
          "x = 7/2",
          "z = 1/2",
          "Linear arithmetic was unable to prove goal.",
          "1 goal remaining.",
        ]}
        problem={{
          variables: [
            {
              name: "x",
              type: "pos_real",
            },
            {
              name: "y",
              type: "pos_real",
            },
            {
              name: "z",
              type: "pos_real",
            },
          ],
          assumptions: [
            {
              input: "x < 2*y",
              name: "h1",
            },
            {
              input: "y < 3*z + 1",
              name: "h2",
            },
          ],
          goal: {
            input: "x < 7*z",
          },
        }}
        tactic={{
          target: "Linarith(verbose=True)",
          position: "last",
        }}
      />

      <p>
        Here, the task given was an impossible one: to deduce{" "}
        <code>x &lt; 7z</code> from the hypotheses that <code>x</code>,{" "}
        <code>y</code>, <code>z</code> are positive reals with{" "}
        <code>x &lt; 2y</code> and <code>y &lt; 3z + 1</code>. A specific
        counterexample <code>x = 7/2</code>, <code>y = 2</code>,{" "}
        <code>z = 1/2</code> was given to this problem. (In this case, this
        means that the original problem was impossible to solve; but in general
        one cannot draw such a conclusion, because it may have been possible to
        establish the goal by using some non-inequality hypotheses).
      </p>
      <p>
        Now let us consider a slightly more complicated proof, in which some
        branching of cases is required.
      </p>
      <TutorialExample
        lines={[
          ">>> from estimates.main import *",
          ">>> p = case_split_exercise()",
          "Starting proof.  Current proof state:",
          "P: bool",
          "Q: bool",
          "R: bool",
          "S: bool",
          "h1: P | Q",
          "h2: R | S",
          "|- (P &amp; R) | (P &amp; S) | (Q &amp; R) | (Q &amp; S)",
        ]}
        problem={{
          variables: [
            {
              name: "P",
              type: "bool",
            },
            {
              name: "Q",
              type: "bool",
            },
            {
              name: "R",
              type: "bool",
            },
            {
              name: "S",
              type: "bool",
            },
          ],
          assumptions: [
            {
              input: "P | Q",
              name: "h1",
            },
            {
              input: "R | S",
              name: "h2",
            },
          ],
          goal: {
            input: "(P & R) | (P & S) | (Q & R) | (Q & S)",
          },
        }}
      />
      <p>
        Here, we have four atomic propositions (boolean variables) P, Q, R, S,
        with the hypothesis h1 that either P or Q is true, as well as the
        hypothesis h2 that either R or S is true. The objective is then to prove
        that one of the four statements P &amp; R (i.e., P and R are both true),
        P &amp; S, Q &amp; R, and Q &amp; S is true.
      </p>
      <p>Here we can split the hypothesis h1 : P | Q into two cases:</p>
      <TutorialExample
        lines={[
          '>>> p.use(Cases("h1"))',
          "Splitting h1: P | Q into cases P, Q.",
          "2 goals remaining.",
        ]}
        tactic={{
          target: 'Cases("h1")',
          position: "last",
        }}
      />
      <p>Let's now look at the current proof state:</p>
      <TutorialExample
        lines={[
          ">>> print(p)",
          "Proof Assistant is in tactic mode.  Current proof state:",
          "P: bool",
          "Q: bool",
          "R: bool",
          "S: bool",
          "h1: P",
          "h2: R | S",
          "|- (P &amp; R) | (P &amp; S) | (Q &amp; R) | (Q &amp; S)",
          "This is goal 1 of 2.",
        ]}
      />
      <p>
        Note how the hypothesis h1 has changed from P | Q to just P. But this is
        just one of the two goals. We can see this by looking at the current
        state of the proof:
      </p>
      <TutorialExample
        lines={[
          ">>> print(p.proof())",
          "example (P: bool) (Q: bool) (R: bool) (S: bool) (h1: P | Q) (h2: R | S): (P &amp; R) | (P &amp; S) | (Q &amp; R) | (Q &amp; S) := by",
          "cases h1",
          ". **sorry**",
          "sorry",
        ]}
      />
      <p>
        The proof has now branched into a tree with two leaf nodes (marked
        ``sorry''), representing the two unresolved goals. We are currently
        located at the first goal (as indicated by the asterisks). We can move
        to the next goal:
      </p>
      <TutorialExample
        lines={[
          ">>> p.next_goal()",
          "Moved to goal 2 of 2.",
          ">>> print(p.proof())",
          "example (P: bool) (Q: bool) (R: bool) (S: bool) (h1: P | Q) (h2: R | S): (P & R) | (P & S) | (Q & R) | (Q & S) := by",
          "cases h1",
          ". sorry",
          "**sorry**",
          ">>> print(p)",
          "Proof Assistant is in tactic mode.  Current proof state:",
          "P: bool",
          "Q: bool",
          "R: bool",
          "S: bool",
          "h1: Q",
          "h2: R | S",
          "|- (P & R) | (P & S) | (Q & R) | (Q & S)",
          "This is goal 2 of 2.",
        ]}
      />
      <p>
        So we see that in this second branch of the proof tree, h1 is now set to
        Q. For further ways to navigate the proof tree, see this page.
      </p>
      <p>
        Now that we know that Q is true, we would like to use this to simplify
        our goal, for instance simplifying Q &amp; R to Q. This can be done
        using the SimpAll() tactic:
      </p>
      <TutorialExample
        lines={[
          ">>> p.use(SimpAll())",
          "Simplified (P &amp; R) | (P &amp; S) | (Q &amp; R) | (Q &amp; S) to R | S using Q.",
          "Simplified R | S to True using R | S.",
          "Goal solved!",
          "1 goal remaining.",
        ]}
        tactic={{
          target: "SimpAll()",
          position: "last",
        }}
      />
      <p>
        Here, the hypothesis Q was used to simplify the goal (using sympy's
        powerful simplification tools), all the way down to R | S. But this is
        precisely hypothesis h2, so on using that hypothesis as well, the
        conclusion was simplified to True, which of course closes off this goal.
        This then lands us automatically in the first goal, which can be solved
        by the same method:
      </p>
      <TutorialExample
        lines={[
          ">>> p.use(SimpAll())",
          "Simplified (P &amp; R) | (P &amp; S) | (Q &amp; R) | (Q &amp; S) to R | S using P.",
          "Simplified R | S to True using R | S.",
          "Goal solved!",
          "Proof complete!",
        ]}
        tactic={{
          target: "SimpAll()",
          position: "last",
        }}
      />
      <p>And here is the final proof:</p>
      <pre>
        <code>
          &gt;&gt;&gt; print(p.proof()) example (P: bool) (Q: bool) (R: bool)
          (S: bool) (h1: P | Q) (h2: R | S): (P &amp; R) | (P &amp; S) | (Q
          &amp; R) | (Q &amp; S) := by
          <br />
          cases h1
          <br />. simp_all
          <br />
          simp_all
        </code>
      </pre>
      <p>
        One can combine propositional tactics with linear arithmetic tactics.
        Here is one example (using some propositional tactics we have not yet
        discussed, but whose purpose should be clear, and which one can look up
        in this page):
      </p>
      <TutorialExample
        lines={[
          ">>> from estimates.main import *",
          ">>> p = split_exercise()",
          "Starting proof.  Current proof state:",
          "x: real",
          "y: real",
          "h1: (x > -1) & (x < 1)",
          "h2: (y > -2) & (y < 2)",
          "|- (x + y > -3) & (x + y < 3)",
          '>>> p.use(SplitHyp("h1"))',
          "Decomposing h1: (x > -1) & (x < 1) into components x > -1, x < 1.",
          "1 goal remaining.",
          '>>> p.use(SplitHyp("h2"))',
          "Decomposing h2: (y > -2) & (y < 2) into components y > -2, y < 2.",
          "1 goal remaining.",
          ">>> p.use(SplitGoal())",
          "Split into conjunctions: x + y > -3, x + y < 3",
          "2 goals remaining.",
          ">>> p.use(Linarith())",
          "Goal solved by linear arithmetic!",
          "1 goal remaining.",
          ">>> p.use(Linarith())",
          "Goal solved by linear arithmetic!",
          "Proof complete!",
          ">>> print(p.proof())",
          "example (x: real) (y: real) (h1: (x > -1) & (x < 1)) (h2: (y > -2) & (y < 2)): (x + y > -3) & (x + y < 3) := by",
          "split_hyp h1",
          "split_hyp h2",
          "split_goal",
          ". linarith",
          "linarith",
        ]}
        problem={{
          variables: [
            {
              name: "x",
              type: "real",
            },
            {
              name: "y",
              type: "real",
            },
          ],
          assumptions: [
            {
              input: "(x > -1) & (x < 1)",
              name: "h1",
            },
            {
              input: "(y > -2) & (y < 2)",
              name: "h2",
            },
          ],
          goal: {
            input: "(x + y > -3) & (x + y < 3)",
          },
        }}
      />
    </TutorialArticle>
  );
}
