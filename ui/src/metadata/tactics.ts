import LEMMA_JSON from "./lemmas.json" assert { type: "json" };
import TACTIC_JSON from "./tactics.json" assert { type: "json" };

type TacticOrLemma = {
  id: string;
  label: string;
  description: string;
  className: string;
  arguments: (
    | "variables"
    | "hypotheses"
    | "verbose"
    | "this"
    | "expressions"
  )[];
  placeholder?: string;
  type: "tactic" | "lemma";
};
export type Tactic = TacticOrLemma & {
  type: "tactic";
};
export type Lemma = TacticOrLemma & {
  type: "lemma";
};

export const AVAILABLE_TACTICS: Tactic[] = TACTIC_JSON.map((tactic) => ({
  ...(tactic as Tactic),
  type: "tactic",
}));

export const AVAILABLE_LEMMAS: Lemma[] = LEMMA_JSON.map((lemma) => ({
  ...(lemma as Lemma),
  type: "lemma",
}));
