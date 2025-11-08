import { useHotkeys } from "react-hotkeys-hook";

import {
  BugIcon,
  CoffeeIcon,
  GithubIcon,
  HatGlassesIcon,
  PanelBottomIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";
import { usePanelStore } from "@/stores/panels-store";

export const Sidebar = () => {
  const {
    showLeft,
    showRight,
    showBottom,
    toggleLeft,
    toggleRight,
    toggleBottom,
  } = usePanelStore();

  // Keyboard shortcuts
  useHotkeys("ctrl+shift+l", (e) => {
    e.preventDefault();
    toggleLeft();
  });
  useHotkeys("ctrl+shift+r", (e) => {
    e.preventDefault();
    toggleRight();
  });
  useHotkeys("ctrl+shift+b", (e) => {
    e.preventDefault();
    toggleBottom();
  });

  return (
    <aside className="flex h-full flex-col items-center border-r p-2">
      <div className="flex flex-col items-center gap-1">
        <div className="grid size-9 place-items-center">
          <Logo />
        </div>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                onClick={toggleLeft}
                size="icon"
                variant={showLeft ? "secondary" : "ghost"}
              />
            }
          >
            <PanelLeftIcon />
          </TooltipTrigger>
          <TooltipPopup side="right">
            <div className="flex items-center gap-2">
              Toggle Form
              <KbdGroup>
                <Kbd>⌃</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>L</Kbd>
              </KbdGroup>
            </div>
          </TooltipPopup>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                onClick={toggleRight}
                size="icon"
                variant={showRight ? "secondary" : "ghost"}
              />
            }
          >
            <PanelRightIcon />
          </TooltipTrigger>
          <TooltipPopup side="right">
            <div className="flex items-center gap-2">
              Toggle Script
              <KbdGroup>
                <Kbd>⌃</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>R</Kbd>
              </KbdGroup>
            </div>
          </TooltipPopup>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                onClick={toggleBottom}
                size="icon"
                variant={showBottom ? "secondary" : "ghost"}
              />
            }
          >
            <PanelBottomIcon />
          </TooltipTrigger>
          <TooltipPopup side="right">
            <div className="flex items-center gap-2">
              Toggle Console
              <KbdGroup>
                <Kbd>⌃</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>B</Kbd>
              </KbdGroup>
            </div>
          </TooltipPopup>
        </Tooltip>
      </div>

      <div className="mt-auto flex flex-col items-center gap-1">
        <ThemeSwitcher />

        <Tooltip>
          <TooltipTrigger
            render={
              <a
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                href="https://github.com/khaledxyz/serverkit/issues/new"
                rel="noopener noreferrer"
                target="_blank"
              >
                <BugIcon />
              </a>
            }
          />
          <TooltipPopup side="right">Report an issue</TooltipPopup>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <a
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                href="https://buymeacoffee.com/khaledxyz"
                rel="noopener noreferrer"
                target="_blank"
              >
                <CoffeeIcon />
              </a>
            }
          />
          <TooltipPopup side="right">Buy me a coffee</TooltipPopup>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <a
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                href="https://github.com/khaledxyz/serverkit"
                rel="noopener noreferrer"
                target="_blank"
              >
                <GithubIcon />
              </a>
            }
          />
          <TooltipPopup side="right">Github</TooltipPopup>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button size="icon" variant="ghost">
                <HatGlassesIcon />
              </Button>
            }
          />
          <TooltipPopup side="right">Privacy</TooltipPopup>
        </Tooltip>
      </div>
    </aside>
  );
};
