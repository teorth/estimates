import classNames from "classnames";
import { ChevronDown, Plus, X } from "lucide-react";
import { useState } from "react";
import {
  addAssumption,
  selectAssumptions,
  setAssumptions,
} from "../../../features/proof/proofSlice";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Button } from "../../Button";
import { Card } from "../../Card";
import { Input } from "../../Input";
import { TypographyH3 } from "../../Typography";

export default function HypothesesForm() {
  const [showHypothesisForm, setShowHypothesisForm] = useState(false);
  const [newHypothesis, setNewHypothesis] = useState({
    expression: "",
    label: "",
  });
  const relations = useAppSelector(selectAssumptions);
  const appDispatch = useAppDispatch();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <TypographyH3>Hypotheses</TypographyH3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHypothesisForm(!showHypothesisForm)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Hypothesis
          <ChevronDown
            className={classNames(
              "h-4 w-4 ml-1 transition-transform",
              showHypothesisForm && "rotate-180",
            )}
          />
        </Button>
      </div>
      <div className="space-y-2 mb-3">
        {relations.map((relation) => (
          <div
            key={relation.name}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200"
          >
            <span className="font-mono text-sm flex-1">
              {relation.name}: {relation.input}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                appDispatch(
                  setAssumptions(
                    relations.filter((r) => r.name !== relation.name),
                  ),
                )
              }
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
      {showHypothesisForm && (
        <Card className="p-4">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="hypothesis-expression"
                className="text-sm font-medium mb-1 block"
              >
                Expression
              </label>
              <Input
                placeholder="e.g., x + y > 0"
                value={newHypothesis.expression}
                onChange={(e) =>
                  setNewHypothesis({
                    ...newHypothesis,
                    expression: e.target.value,
                  })
                }
                id="hypothesis-expression"
              />
            </div>
            <div>
              <label
                htmlFor="hypothesis-label"
                className="text-sm font-medium mb-1 block"
              >
                Label
              </label>
              <Input
                placeholder="e.g., h1, assumption1"
                value={newHypothesis.label}
                onChange={(e) =>
                  setNewHypothesis({ ...newHypothesis, label: e.target.value })
                }
                id="hypothesis-label"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  appDispatch(
                    addAssumption({
                      input: newHypothesis.expression,
                      name: newHypothesis.label,
                    }),
                  );
                  setNewHypothesis({ expression: "", label: "" });
                  setShowHypothesisForm(false);
                }}
                disabled={
                  !newHypothesis.expression.trim() ||
                  !newHypothesis.label.trim()
                }
              >
                Add Hypothesis
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHypothesisForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
