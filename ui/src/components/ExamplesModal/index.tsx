import cn from "classnames";
import { useState } from "react";
import { loadProblem } from "../../features/proof/proofSlice";
import {
  selectShowExamplesModal,
  setShowExamplesModal,
} from "../../features/ui/uiSlice";
import { setMode } from "../../features/ui/uiSlice";
import { type Problem, SAMPLE_PROBLEMS } from "../../metadata/sampleProblems";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button } from "../Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../Dialog";
import RenderedNodeText from "../VisualEditor/Nodes/RenderedNodeText";

export default function ExamplesModal() {
  const open = useAppSelector(selectShowExamplesModal);
  const dispatch = useAppDispatch();
  const toggleOpen = () => dispatch(setShowExamplesModal(!open));

  const [selectedProblem, setSelectedProblem] = useState<Problem>(
    SAMPLE_PROBLEMS[0],
  );

  const onClickLoadProblem = () => {
    dispatch(
      loadProblem({
        variables: selectedProblem.variables,
        assumptions: selectedProblem.assumptions,
        goal: selectedProblem.goal,
      }),
    );
    dispatch(setMode("tactics"));
    toggleOpen();
  };

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogContent className="sm:max-w-3xl bg-white">
        <DialogHeader>
          <DialogTitle>Sample Problems</DialogTitle>
          <DialogDescription>
            Get started quickly by loading pre-configured sample problems
          </DialogDescription>
        </DialogHeader>
        <div className="flex max-h-[50vh]">
          <div className="flex-1 flex flex-col gap-2 overflow-y-scroll border-r border-gray-200">
            {SAMPLE_PROBLEMS.map((problem) => (
              <button
                key={problem.label}
                className={cn(
                  "flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer text-left",
                  selectedProblem.label === problem.label && "bg-gray-100",
                )}
                onClick={() => setSelectedProblem(problem)}
                type="button"
              >
                <div className="flex flex-col">
                  <div className="font-bold">{problem.label}</div>
                  <div className="text-gray-500 line-clamp-2">
                    {problem.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex-1 py-2 px-4 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">{selectedProblem.label}</div>
              <div className="text-gray-500">{selectedProblem.description}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold">Variables</div>
              <div className="text-gray-500">
                {selectedProblem.variables.map((variable) => (
                  <div key={variable.name}>
                    <RenderedNodeText
                      text={`${variable.name}: ${variable.type}`}
                    />
                  </div>
                ))}
              </div>
              <div className="font-bold">Assumptions</div>
              <div className="text-gray-500">
                {selectedProblem.assumptions.map((assumption) => (
                  <div key={assumption.name}>
                    <RenderedNodeText
                      text={`${assumption.name}: ${assumption.input}`}
                    />
                  </div>
                ))}
              </div>
              <div className="font-bold">Goal</div>
              <div className="text-gray-500">
                <RenderedNodeText text={selectedProblem.goal.input} />
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex flex-col gap-2">
              <Button onClick={onClickLoadProblem} variant="primary">
                Load Problem
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
