import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { memo } from "react";
import { MainForm } from "../main-form";

export const LeftPanel = memo(() => (
  <ResizablePanel defaultSize={25}>
    <div className="h-full bg-background border-r flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 border-b">
        <h2 className="font-semibold">Form</h2>
        {/* fake button to align perfectly align the border with the right panel  */}
        <div className="size-9" />
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
