import { ReactFlowProvider } from "@xyflow/react";
import type React from "react";
import Estimates from "./Estimates";
import "../style.css";

function App(): React.ReactElement {
  return (
    <ReactFlowProvider>
      <Estimates />
    </ReactFlowProvider>
  );
}

export default App;
