"use client";
import { useTheme } from "@/components/theme-provider";
import { MoonIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "./ui/button";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <Button
      onClick={toggleTheme}
      title="Toggle Theme"
      variant="ghost"
      size="icon"
    >
      <MoonIcon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
