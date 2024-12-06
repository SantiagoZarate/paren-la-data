import { PLMIcon } from "@/components/icon/PLMIcon";
import Link from "next/link";
import "./header.css";
import { ThemeSwitcherButton } from "./theme-switcher-button";

const HEADER_LINKS = [
  {
    value: "invitados",
    path: "/invitados",
  },
];

export function Header() {
  return (
    <div className="header-wrapper fixed top-0 w-full z-50">
      <header className="max-w-screen-lg mx-auto flex justify-between p-4 px-8 items-center">
        <section className="flex gap-6 items-center">
          <Link href="/" className="flex gap-2 items-center">
            <span className="rounded-md border border-border p-1 bg-background">
              <PLMIcon />
            </span>
            <h3 className="text-sm font-semibold">Paren la data</h3>
          </Link>
          <nav className="flex">
            {HEADER_LINKS.map((link) => (
              <Link
                className="p-2 text-xs capitalize text-opacity-30 hover:opacity-70"
                key={link.path}
                href={link.path}
              >
                {link.value}
              </Link>
            ))}
          </nav>
        </section>
        <ThemeSwitcherButton />
      </header>
    </div>
  );
}
