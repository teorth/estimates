import { SUPPORTED_VARIABLE_TYPES } from "../../../metadata/variables";

export const parseNodeState = (nodeState: string) => {
  if (!nodeState) {
    return { variables: [], hypotheses: [], goal: "" };
  }
  const parts = nodeState.split("|-");
  const variablesAndHypotheses = parts[0];
  const goal = parts[1];
  const variablePattern = SUPPORTED_VARIABLE_TYPES.map((t) => t.name).join("|");
  const variableRegex = new RegExp(`(${variablePattern})`, "g");

  const [variables, hypotheses] = variablesAndHypotheses.split("\n").reduce(
    ([vars, hyps], line) => {
      if (line.match(variableRegex)) {
        vars.push(line);
      } else {
        if (line.trim()) {
          hyps.push(line);
        }
      }
      return [vars, hyps];
    },
    [[], []] as [string[], string[]],
  );
  return { variables, hypotheses, goal };
};
