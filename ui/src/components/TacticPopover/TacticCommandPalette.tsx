import classNames from "classnames";
import { useMemo, useState } from "react";
import {
  applyTactic,
  selectAssumptions,
  selectGoal,
  selectVariables,
} from "../../features/proof/proofSlice";
import { selectIsMobile } from "../../features/ui/uiSlice";
import {
  AVAILABLE_LEMMAS,
  AVAILABLE_TACTICS,
  type Lemma,
  type Tactic,
} from "../../metadata/tactics";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button } from "../Button";
import { Input } from "../Input";
import { RadioGroup, RadioGroupItem } from "../RadioGroup";
import LatexString from "../VisualEditor/LatexString";

type Item = Tactic | Lemma;

type SelectedArg = {
  label: string;
  value: string;
  id: string;
};

function TacticSelectListOption({
  item,
  onClick,
  selected,
}: { item: Item; onClick: () => void; selected: boolean }) {
  return (
    <button
      type="button"
      className={classNames(
        "cursor-pointer hover:bg-gray-100 rounded-md p-2 text-left text-sm",
        {
          "bg-gray-100": selected,
        },
      )}
      onClick={onClick}
    >
      <div className="font-bold">{item.label}</div>
    </button>
  );
}

function TacticExpressionInput({
  tacticName,
  placeholder,
  onChange,
  args,
}: {
  tacticName: string;
  placeholder: string;
  args: SelectedArg[];
  onChange: (args: SelectedArg[]) => void;
}) {
  return (
    <div className="flex items-center">
      <span>{tacticName}(</span>
      <Input
        value={args.length > 0 ? args[0].value : ""}
        onChange={(e) =>
          onChange([
            {
              label: e.target.value,
              value: e.target.value,
              id: e.target.value,
            },
          ])
        }
        className="mx-2"
        placeholder={placeholder || "x >= z"}
      />
      <span>)</span>
    </div>
  );
}

function TacticRadioGroup({
  argOptions,
  onChange,
  selected,
}: {
  argOptions: SelectedArg[];
  onChange: (args: SelectedArg[]) => void;
  selected: SelectedArg[];
}) {
  return (
    <RadioGroup>
      {argOptions.map((opt) => (
        <button
          key={opt.value}
          className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => {
            const currentlySelected = selected.some((s) => s.id === opt.id);
            if (currentlySelected) {
              onChange(selected.filter((s) => s.id !== opt.id));
            } else {
              onChange([opt]);
            }
          }}
          type="button"
        >
          <RadioGroupItem
            checked={selected.some((s) => s.id === opt.id)}
            value={opt.value}
            id={opt.value}
          />
          <span className="text-gray-800">{opt.label}</span>
        </button>
      ))}
    </RadioGroup>
  );
}

export default function TacticCommandPalette({
  nodeId,
  close,
}: { nodeId: string; close: () => void }) {
  const [search, setSearch] = useState("");
  const [args, setArgs] = useState<SelectedArg[]>([]);

  const [mobileStep, setMobileStep] = useState<"search" | "apply">("search");

  const variables = useAppSelector(selectVariables);
  const hypotheses = useAppSelector(selectAssumptions);
  const goal = useAppSelector(selectGoal);
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobile);

  const tacticOptions = useMemo(
    () =>
      AVAILABLE_TACTICS.filter(
        (t) =>
          !search ||
          t.label.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const lemmaOptions = useMemo(
    () =>
      AVAILABLE_LEMMAS.filter(
        (l) =>
          !search ||
          l.label.toLowerCase().includes(search.toLowerCase()) ||
          l.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const [selected, setSelected] = useState<Item | null>(tacticOptions[0]);

  const requiresExpressionArg = useMemo(() => {
    if (!selected) return false;
    return selected.arguments.includes("expressions");
  }, [selected]);

  const apply = (tactic: Tactic | Lemma) => {
    const call = `${tactic.className}(${args.map((a) => a.value).join(", ")})`;
    dispatch(
      applyTactic({ nodeId, tactic: call, isLemma: tactic.type === "lemma" }),
    );
    close();
  };

  const argOptions = useMemo(() => {
    if (!selected) return [];
    const tac = selected as Tactic;
    const opts: { label: string; value: string; id: string }[] = [];
    if (tac.arguments.includes("variables"))
      opts.push(
        ...variables.map((v) => ({ label: v.name, value: v.name, id: v.name })),
      );
    if (tac.arguments.includes("hypotheses"))
      opts.push(
        ...hypotheses.map((h) => ({
          label: `${h.name}: ${h.input}`,
          value: `"${h.name}"`,
          id: h.name,
        })),
      );
    if (tac.arguments.includes("verbose"))
      opts.push(
        { label: "verbose=True", value: "verbose=True", id: "verbose=True" },
        { label: "verbose=False", value: "verbose=False", id: "verbose=False" },
      );
    if (tac.arguments.includes("this"))
      opts.push({
        label: "none (applies to current state)",
        value: "",
        id: goal.input,
      });
    if (tac.arguments.includes("expressions"))
      opts.push({ label: "Expression", value: "Expression", id: "expression" });
    return opts;
  }, [selected, variables, hypotheses, goal]);

  const applyTacticDisabled = useMemo(() => {
    if (selected?.arguments.length === 0) return false;
    return args.length === 0 || args[0].id === "";
  }, [args, selected]);

  return (
    <div className="flex gap-4 max-w-full">
      {(mobileStep === "search" || !isMobile) && (
        <div className="flex flex-3 flex-col gap-2 md:border-r md:border-gray-200 md:pr-4 h-64">
          <Input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
            placeholder="Search for a tactic or lemma"
          />
          <div className="overflow-y-auto flex flex-wrap gap-1">
            {tacticOptions.map((t) => (
              <TacticSelectListOption
                key={t.id}
                item={t}
                onClick={() => {
                  setArgs([]);
                  setSelected(t);
                  setMobileStep("apply");
                }}
                selected={selected?.id === t.id}
              />
            ))}
            {lemmaOptions.map((l) => (
              <TacticSelectListOption
                key={l.id}
                item={l}
                onClick={() => {
                  setArgs([]);
                  setSelected(l);
                  setMobileStep("apply");
                }}
                selected={selected?.id === l.id}
              />
            ))}
          </div>
        </div>
      )}

      {selected && (mobileStep === "apply" || !isMobile) && (
        <div className="flex-4 flex flex-col gap-4 max-w-full">
          <div className="font-bold text-sm">Apply {selected.label}</div>
          <div className="flex flex-col gap-2 overflow-y-auto flex-1">
            <div className="text-gray-500 text-sm">{selected.description}</div>
            <div className="flex flex-col gap-2">
              {requiresExpressionArg ? (
                <TacticExpressionInput
                  tacticName={selected.className}
                  placeholder={selected.placeholder || "x >= z"}
                  args={args}
                  onChange={setArgs}
                />
              ) : (
                <TacticRadioGroup
                  argOptions={argOptions}
                  onChange={setArgs}
                  selected={args}
                />
              )}
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex gap-2">
            {isMobile && (
              <Button
                onClick={() => setMobileStep("search")}
                className="w-full"
                variant="primary"
                size="xs"
              >
                <LatexString latex="<-" /> Back
              </Button>
            )}
            <Button
              onClick={() => apply(selected)}
              disabled={applyTacticDisabled}
              className="w-full"
              variant="primary"
              size="xs"
            >
              <LatexString latex="+" /> Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
