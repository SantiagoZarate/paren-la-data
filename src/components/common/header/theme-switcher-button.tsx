"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ComponentProps, useEffect, useState } from "react";

export function ThemeSwitcherButton() {
  const { setTheme, theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return theme === "dark" ? (
    <ThemeButton onClick={() => setTheme("ligth")}>
      <SunIcon className="p-1" />
    </ThemeButton>
  ) : (
    <ThemeButton onClick={() => setTheme("dark")}>
      <MoonIcon className="p-1" />
    </ThemeButton>
  );
}

function ThemeButton({ ...args }: ComponentProps<"button">) {
  return (
    <button
      className="p-1 rounded-md border border-border hover:translate-y-1 transition aspect-square shadow-md bg-background"
      {...args}
    />
  );
}
