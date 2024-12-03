"use client";

import { useTheme } from "next-themes";

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header>
      {theme === "dark" ? (
        <button onClick={() => setTheme("ligth")}>light</button>
      ) : (
        <button onClick={() => setTheme("dark")}>dark</button>
      )}
    </header>
  );
}
