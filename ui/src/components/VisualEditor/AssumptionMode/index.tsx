import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import { addVariables } from "../../../features/proof/proofSlice";
import { useAppDispatch, useAppSelector } from "../../../store";
import GoalForm from "./GoalForm";
import HypothesesForm from "./HypothesesForm";
import VariableForm from "./VariableForm";

export default function AssumptionMode() {
  const appDispatch = useAppDispatch();
  const variables = useAppSelector((state) => state.proof.variables);

  // make sure we always have at least one variable on app start
  useEffect(() => {
    if (variables.length === 0) {
      appDispatch(addVariables([{ name: "x", type: "real" }]));
    }
  }, [variables, appDispatch]);

  return (
    <div className="flex flex-col gap-6 h-full max-w-3xl mx-auto p-12 w-full">
      {/* Set x, y, z, etc */}
      <VariableForm />

      {/* Set h1, h2, etc */}
      <HypothesesForm />

      {/* Set goal Eq(x, y) */}
      <GoalForm />
    </div>
  );
}
