import { FileLineChartIcon, PenTool } from "lucide-react";
import { selectMode, setMode } from "../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { Button } from "./Button";
import { TypographyH2 } from "./Typography";

function ModeSwitcherButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <Button
      variant={active ? "primary" : "ghost"}
      size="sm"
      onClick={onClick}
      className="w-32"
    >
      <span className="mr-1">{icon}</span>
      {label}
    </Button>
  );
}

export default function ModeSwitcher(): React.ReactElement {
  const viewMode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-center md:justify-between">
        <TypographyH2 className="hidden md:block md:text-xl">
          {viewMode === "assumptions" ? "Assumptions Mode" : "Tactics Mode"}
        </TypographyH2>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <ModeSwitcherButton
            active={viewMode === "assumptions"}
            icon={<PenTool className="h-4 w-4" />}
            label="Assumptions"
            onClick={() => dispatch(setMode("assumptions"))}
          />
          <ModeSwitcherButton
            active={viewMode === "tactics"}
            icon={<FileLineChartIcon className="h-4 w-4" />}
            label="Tactics"
            onClick={() => dispatch(setMode("tactics"))}
          />
        </div>
      </div>
    </div>
  );
}
