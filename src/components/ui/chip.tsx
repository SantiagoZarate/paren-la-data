import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function Chip({ className, ...args }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-foreground px-2 py-1 rounded-lg w-fit text-xs border border-border bg-foreground-50 flex items-center gap-2",
        className
      )}
      {...args}
    />
  );
}
