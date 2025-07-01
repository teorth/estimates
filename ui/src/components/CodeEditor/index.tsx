import classNames from "classnames";
import { X } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  runProofCode,
  selectCode,
  selectLoading,
  selectProofError,
  selectPyodideLoaded,
  selectSerializedResult,
  selectStdout,
} from "../../features/pyodide/pyodideSlice";
import { setShowCode } from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button } from "../Button";
import LoadingState from "../LoadingState";
import { TypographyH2, TypographyH4 } from "../Typography";
import OutputErrorBoundary from "./OutputErrorBoundary";
import TextEditor from "./TextEditor";

function Output(): React.ReactElement {
  const appDispatch = useAppDispatch();

  const pyodideLoaded = useAppSelector(selectPyodideLoaded);
  const serializedResult = useAppSelector(selectSerializedResult);
  const stdout = useAppSelector(selectStdout);
  const loading = useAppSelector(selectLoading);
  const code = useAppSelector(selectCode);
  const proofError = useAppSelector(selectProofError);

  const [debouncedCode] = useDebounce(code, 200);

  useEffect(() => {
    if (!pyodideLoaded) {
      return;
    }
    if (debouncedCode) {
      appDispatch(runProofCode(debouncedCode));
    }
  }, [pyodideLoaded, debouncedCode, appDispatch]);

  return (
    <div className="absolute md:relative w-full md:w-sm flex-shrink-0 border-l border-gray-200 h-full flex flex-col bg-white z-20">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <TypographyH2>Code and Outputs</TypographyH2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => appDispatch(setShowCode(false))}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-2 flex flex-col">
        {/* Generated Code Section - Much Taller */}
        <div className="flex-1 p-4 flex flex-col gap-2">
          <TypographyH4>Generated Code:</TypographyH4>
          <div className="bg-gray-50 border border-gray-200 rounded h-full overflow-hidden">
            <TextEditor />
          </div>
        </div>
      </div>

      {/* Loading indicator when pyodide is not loaded */}
      <div className="flex-3 flex flex-col overflow-y-auto">
        {!pyodideLoaded && <LoadingState message="Loading estimates..." />}

        {/* Loading indicator when proof is being processed */}
        {loading && <LoadingState message="Processing..." />}

        {/* Console output, things from "print" in Python */}
        {stdout.length > 0 && (
          <div className="p-4 flex flex-col gap-2">
            <TypographyH4>Console Output:</TypographyH4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto border-l-4 border-blue-500 whitespace-pre-wrap break-words">
              {stdout.map((item) => String(item)).join("\n")}
            </pre>
          </div>
        )}

        {/* Return result of the editor, if any */}
        {(serializedResult || proofError) && (
          <div className="p-4 flex flex-col gap-2">
            <TypographyH4>Result:</TypographyH4>
            <pre
              className={classNames(
                "bg-gray-100 p-4 rounded-md text-sm overflow-x-auto border-l-4  whitespace-pre-wrap break-words",
                {
                  "border-green-500": !proofError,
                  "border-red-500": proofError,
                },
              )}
            >
              {serializedResult || proofError}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Wrap our component in an error boundary so that we can catch errors that break out of the editor
 * from Pyodide unexpectedly and enable refreshing the editor.
 */
export default function OutputContainer() {
  return (
    <OutputErrorBoundary>
      <Output />
    </OutputErrorBoundary>
  );
}
