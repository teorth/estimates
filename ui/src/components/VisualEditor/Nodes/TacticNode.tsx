import { Handle, Position } from "@xyflow/react";
import classNames from "classnames";
import { useMemo } from "react";
import { selectEdges } from "../../../features/proof/proofSlice";
import { useAppSelector } from "../../../store";
import { Button } from "../../Button";
import TacticPopover from "../../TacticPopover";
import LatexString from "../LatexString";
import RenderedNodeText from "./RenderedNodeText";
import { parseNodeState } from "./nodeStateHelpers";

export default function TacticNode({
  id,
  data,
}: {
  id: string;
  data: {
    label: string;
    sorryFree: boolean;
  };
}) {
  const simplifiedResult = data.label;

  const edges = useAppSelector(selectEdges);
  const outboundEdge = edges.find((edge) => edge.source === id);
  const isSourceNode = edges.some((edge) => edge.target === id);

  const { variables, hypotheses, goal } = useMemo(
    () => parseNodeState(simplifiedResult),
    [simplifiedResult],
  );

  return (
    <div className="flex flex-col gap-2">
      {isSourceNode && (
        <Handle type="target" position={Position.Top} id={`${id}-top`} />
      )}
      {simplifiedResult ? (
        <div
          className={classNames(
            "border rounded-md p-2 flex flex-col gap-2 max-w-64 px-4 text-xs",
            {
              "border-green-800": data.sorryFree,
              "border-yellow-300": !data.sorryFree,
            },
          )}
        >
          <RenderedNodeText text={variables.join(", ")} />
          {hypotheses.map((line) => (
            <RenderedNodeText key={line} text={line} />
          ))}
          <RenderedNodeText text={`|- ${goal}`} />
        </div>
      ) : (
        <div className="border border-gray-300 rounded-md p-2 w-48 items-center justify-center text-center">
          <div className="animate-pulse flex flex-col gap-2">
            <div className="h-2 bg-gray-200 rounded w-3/4" />
            <div className="h-2 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      )}
      {outboundEdge && (
        <Handle
          type="source"
          position={Position.Bottom}
          id={`${id}-tactic-bottom`}
        />
      )}
      {!outboundEdge && (
        <TacticPopover nodeId={id}>
          <Button variant="outline" size="xs">
            <LatexString latex="+" /> Apply tactic
          </Button>
        </TacticPopover>
      )}
    </div>
  );
}
