import { Handle, Position } from "@xyflow/react";
import classNames from "classnames";
import { useMemo } from "react";
import RenderedNodeText from "./RenderedNodeText";
import { parseNodeState } from "./nodeStateHelpers";

export default function GoalNode({
  id,
  data,
}: { id: string; data: { label: string } }) {
  const { goal } = useMemo(() => parseNodeState(data.label), [data.label]);
  return (
    <>
      <div
        className={classNames(
          "goalnode border rounded-md p-2 max-w-80 items-center justify-center text-center border-green-800",
        )}
      >
        <RenderedNodeText text={goal} />
      </div>
      <Handle type="target" position={Position.Top} id={`${id}-top`} />
    </>
  );
}
