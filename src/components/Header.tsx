import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface HeaderProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

const Header = ({
  isDarkMode = false,
  onToggleTheme = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img src="/guardly-logo.svg" alt="Guardly Logo" className="h-8 w-8" />
        <h1 className="text-2xl font-bold text-foreground">GUARDLY</h1>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onToggleTheme}
        className={cn(
          "rounded-full",
          isDarkMode
            ? "bg-background text-foreground"
            : "bg-background text-foreground",
        )}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </header>
  );
};

export default Header;
