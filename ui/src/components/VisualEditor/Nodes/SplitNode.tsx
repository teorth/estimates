import { Handle, Position } from "@xyflow/react";

export default function SplitNode({ id }: { id: string }) {
  return (
    <div>
      <div className="w-2 h-2 rounded-full bg-gray-800" />
      <Handle
        type="target"
        position={Position.Top}
        id={`${id}-top`}
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${id}-bottom`}
        className="opacity-0"
      />
    </div>
  );
}
