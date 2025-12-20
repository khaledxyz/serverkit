import { useState } from "react";

import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";

import BashHighlighter from "@/components/bash-highlighter";
import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";
import { useGeneratorStore } from "@/stores/generator-store";

export function RightPanel() {
  const generatedScript = useGeneratorStore((state) => state.generatedScript);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedScript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `server-setup-${Date.now()}.sh`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ResizablePanel>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-2 font-mono">
          <span>Output</span>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    disabled={!generatedScript}
                    onClick={handleDownload}
                    size="icon"
                    variant="outline"
                  />
                }
              >
                <DownloadIcon />
              </TooltipTrigger>
              <TooltipPopup>Download</TooltipPopup>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    disabled={!generatedScript}
                    onClick={handleCopy}
                    size="icon"
                    variant="outline"
                  />
                }
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </TooltipTrigger>
              <TooltipPopup>{copied ? "Copied!" : "Copy"}</TooltipPopup>
            </Tooltip>
          </div>
        </div>

        <ScrollArea className="flex-1 p-3" orientation="vertical">
          <BashHighlighter code={generatedScript} />
        </ScrollArea>
      </div>
    </ResizablePanel>
  );
}
