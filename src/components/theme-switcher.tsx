import { useCallback } from "react";

import { MoonIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/providers/theme-provider";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button onClick={toggleTheme} size="icon" variant="ghost">
            <MoonIcon />
          </Button>
        }
      />
      <TooltipPopup side="right">Toggle Theme</TooltipPopup>
    </Tooltip>
  );
}
