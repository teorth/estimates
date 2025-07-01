import TutorialArticle from "./TutorialArticle";
import TutorialExample from "./TutorialExample";

export default function LemmasTab(): React.ReactElement {
  return (
    <TutorialArticle>
      In addition to general proof tactics, The goal is to build a library of
      lemmas that can be used for more specialized applications. Here is one
      example, using an arithmetic mean geometric mean lemma:
      <p>
        <em>AM-GM Inequality:</em> For positive real numbers x₁, ..., xₙ,
        <br />
        (x₁ + ... + xₙ)/n ≥ (x₁·...·xₙ)^(1/n)
      </p>
      to prove a slight variant of that lemma:
      <TutorialExample
        lines={[
          ">>> from estimates.main import *",
          ">>>",
          "p = amgm_exercise()",
          "Starting proof.  Current proof state:",
          "x: nonneg_real",
          "y: nonneg_real",
          "|- 2*x*y <= x**2 + y**2",
          '>>> x,y = p.get_vars("x","y")',
          ">>> p.use_lemma(Amgm(x**2,y**2))",
          "Applying lemma am_gm(x**2, y**2) to conclude this: x**1.0*y**1.0 <= x**2/2 + y**2/2.",
          "1 goal remaining.",
          ">>> p.use(Linarith())",
          "Goal solved!",
          "Proof complete!",
        ]}
        problem={{
          variables: [
            {
              name: "x",
              type: "nonneg_real",
            },
            {
              name: "y",
              type: "nonneg_real",
            },
          ],
          assumptions: [],
          goal: {
            input: "2*x*y <= x**2 + y**2",
          },
        }}
      />
    </TutorialArticle>
  );
}
