import { PropsWithChildren } from "react";

export function Chip({ children }: PropsWithChildren) {
  return (
    <li className="text-foreground px-2 py-1 rounded-lg w-fit text-xs border border-border bg-foreground-50 flex items-center gap-1">
      {children}
    </li>
  );
}
