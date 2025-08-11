import { usePanelStore } from "@/stores/panels-store";
import {
  BugIcon,
  CoffeeIcon,
  GithubIcon,
  HatGlassesIcon,
  PanelBottomIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { Button, buttonVariants } from "./ui/button";

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
        title="Toggle Form"
      >
        <PanelLeftIcon />
      </Button>

      <Button
        size="icon"
        variant={showRight ? "secondary" : "ghost"}
        onClick={toggleRight}
        title="Toggle Script"
      >
        <PanelRightIcon />
      </Button>

      <Button
        size="icon"
        variant={showBottom ? "secondary" : "ghost"}
        onClick={toggleBottom}
        title="Toggle Console"
      >
        <PanelBottomIcon />
      </Button>

      <div className="mt-auto flex flex-col">
        <ThemeSwitcher />
        <a
          href="https://github.com/khaledxyz/serverkit/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "ghost" })}
          title="Report an issue"
        >
          <BugIcon />
          <span className="sr-only">Report an issue</span>
        </a>
        <a
          href="https://buymeacoffee.com/khaledxyz"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "ghost" })}
          title="Buy me a coffee"
        >
          <CoffeeIcon />
          <span className="sr-only">Buy me a coffee</span>
        </a>
        <a
          href="https://github.com/khaledxyz/serverkit"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "ghost" })}
          title="Github"
        >
          <GithubIcon />
          <span className="sr-only">Github</span>
        </a>
        <Button size="icon" variant="ghost" title="Privacy">
          <HatGlassesIcon />
          <span className="sr-only">Privacy</span>
        </Button>
      </div>
    </aside>
  );
};
