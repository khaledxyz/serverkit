import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { memo } from "react";
import { MainForm } from "../main-form";

export const LeftPanel = memo(() => (
  <ResizablePanel defaultSize={25}>
    <div className="h-full bg-background border-r flex flex-col">
      <div className="flex items-center gap-2 p-4 pb-2 border-b">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <h2 className="text-lg font-semibold">Left Panel</h2>
      </div>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <MainForm />
        </ScrollArea>
      </div>
    </div>
  </ResizablePanel>
));

LeftPanel.displayName = "LeftPanel";
