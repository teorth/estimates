import {
  BaseEdge,
  MarkerType,
  getBezierPath,
  getSimpleBezierPath,
} from "@xyflow/react";

import { EdgeLabelRenderer } from "@xyflow/react";
import { PencilIcon } from "lucide-react";
import { removeEdge, selectNodes } from "../../features/proof/proofSlice";
import { TACTIC_NODE_TYPE } from "../../metadata/graph";
import { useAppDispatch, useAppSelector } from "../../store";
import TacticPopover from "../TacticPopover";
import LatexString from "./LatexString";

export default function TacticEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  source,
  target,
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  data: { tactic: string };
  source: string;
  target: string;
}) {
  const appDispatch = useAppDispatch();
  const handleRemoveEdge = (edgeId: string) => appDispatch(removeEdge(edgeId));
  const nodes = useAppSelector(selectNodes);
  const targetNode = nodes.find((node) => node.id === target);

  const [edgePath, labelX, labelY] =
    targetNode?.type === TACTIC_NODE_TYPE
      ? getBezierPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
        })
      : getSimpleBezierPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
        });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={MarkerType.ArrowClosed} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="bg-white rounded-md px-2 py-1"
          type="button"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs">{data.tactic?.replace("_", " ")}</span>
            <div className="text-xs absolute -right-4 top-1/2 -translate-y-3 flex items-center gap-1/2 justify-center">
              <TacticPopover nodeId={source}>
                <PencilIcon className="w-2 h-2 cursor-pointer hover:text-blue-500" />
              </TacticPopover>
              <button
                type="button"
                className="text-xs cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveEdge(id);
                }}
              >
                <LatexString latex="-" />
              </button>
            </div>
          </div>
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
