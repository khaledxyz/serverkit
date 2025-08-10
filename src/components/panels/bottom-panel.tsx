import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useErrorStore } from "@/stores/errors-store";

export function BottomPanel() {
  const { errors } = useErrorStore();

  return (
    <ResizablePanel defaultSize={20}>
      <div className="h-full bg-background border-t flex flex-col">
        <div className="flex items-center gap-2 p-4 pb-2 border-b">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <h2 className="text-lg font-semibold">Bottom Panel</h2>
        </div>

        <div className="flex-1 overflow-hidden font-mono">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="p-3 bg-muted rounded-lg text-xs">
                {errors.map((error, index) => (
                  <p className="text-destructive" key={index}>
                    ✗ {error}
                  </p>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </ResizablePanel>
  );
}
