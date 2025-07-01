import classNames from "classnames";
import { useMemo } from "react";
import {
  type Goal,
  type Relation,
  type Variable,
  addVariables,
  applyTactic,
  loadProblem,
  selectEdges,
  selectNodes,
  selectVariables,
  setAssumptions,
  setGoal,
  setVariables,
} from "../../features/proof/proofSlice";
import { selectProofComplete } from "../../features/pyodide/pyodideSlice";
import { selectIsMobile, setMode } from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button } from "../Button";

export default function TutorialExample({
  lines,
  problem,
  tactic,
  variables,
  assumptions,
  goal,
}: {
  lines: string[];
  problem?: {
    variables: Variable[];
    assumptions: Relation[];
    goal: Goal;
  };
  tactic?: {
    target: string;
    position: "last";
  };
  variables?: Variable[];
  assumptions?: Relation[];
  goal?: Goal;
}) {
  const appDispatch = useAppDispatch();
  const proofSolved = useAppSelector(selectProofComplete);
  const nodes = useAppSelector(selectNodes);
  const edges = useAppSelector(selectEdges);
  const existingVariables = useAppSelector(selectVariables);
  const isMobile = useAppSelector(selectIsMobile);

  const targetNode = useMemo(() => {
    if (!tactic) {
      return null;
    }

    const incompleteNodes = nodes.filter((node) => {
      const outboundEdge = edges.find((edge) => edge.source === node.id);
      return !outboundEdge;
    });
    if (tactic.position === "last") {
      return incompleteNodes[incompleteNodes.length - 1];
    }
  }, [tactic, nodes, edges]);

  return (
    <div className="relative">
      {problem && (
        <Button
          className={classNames(
            "absolute top-2 right-2 text-sm text-gray-800",
            isMobile ? "block" : "hidden md:block",
          )}
          onClick={() => {
            appDispatch(loadProblem(problem));
            const target = targetNode?.id;
            if (!target) {
              return;
            }
            if (tactic) {
              appDispatch(
                applyTactic({
                  nodeId: target,
                  tactic: tactic.target,
                  isLemma: false,
                }),
              );
            }
            appDispatch(setMode("tactics"));
          }}
        >
          Load problem
        </Button>
      )}
      {tactic && !problem && (
        <Button
          className={classNames(
            "absolute top-2 right-2 text-sm text-gray-800",
            isMobile ? "block" : "hidden md:block",
          )}
          onClick={() => {
            const target = targetNode?.id;
            if (!target) {
              return;
            }
            appDispatch(
              applyTactic({
                nodeId: target,
                tactic: tactic.target,
                isLemma: false,
              }),
            );
            appDispatch(setMode("tactics"));
          }}
          disabled={proofSolved}
        >
          Apply tactic
        </Button>
      )}
      {variables && (
        <Button
          className={classNames(
            "absolute top-2 right-2 text-sm text-gray-800",
            isMobile ? "block" : "hidden md:block",
          )}
          onClick={() => {
            if (
              existingVariables.filter((variable) => variable.name).length > 0
            ) {
              appDispatch(addVariables(variables));
            } else {
              appDispatch(setVariables(variables));
            }
          }}
          disabled={proofSolved}
        >
          Add variables
        </Button>
      )}
      {assumptions && (
        <Button
          className={classNames(
            "absolute top-2 right-2 text-sm text-gray-800",
            isMobile ? "block" : "hidden md:block",
          )}
          onClick={() => {
            appDispatch(setAssumptions(assumptions));
          }}
          disabled={proofSolved}
        >
          Add assumptions
        </Button>
      )}
      {goal && (
        <Button
          className={classNames(
            "absolute top-2 right-2 text-sm text-gray-800",
            isMobile ? "block" : "hidden md:block",
          )}
          onClick={() => {
            appDispatch(setGoal(goal));
          }}
          disabled={proofSolved}
        >
          Add goal
        </Button>
      )}
      <pre>
        <code>
          {lines
            .map((line) =>
              line
                .replace(/\&lt;/g, "<")
                .replace(/\&gt;/g, ">")
                .replace(/\&amp;/g, "&"),
            )
            .join("\n")}
        </code>
      </pre>
    </div>
  );
}
