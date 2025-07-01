import LatexString from "../VisualEditor/LatexString";
import TutorialArticle from "./TutorialArticle";
import TutorialExample from "./TutorialExample";

export default function OrdersOfMagnitudeTab(): React.ReactElement {
  return (
    <TutorialArticle>
      <p>
        One of the original motivations for this proof assistant was to create
        an environment in which one can manipulate asymptotic estimates such as
        the following:
      </p>
      <ul>
        <li>
          <LatexString latex="X \lesssim Y" /> (also written{" "}
          <LatexString latex="X = O(Y)" />
          ), which asserts that <LatexString latex="|X| \leq CY" /> for some
          absolute constant <LatexString latex="C" />.
        </li>
        <li>
          <LatexString latex="X \ll Y" /> (also written{" "}
          <LatexString latex="X = o(Y)" />
          ), which asserts that for every constant{" "}
          <LatexString latex="\varepsilon >0" />, one has{" "}
          <LatexString latex="|X| \leq \varepsilon Y" /> if a suitable
          asymptotic parameter is large enough.
        </li>
        <li>
          <LatexString latex="X \asymp Y" /> (also written{" "}
          <LatexString latex="X = \Theta(Y)" />
          ), which asserts that <LatexString latex="X \lesssim Y \lesssim X" />.
        </li>
      </ul>
      <p>
        This is implemented within `sympy` as follows. One first defines a new
        type of sympy expression, which I call `OrderOfMagnitude`, and
        corresponds to the space <LatexString latex="\mathcal{O}" /> discussed
        in{" "}
        <a
          href="https://terrytao.wordpress.com/2025/05/04/orders-of-infinity/"
          target="_blank"
          rel="noopener noreferrer"
        >
          this blog post
        </a>
        . These expressions are not numbers, but still support several algebraic
        operations, such as addition, multiplication, raising to numerical real
        exponents, and order comparison. However, we caution that there is no
        notion of zero or subtraction in <LatexString latex="\mathcal{O}" />
        (though for technical `sympy` reasons we implement a purely formal
        subtraction operation with no mathematical content).
      </p>
      <p>
        There is then an operation `Theta` that maps positive real `sympy`
        expressions to `OrderOfMagnitude` expressions, which then allows one to
        interpret the above asymptotic statements:
      </p>
      <ul>
        <li>
          <LatexString latex="X \lesssim Y" /> is formalized as{" "}
          <LatexString latex="\lesssim(X,Y)" />, which is syntactic sugar for{" "}
          <LatexString latex="Theta(Abs(X)) <= Theta(Y)" />.
        </li>
        <li>
          <LatexString latex="X \ll Y" /> is formalized as{" "}
          <LatexString latex="ll(X,Y)" />, which is syntactic sugar for{" "}
          <LatexString latex="Theta(Abs(X)) < Theta(Y)" />.
        </li>
        <li>
          <LatexString latex="X \asymp Y" /> is formalized as{" "}
          <LatexString latex="asymp(X,Y)" />, which is syntactic sugar for{" "}
          <LatexString latex="Eq(Theta(X), Theta(Y))" />.
        </li>
      </ul>
      <p>
        Various laws of asymptotic arithmetic have been encoded within the
        syntax of `sympy`, for instance <LatexString latex="Theta(C)" />{" "}
        simplifies to <LatexString latex="Theta(1)" /> for any numerical
        constant `C`, <LatexString latex="Theta(X+Y)" /> simplifies to{" "}
        <LatexString latex="Max(Theta(X),Theta(Y))" />, and so forth.
      </p>
      <p>
        Expressions can be marked as "fixed" (resp. "bounded"), in which case
        they will be marked has having order of magnitude equal to (resp. at
        most) <LatexString latex="Theta(1)" /> for the purposes of logarithmic
        linear programming.
      </p>
      <p>
        <b>Technical note</b>: to avoid some unwanted applications of `sympy`'s
        native simplifier (in particular, those applications that involve
        subtraction, which we leave purely formal for orders of magnitude), and
        to force certain type inferences to work, `OrderOfMagnitude` overrides
        the usual `Add`, `Mul`, `Pow`, `Max`, and `Min` operations with custom
        alternatives `OrderAdd`, `OrderMul`, `OrderPow`, `OrderMax`, `OrderMin`.
      </p>
      <p>
        <b>Technical note</b>: We technically permit `Theta` to take
        non-positive values, but a warning will be sent if this happens and an
        `Undefined()` element will be generated. (`sympy`'s native simplifier
        will sometimes trigger this warning.) Similarly for other undefined
        operations, such as `OrderMax` or `OrderMin` applied to an empty tuple.
      </p>
      <p>
        <b>A "gotcha"</b>: One should avoid using python's native `max` or `min`
        command with orders of magnitude, or even `sympy`'s alternative `Max`
        and `Min` commands. Use `OrderMax` and `OrderMin` instead.
      </p>
      <p>
        An abstract order of magnitude can be created using the
        `OrderSymbol(name)` constructor, similar to the `Symbol()` constructor
        in `sympy` (but with attributes such as `is_positive` set to false, with
        the exception of the default flag `is_commutative`).
      </p>
      <p>
        Here is a simple example of the proof assistant establishing an
        asymptotic estimate. Informally, one is given a positive integer{" "}
        <LatexString latex="N" /> and positive reals <LatexString latex="x,y" />{" "}
        such that <LatexString latex="x \leq 2N^2" /> and{" "}
        <LatexString latex="y < 3kN" /> with <LatexString latex="k" /> bounded,
        and the task is to conclude that <LatexString latex="xy \lesssim N^4" />
        .
      </p>
      <TutorialExample
        lines={[
          ">>> from estimates.main import *",
          ">>> p = loglinarith_exercise()",
          "Starting proof.  Current proof state:",
          "N: pos_int",
          "x: pos_real",
          "y: pos_real",
          "hk: Bounded(k)",
          "h1: x <= 2*N**2",
          "h2: y < 3*N*k",
          "|- Theta(x)*Theta(y) <= Theta(N)**4",
          ">>> p.use(LogLinarith(verbose=True))",
          "Identified the following disjunctions of asymptotic inequalities that we need to obtain a contradiction from:",
          "['Theta(N)**1 >= Theta(1)]",
          "['Theta(x)**1 * Theta(N)**-2 <= Theta(1)]",
          "['Theta(k)**1 >= Theta(1)]",
          "['Theta(x)**1 * Theta(y)**1 * Theta(N)**-4 > Theta(1)]",
          "['Theta(y)**1 * Theta(N)**-1 * Theta(k)**-1 <= Theta(1)]",
          "['Theta(k)**1 <= Theta(1)']",
          "Checking feasibility of the following inequalities:",
          "Theta(N)**1 >= Theta(1)",
          "Theta(x)**1 * Theta(N)**-2 <= Theta(1)",
          "Theta(k)**1 >= Theta(1)",
          "Theta(x)**1 * Theta(y)**1 * Theta(N)**-4 > Theta(1)",
          "Theta(y)**1 * Theta(N)**-1 * Theta(k)**-1 <= Theta(1)",
          "Theta(k)**1 <= Theta(1)",
          "Infeasible by multiplying the following:",
          "Theta(N)**1 >= Theta(1) raised to power 1",
          "Theta(x)**1 * Theta(N)**-2 <= Theta(1) raised to power -1",
          "Theta(x)**1 * Theta(y)**1 * Theta(N)**-4 > Theta(1) raised to power 1",
          "Theta(y)**1 * Theta(N)**-1 * Theta(k)**-1 <= Theta(1) raised to power -1",
          "Theta(k)**1 <= Theta(1) raised to power -1",
          "Proof complete!",
        ]}
        problem={{
          variables: [
            {
              name: "N",
              type: "pos_int",
            },
            {
              name: "x",
              type: "pos_real",
            },
            {
              name: "y",
              type: "pos_real",
            },
            {
              name: "k",
              type: "pos_int",
            },
          ],
          assumptions: [
            {
              input: "Bounded(k)",
              name: "hk",
            },
            {
              input: "x <= 2*N**2",
              name: "h1",
            },
            {
              input: "y < 3*N*k",
              name: "h2",
            },
          ],
          goal: {
            input: "lesssim(x*y, N**4)",
          },
        }}
      />
      <p>
        Here is a list of the commands that one can use to manipulate orders of
        magnitude:
      </p>
      <ul>
        <li>
          <LatexString latex="Theta(expr) -> OrderOfMagnitude" />: Returns the
          order of magnitude associated to a non-negative quantity `expr`.
        </li>
        <li>
          <LatexString latex="Theta(expr) -\> OrderOfMagnitude" />: Returns the
          order of magnitude associated to a non-negative quantity `expr`.
        </li>
        <li>
          <LatexString latex="Fixed(expr:Expr)" />: Marks an expression as fixed
          (independent of parameters).
        </li>
        <li>
          <LatexString latex="Bounded(expr:Expr)" />: Marks an expression as
          bounded (ranging in a compact set for all choices of parameters).
        </li>
        <li>
          <LatexString latex="is_fixed(expr:Expr, hypotheses:set[Basic]) -> Bool" />
          : Tests if an expression is fixed, given the known hypotheses.
        </li>
        <li>
          <LatexString latex="is_bounded(expr:Expr, hypotheses:set[Basic]) -> Bool" />
          : Tests if an expression is bounded, given the known hypotheses.
        </li>
      </ul>
    </TutorialArticle>
  );
}
