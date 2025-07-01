import TutorialArticle from "./TutorialArticle";

export default function OverviewTab(): React.ReactElement {
  return (
    <>
      <TutorialArticle>
        <p>
          This project aims to develop (in Python) a lightweight proof assistant
          that is substantially less powerful than full proof assistants such as
          Lean, Isabelle or Rocq, but which (hopefully) is easy to use to prove
          short, tedious tasks, such as verifying that one inequality or
          estimate follows from others. One specific intention of this assistant
          is to provide support for asymptotic estimates.
        </p>
      </TutorialArticle>
    </>
  );
}
