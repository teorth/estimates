import classNames from "classnames";
import { Button } from "../Button";

export default function TopBarButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="sm"
      onClick={onClick}
    >
      <span className="mr-1">{icon}</span>
      <span className={classNames({ "hidden md:block": !active })}>
        {label}
      </span>
    </Button>
  );
}
