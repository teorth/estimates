import { useRef } from "react";
import { useState } from "react";
import { selectGoal, setGoal } from "../../../features/proof/proofSlice";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { TypographyH3 } from "../../Typography";

const GOAL_OPERATIONS = [
  { code: "And" },
  { code: "Or" },
  { code: "Not" },
  { code: "Implies" },
  { code: "Eq" },
  { code: "Eq" },
  { code: "NotEq" },
  { code: "Lt" },
  { code: "Gt" },
  { code: "Leq" },
  { code: "Geq" },
  { code: "ForAll" },
  { code: "Exists" },
];

export default function GoalForm() {
  const [goalFieldFocused, setGoalFieldFocused] = useState(false);
  const goalInputRef = useRef<HTMLInputElement>(null);
  const appDispatch = useAppDispatch();
  const goal = useAppSelector(selectGoal);

  const insertCodeAtCursor = (symbol: string) => {
    const input = goalInputRef.current;
    if (!input) {
      return;
    }
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const newGoal = goal.input.slice(0, start) + symbol + goal.input.slice(end);
    appDispatch(setGoal({ input: newGoal }));
    const newCursorPos = start + symbol.length;
    input.setSelectionRange(newCursorPos, newCursorPos);
    input.focus();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <TypographyH3>Goal</TypographyH3>
      </div>
      <div className="grid grid-cols-3 w-full items-center gap-1.5 relative">
        <Input
          required
          id="goal"
          placeholder="x_1, x_2, ..."
          value={goal.input}
          onChange={(e) =>
            appDispatch(setGoal({ ...goal, input: e.target.value }))
          }
          className="col-span-3 lg:col-span-6 xl:col-span-3"
          onFocus={() => setGoalFieldFocused(true)}
          onBlur={() => setGoalFieldFocused(false)}
          ref={goalInputRef}
        />
        {goalFieldFocused && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
            <div className="text-xs text-gray-500 mb-2 px-1">
              Insert symbols:
            </div>
            <div className="flex flex-wrap gap-1">
              {GOAL_OPERATIONS.map((item) => (
                <Button
                  key={item.code}
                  variant="ghost"
                  size="sm"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    insertCodeAtCursor(item.code);
                  }}
                >
                  {item.code.trim()}
                </Button>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2 px-1">
              Click on an operation to add it to the goal
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
