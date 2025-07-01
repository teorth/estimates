import type { Goal, Relation, Variable } from "../features/proof/proofSlice";

export type Problem = {
  variables: Variable[];
  assumptions: Relation[];
  goal: Goal;
  label: string;
  description: string;
};
export const SAMPLE_PROBLEMS: Problem[] = [
  {
    variables: [{ name: "x", type: "real" }],
    assumptions: [
      {
        name: "h1",
        input: "x >= 0",
      },
    ],
    goal: {
      input: "x >= 0",
    },
    label: "Trivial",
    description: "A problem demonstrating the Trivial tactic",
  },
  {
    variables: [
      { name: "x", type: "pos_real" },
      { name: "y", type: "pos_real" },
      { name: "z", type: "pos_real" },
    ],
    assumptions: [
      {
        name: "h1",
        input: "x < 2*y",
      },
      {
        name: "h2",
        input: "y < 3*z + 1",
      },
    ],
    goal: {
      input: "x < 7*z + 2",
    },
    label: "Linear Arithmetic",
    description: "Solve a simple linear arithmetic problem",
  },
  {
    variables: [
      { name: "x", type: "pos_real" },
      { name: "y", type: "pos_real" },
      { name: "z", type: "pos_real" },
    ],
    assumptions: [
      {
        name: "h1",
        input: "x < 2*y",
      },
      {
        name: "h2",
        input: "y < 3*z + 1",
      },
    ],
    goal: {
      input: "x < 7*z",
    },
    label: "Impossible Linear Arithmetic",
    description:
      "A problem that cannot be solved via linear arithmetic and has a counterexample",
  },
  {
    variables: [
      { name: "P", type: "bool" },
      { name: "Q", type: "bool" },
      { name: "R", type: "bool" },
      { name: "S", type: "bool" },
    ],
    assumptions: [
      {
        name: "h1",
        input: "Or(P, Q)",
      },
      {
        name: "h2",
        input: "Or(R, S)",
      },
    ],
    goal: {
      input: "Or(And(P, R), And(P, S), And(Q, R), And(Q, S))",
    },
    label: "Cases",
    description:
      "A problem that requires splitting cases to consider different within a hypothesis",
  },
  {
    variables: [
      { name: "x", type: "nonneg_real" },
      { name: "y", type: "nonneg_real" },
    ],
    assumptions: [],
    goal: {
      input: "2*x*y <= x**2 + y**2",
    },
    label: "Apply lemmas",
    description:
      "A problem that requires applying multiple lemmas to solve, specifically the AM-GM inequality",
  },
  {
    variables: [
      { name: "x", type: "real" },
      { name: "y", type: "real" },
    ],
    assumptions: [
      {
        name: "h1",
        input: "And(x > -1, x < 1)",
      },
      {
        name: "h2",
        input: "And(y > -2, y < 2)",
      },
    ],
    goal: {
      input: "And(x + y > -3, x + y < 3)",
    },
    label: "Split Hypotheses",
    description: "A problem that requires splitting hypotheses to solve",
  },
  {
    variables: [
      { name: "N", type: "pos_int" },
      { name: "k", type: "pos_int" },
      { name: "x", type: "pos_real" },
      { name: "y", type: "pos_real" },
    ],
    assumptions: [
      {
        name: "hk",
        input: "Bounded(k)",
      },
      {
        name: "h1",
        input: "x <= 2*N**2",
      },
      {
        name: "h2",
        input: "y < 3*k*N",
      },
    ],
    goal: {
      input: "lesssim(x * y, N**4)",
    },
    label: "Orders of Magnitude",
    description: "A problem involving large numbers and orders of magnitude",
  },
  {
    variables: [
      { name: "x", type: "real" },
      { name: "y", type: "real" },
    ],
    assumptions: [
      {
        name: "h1",
        input: "x >= 0",
      },
    ],
    goal: {
      input: "x**2 + y**2 >= 0",
    },
    label: "Apply lemma",
    description: "Apply a lemma to the problem",
  },
  {
    variables: [
      { name: "x", type: "real" },
      { name: "y", type: "real" },
    ],
    assumptions: [],
    goal: {
      input:
        "Theta(x**2*y**2 + 1)**1/2 <= Theta(x**2 + 1)**1/2*Theta(y**2 + 1)**1/2",
    },
    label: "ByCases Example",
    description: "A problem demonstrating the ByCases tactic with equality",
  },
  {
    variables: [
      { name: "x", type: "real" },
      { name: "y", type: "real" },
    ],
    assumptions: [
      {
        name: "h1",
        input: "x >= 0",
      },
    ],
    goal: {
      input: "Min(x, y) <= Max(x, y)",
    },
    label: "Option Example",
    description: "A problem demonstrating the Option tactic with min/max",
  },
  {
    variables: [
      { name: "x", type: "real" },
      { name: "y", type: "real" },
    ],
    assumptions: [],
    goal: {
      input: "And(x + y > -3, x + y < 3)",
    },
    label: "Split Example",
    description: "A problem demonstrating SplitGoal and SplitHyp tactics",
  },
  {
    variables: [
      { name: "x", type: "real" },
      { name: "y", type: "pos_int" },
      { name: "z", type: "pos_int" },
    ],
    assumptions: [],
    goal: {
      input: "Eq(z, 1)",
    },
    label: "Claim Example",
    description: "A problem demonstrating the Claim tactic",
  },
  {
    variables: [
      { name: "x", type: "real" },
      { name: "y", type: "real" },
    ],
    assumptions: [],
    goal: {
      input: "Or(x > 2, y > 3)",
    },
    label: "Contrapose Example",
    description: "A problem demonstrating the Contrapose tactic",
  },
  {
    variables: [
      { name: "x", type: "pos_real" },
      { name: "y", type: "pos_real" },
    ],
    assumptions: [
      {
        name: "h1",
        input: "x >= 0",
      },
    ],
    goal: {
      input: "Or(Eq(x, y), x > y, x < y)",
    },
    label: "Contrapose Contradiction",
    description:
      "A problem demonstrating proof by contradiction with Contrapose",
  },
];
