import { cn } from "@/lib/utils";
import { GripVerticalIcon } from "lucide-react";
import * as React from "react";

// Lazy-load only the components we need
const PanelGroup = React.lazy(() =>
  import("react-resizable-panels").then((m) => ({ default: m.PanelGroup }))
);
const Panel = React.lazy(() =>
  import("react-resizable-panels").then((m) => ({ default: m.Panel }))
);
const PanelResizeHandle = React.lazy(() =>
  import("react-resizable-panels").then((m) => ({
    default: m.PanelResizeHandle,
  }))
);

// Same API as before
function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof PanelGroup>) {
  return (
    <PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
}

function ResizablePanel(props: React.ComponentProps<typeof Panel>) {
  return <Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "focus-visible:ring-ring group relative flex w-px items-center justify-center transition-colors after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        "hover:bg-blue-500/20 data-[resize-handle-state=hover]:bg-blue-500/20 data-[resize-handle-state=drag]:bg-blue-500/30",
        "data-[panel-group-direction=vertical]:hover:bg-blue-500/20",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border group-hover:bg-blue-500/30 group-data-[resize-handle-state=hover]:bg-blue-500/30 group-data-[resize-handle-state=drag]:bg-blue-500/40 z-10 flex h-4 w-3 items-center justify-center rounded-xs border transition-colors">
          <GripVerticalIcon className="size-2.5 group-hover:text-blue-400 group-data-[resize-handle-state=hover]:text-blue-400 transition-colors" />
        </div>
      )}
    </PanelResizeHandle>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
