"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...args
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...args}>{children}</NextThemesProvider>;
}
