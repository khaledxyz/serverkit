import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScript } from "@/stores/script-store";

export function RightPanel() {
  const script = useScript();

  return (
    <ResizablePanel>
      <div className="h-full bg-background flex flex-col">
        <div className="flex items-center gap-2 p-4 pb-2 border-b">
          <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-lg font-semibold">Right Panel</h2>
        </div>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <code>
              <pre className="p-4">{script}</pre>
            </code>
          </ScrollArea>
        </div>
      </div>
    </ResizablePanel>
  );
}
