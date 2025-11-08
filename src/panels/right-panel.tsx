import { CopyIcon, DownloadIcon } from "lucide-react";

import BashHighlighter from "@/components/bash-highlighter";
import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";

export function RightPanel() {
  return (
    <ResizablePanel>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-2 font-mono">
          <span>Output</span>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger render={<Button size="icon" variant="outline" />}>
                <DownloadIcon />
              </TooltipTrigger>
              <TooltipPopup>Download</TooltipPopup>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button size="icon" variant="outline" />}>
                <CopyIcon />
              </TooltipTrigger>
              <TooltipPopup>Copy</TooltipPopup>
            </Tooltip>
          </div>
        </div>

        <ScrollArea className="flex-1 p-3" orientation="vertical">
          <BashHighlighter />
        </ScrollArea>
      </div>
    </ResizablePanel>
  );
}
