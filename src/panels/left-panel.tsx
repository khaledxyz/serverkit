import { MainForm } from "@/components/main-form.tsx";
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LeftPanel() {
  return (
    <ResizablePanel defaultSize={25}>
      <div className="flex h-full flex-col">
        <div className="border-b p-3 font-mono">Form</div>

        <ScrollArea className="flex-1 p-3" orientation="vertical">
          <MainForm />
        </ScrollArea>
      </div>
    </ResizablePanel>
  );
}
