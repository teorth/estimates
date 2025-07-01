import { ChevronDown, Play } from "lucide-react";

import classNames from "classnames";
import { Zap } from "lucide-react";
import { convertProofGraphToCode } from "../../features/pyodide/pyodideSlice";
import {
  selectExecutionMode,
  setExecutionMode,
} from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

export default function ExecutionButton() {
  const executionMode = useAppSelector(selectExecutionMode);
  const dispatch = useAppDispatch();

  const handleExecutionButtonClick = () => {
    dispatch(convertProofGraphToCode());
  };

  return (
    <div className="flex">
      <Button
        variant={executionMode === "auto" ? "secondary" : "tertiary"}
        size="sm"
        onClick={handleExecutionButtonClick}
        className="rounded-r-none border-r-0"
      >
        {executionMode === "auto" ? (
          <>
            <Zap className="h-4 w-4 lg:mr-2" />
            <span className="hidden md:inline">Auto-compile</span>
            <span className="md:hidden">Auto</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-2" />
            Compile
          </>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={executionMode === "auto" ? "secondary" : "tertiary"}
            size="sm"
            className={classNames(
              "h-8 w-8 rounded-l-none border-l px-0 focus:ring-0 focus:ring-offset-0",
              {
                "border-l-blue-300": executionMode === "auto",
                "border-l-gray-300": executionMode === "manual",
              },
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuItem
            onClick={() => dispatch(setExecutionMode("auto"))}
            className="flex items-center"
          >
            <Zap className="h-4 w-4 mr-2" />
            <div className="flex flex-col">
              <span>Auto-compile</span>
              <span className="text-xs text-gray-500">
                Run when changes are made
              </span>
            </div>
            {executionMode === "auto" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => dispatch(setExecutionMode("manual"))}
            className="flex items-center"
          >
            <Play className="h-4 w-4 mr-2" />
            <div className="flex flex-col">
              <span>Manually compile</span>
              <span className="text-xs text-gray-500">
                Click to compile and run
              </span>
            </div>
            {executionMode === "manual" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
