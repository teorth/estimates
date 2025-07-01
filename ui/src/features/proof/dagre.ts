import type { Edge, Node } from "@xyflow/react";
import Dagre from "dagre";

const DEFAULT_VERTICAL_BETWEEN_NODES = 250;
const DEFAULT_HORIZONTAL_BETWEEN_NODES = 500;

export const layoutGraphElements = (
  nodes: Node[],
  edges: Edge[],
  options: { direction: "TB" | "LR" | "BT" } = { direction: "TB" },
) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: options.direction,
    nodesep: DEFAULT_HORIZONTAL_BETWEEN_NODES,
    ranksep: DEFAULT_VERTICAL_BETWEEN_NODES,
  });

  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }
  for (const node of nodes) {
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    });
  }
  Dagre.layout(g);
  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;
      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
