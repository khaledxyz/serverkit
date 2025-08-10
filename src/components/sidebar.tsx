import { usePanelStore } from "@/stores/panels-store";
import { PanelBottomIcon, PanelLeftIcon, PanelRightIcon } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";

export const Sidebar = () => {
  const {
    showLeft,
    showRight,
    showBottom,
    toggleLeft,
    toggleRight,
    toggleBottom,
  } = usePanelStore();

  return (
    <aside className="border-r h-full flex flex-col items-center gap-1 p-2">
      <Button
        size="icon"
        variant={showLeft ? "secondary" : "ghost"}
        onClick={toggleLeft}
        title="Left Panel"
      >
        <PanelLeftIcon />
      </Button>

      <Button
        size="icon"
        variant={showRight ? "secondary" : "ghost"}
        onClick={toggleRight}
        title="Right Panel"
      >
        <PanelRightIcon />
      </Button>

      <Button
        size="icon"
        variant={showBottom ? "secondary" : "ghost"}
        onClick={toggleBottom}
        title="Bottom Panel"
      >
        <PanelBottomIcon />
      </Button>

      <ThemeSwitcher />
    </aside>
  );
};
