import { ResizablePanel } from "@/components/ui/resizable";

export function BottomPanel() {
  return (
    <ResizablePanel defaultSize={20}>
      <div className="h-full w-full">
        <p>Hey</p>
      </div>
    </ResizablePanel>
  );
}
