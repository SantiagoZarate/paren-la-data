"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ComponentProps } from "react";

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="fixed top-0 w-full z-50">
      <header className="max-w-screen-lg mx-auto flex justify-end p-4 px-8">
        {theme === "dark" ? (
          <ThemeButton onClick={() => setTheme("ligth")}>
            <SunIcon />
          </ThemeButton>
        ) : (
          <ThemeButton onClick={() => setTheme("dark")}>
            <MoonIcon />
          </ThemeButton>
        )}
      </header>
    </div>
  );
}

function ThemeButton({ ...args }: ComponentProps<"button">) {
  return (
    <button
      className="p-2 rounded-md border border-border aspect-square shadow-md bg-background"
      {...args}
    />
  );
}
