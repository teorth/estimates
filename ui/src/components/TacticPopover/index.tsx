import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import TacticCommandPalette from "./TacticCommandPalette";

export default function TacticPopover({
  nodeId,
  children,
}: {
  nodeId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="bg-white z-200000 w-48 lg:w-2xl">
        <TacticCommandPalette nodeId={nodeId} close={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
