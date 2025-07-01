import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import type { WritableDraft } from "immer";
import { v4 as uuidv4 } from "uuid";
import {
  GOAL_EDGE_TYPE,
  GOAL_NODE_TYPE,
  SPLIT_EDGE_TYPE,
  SPLIT_NODE_TYPE,
  TACTIC_EDGE_TYPE,
  TACTIC_NODE_TYPE,
} from "../../metadata/graph";
import type { VariableType } from "../../metadata/variables";
import type { RootState } from "../../store";
import { runProofCode } from "../pyodide/pyodideSlice";
import { CODE_EDIT_MODE } from "../ui/uiSlice";
import { layoutGraphElements } from "./dagre";

export type Variable = {
  name: string;
  type: VariableType;
};

export type Relation = {
  input: string;
  name: string;
};

export type Goal = {
  input: string;
};

interface ProofState {
  nodes: Node[];
  edges: Edge[];
  variables: Variable[];
  goal: Goal;
  assumptions: Relation[];
}

const initialState: ProofState = {
  nodes: [],
  edges: [],
  variables: [
    {
      name: "x",
      type: "nonneg_real",
    },
    {
      name: "y",
      type: "nonneg_real",
    },
    {
      name: "z",
      type: "nonneg_real",
    },
  ],
  assumptions: [
    {
      input: "x < 2*y",
      name: "h1",
    },
    {
      input: "y < 3*z + 1",
      name: "h2",
    },
  ],
  goal: {
    input: "x < 7 * z + 2",
  },
};

export const proofSlice = createSlice({
  name: "proof",
  initialState,
  reducers: {
    setVariables: (state, action: PayloadAction<Variable[]>) => {
      state.variables = action.payload;
    },
    addVariables: (state, action: PayloadAction<Variable[]>) => {
      state.variables = [...state.variables, ...action.payload];
    },
    setAssumptions: (state, action: PayloadAction<Relation[]>) => {
      state.assumptions = action.payload;
    },
    addAssumption: (state, action: PayloadAction<Relation>) => {
      state.assumptions = [...state.assumptions, action.payload];
    },
    setGoal: (state, action: PayloadAction<Goal>) => {
      state.goal = action.payload;
    },
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      const edgeId = action.payload;
      const edgeToRemove = state.edges.find((e) => e.id === edgeId);
      const edgeSource = edgeToRemove?.source;
      if (!edgeSource) {
        return;
      }

      const otherEdgesToRemove = state.edges.filter(
        (e) =>
          edgeToRemove?.data?.resolutionId &&
          e.data?.resolutionId === edgeToRemove?.data?.resolutionId,
      );
      const edgeIdsToRemove = [...otherEdgesToRemove, edgeToRemove].map(
        (e) => e?.id,
      );

      const target = state.nodes.find((n) => n.id === edgeToRemove?.target);
      const newEdges = state.edges.filter(
        (e) => !edgeIdsToRemove.includes(e.id),
      );
      const newNodes = state.nodes.filter((n) => n.id !== target?.id);

      state.edges = newEdges;
      state.nodes = newNodes;
    },
    resetProof: (state) => {
      const sourceNode = state.nodes.find(
        (node) => !state.edges.some((edge) => edge.target === node.id),
      );
      if (!sourceNode) {
        return;
      }
      state.nodes = [sourceNode];
      state.edges = [];
    },
    loadProblem: (
      state,
      action: PayloadAction<{
        variables: Variable[];
        assumptions: Relation[];
        goal: Goal;
      }>,
    ) => {
      state.nodes = initialState.nodes as WritableDraft<Node[]>;
      state.edges = initialState.edges;
      state.variables = action.payload.variables;
      state.assumptions = action.payload.assumptions;
      state.goal = action.payload.goal;
    },
    applyTactic: (
      state,
      action: PayloadAction<{
        nodeId: string;
        tactic: string;
        isLemma: boolean;
      }>,
    ) => {
      const newNodeId = uuidv4();
      const newNodes = [
        // update the node we're applying tactic to with the applied tactic to store what we did to it
        ...state.nodes.map((n) =>
          n.id === action.payload.nodeId
            ? {
                ...n,
                data: { ...n.data, appliedTactic: action.payload.tactic },
              }
            : n,
        ),

        // add new node for the tactic
        {
          id: newNodeId,
          data: {
            selected: true,
            isLemma: action.payload.isLemma,
          },
          type: TACTIC_NODE_TYPE,
          position: { x: 0, y: 0 },
          deletable: false,
        },
      ];

      const edgeId = `${action.payload.nodeId}_${newNodeId}`;

      const newEdges = [
        // remove edges coming out of node we're applying tactic to
        ...state.edges.filter((edge) => edge.source !== action.payload.nodeId),
        {
          id: edgeId,
          source: action.payload.nodeId,
          target: newNodeId,
          type: TACTIC_EDGE_TYPE,
          data: {
            tactic: action.payload.tactic,
            isLemma: action.payload.isLemma,
            resolved: false,
          },
          deletable: false,
        },
      ];

      const layoutResult = layoutGraphElements(newNodes, newEdges);
      state.nodes = layoutResult.nodes as WritableDraft<Node[]>;
      state.edges = layoutResult.edges;
    },
    fixLayout: (state) => {
      const layoutResult = layoutGraphElements(state.nodes, state.edges);
      state.nodes = layoutResult.nodes as WritableDraft<Node[]>;
      state.edges = layoutResult.edges;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(runProofCode.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      const {
        result: pyodideResult,
        error: pyodideError,
        editMode,
      } = action.payload;

      if (editMode === CODE_EDIT_MODE) {
        return;
      }

      if (!pyodideResult || pyodideError) {
        return;
      }
      if (pyodideResult.error) {
        return;
      }
      const pyodideNodes = pyodideResult.output?.nodes;
      const pyodideEdges = pyodideResult.output?.edges || [];

      const flowEdges: Edge[] = [];
      const flowNodes: Node[] = [];

      const recentUnappliedTacticEdge = state.edges.find(
        (e) => e.data?.resolved === false,
      );
      const recentUnappliedTactic = recentUnappliedTacticEdge?.data?.tactic;

      for (const n of pyodideNodes || []) {
        const existingNode = state.nodes.find((node) => node.id === n.id);
        const edgesFromNode = pyodideEdges.filter((e) => e.source === n.id);

        flowNodes.push({
          id: n.id,
          position: {
            x: 0,
            y: 0,
          },
          deletable: false,
          type: TACTIC_NODE_TYPE,
          data: {
            label: n.label,
            sorryFree: n.sorry_free,
            nChildren: n.n_children,
            appliedTactic: existingNode?.data.appliedTactic,
          },
        });

        if (edgesFromNode.length > 1) {
          flowNodes.push({
            id: `${n.id}-split`,
            position: {
              x: 0,
              y: 0,
            },
            deletable: false,
            type: SPLIT_NODE_TYPE,
            data: {
              label: n.label,
              sorryFree: n.sorry_free,
              nChildren: n.n_children,
              appliedTactic: existingNode?.data.appliedTactic,
            },
          });
          flowEdges.push({
            id: `${n.id}-split`,
            source: n.id,
            target: `${n.id}-split`,
            type: TACTIC_EDGE_TYPE,
            data: {
              tactic: existingNode?.data.appliedTactic,
              isLemma: existingNode?.data.isLemma,
              resolved: true,
            },
            deletable: false,
          });
        }

        if (!edgesFromNode.length) {
          if (n.sorry_free) {
            const subProblemGoalNode = {
              id: `${n.id}-goal`,
              position: {
                x: 0,
                y: 0,
              },
              deletable: false,
              type: GOAL_NODE_TYPE,
              data: {
                label: n.label,
              },
            };
            flowNodes.push(subProblemGoalNode);

            flowEdges.push({
              id: `${n.id}-goal`,
              source: n.id,
              target: subProblemGoalNode.id,
              type: GOAL_EDGE_TYPE,
              data: {
                tactic:
                  recentUnappliedTactic || existingNode?.data.appliedTactic,
                resolved: true,
              },
              deletable: false,
            });
          }
        }
      }

      const resolutionId = uuidv4();
      for (const e of pyodideEdges) {
        const edgeId = `${e.source}_${e.target}`;
        const existingEdge = state.edges.find(
          (edge) => edge.id === `${e.source}_${e.target}`,
        );

        if (!existingEdge && !recentUnappliedTacticEdge) {
          continue;
        }

        const tactic = existingEdge?.data?.tactic || recentUnappliedTactic;
        const isLemma =
          existingEdge?.data?.isLemma ||
          recentUnappliedTacticEdge?.data?.isLemma ||
          false;

        const isSplitSource =
          pyodideEdges.filter((otherEdge) => otherEdge.source === e.source)
            .length > 1;
        flowEdges.push({
          id: edgeId,
          source: isSplitSource ? `${e.source}-split` : e.source,
          target: e.target,
          type: isSplitSource ? SPLIT_EDGE_TYPE : TACTIC_EDGE_TYPE,
          data: {
            tactic,
            resolutionId: existingEdge?.data?.resolutionId || resolutionId,
            isLemma,
          },
          deletable: false,
        });
      }
      const layoutResult = layoutGraphElements(flowNodes, flowEdges);
      state.nodes = layoutResult.nodes as WritableDraft<Node[]>;
      state.edges = layoutResult.edges;
    });
  },
});

export const {
  onNodesChange,
  onEdgesChange,
  removeEdge,
  resetProof,
  addAssumption,
  loadProblem,
  setVariables,
  setAssumptions,
  setGoal,
  applyTactic,
  fixLayout,
  addVariables,
} = proofSlice.actions;

export const selectNodes = (state: RootState) => state.proof.nodes;
export const selectEdges = (state: RootState) => state.proof.edges;
export const selectNodeById = (id: string) => (state: RootState) =>
  state.proof.nodes.find((node) => node.id === id);
export const selectEdgesFromNode = (id: string) => (state: RootState) =>
  state.proof.edges.filter((edge) => edge.source === id);
export const selectVariables = (state: RootState) => state.proof.variables;
export const selectAssumptions = (state: RootState) => state.proof.assumptions;
export const selectGoal = (state: RootState) => state.proof.goal;

export default proofSlice.reducer;
