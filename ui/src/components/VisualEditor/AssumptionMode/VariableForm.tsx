import { X } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { addVariables } from "../../../features/proof/proofSlice";
import { setVariables } from "../../../features/proof/proofSlice";
import { selectVariables } from "../../../features/proof/proofSlice";
import {
  SUPPORTED_VARIABLE_TYPES,
  type VariableType,
} from "../../../metadata/variables";
import { useAppSelector } from "../../../store";
import { useAppDispatch } from "../../../store";
import { Button } from "../../Button";
import { Card } from "../../Card";
import { Input } from "../../Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Select";
import { TypographyH3 } from "../../Typography";
import LatexString from "../LatexString";

export default function VariableForm() {
  const [showVariableForm, setShowVariableForm] = useState(false);
  const variables = useAppSelector(selectVariables);
  const appDispatch = useAppDispatch();
  const [newVariable, setNewVariable] = useState({
    name: "",
    type: "real",
  });

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <TypographyH3>Variables</TypographyH3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowVariableForm(!showVariableForm)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Variable
          <ChevronDown
            className={`h-4 w-4 ml-1 transition-transform ${showVariableForm ? "rotate-180" : ""}`}
          />
        </Button>
      </div>
      <div className="space-y-2 mb-3">
        {variables.map((variable) => (
          <div
            key={variable.name}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200"
          >
            <span className="font-mono text-sm flex-1">
              {variable.name}:{" "}
              <LatexString
                latex={
                  SUPPORTED_VARIABLE_TYPES.find(
                    (type) => type.name === variable.type,
                  )?.symbol || ""
                }
              />
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() =>
                appDispatch(
                  setVariables(
                    variables.filter((v) => v.name !== variable.name),
                  ),
                )
              }
              disabled={variables.length === 1}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
      {showVariableForm && (
        <Card className="p-4">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="variable-name"
                className="text-sm font-medium mb-1 block"
              >
                Expression
              </label>
              <Input
                placeholder="e.g., x, y, z"
                value={newVariable.name}
                onChange={(e) =>
                  setNewVariable({ ...newVariable, name: e.target.value })
                }
                id="variable-name"
              />
            </div>
            <div>
              <label
                htmlFor="variable-type"
                className="text-sm font-medium mb-1 block"
              >
                Type
              </label>
              <Select
                value={newVariable.type}
                onValueChange={(value) =>
                  setNewVariable({ ...newVariable, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue id="variable-type" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_VARIABLE_TYPES.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.description} (
                      <LatexString latex={`${type.symbol}`} />)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  appDispatch(
                    addVariables([
                      {
                        name: newVariable.name,
                        type: newVariable.type as VariableType,
                      },
                    ]),
                  );
                  setNewVariable({ name: "", type: "real" });
                  setShowVariableForm(false);
                }}
                disabled={!newVariable.name.trim()}
              >
                Add Variable
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVariableForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
