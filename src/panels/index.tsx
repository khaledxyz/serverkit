import { Sidebar } from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  panelSizeStorage,
  useShowBottom,
  useShowLeft,
  useShowRight,
} from "@/stores/panels-store";

import { BottomPanel } from "./bottom-panel";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";

export function MainPanels() {
  const showLeft = useShowLeft();
  const showRight = useShowRight();
  const showBottom = useShowBottom();

  const hasHorizontalPanels = showLeft || showRight;
  const hasMultiplePanels = showLeft && showRight;

  return (
    <main className="flex h-screen w-screen">
      <Sidebar />
      <ResizablePanelGroup
        autoSaveId="main-vertical-layout"
        direction="vertical"
        storage={panelSizeStorage}
      >
        {hasHorizontalPanels && (
          <ResizablePanel>
            <ResizablePanelGroup
              autoSaveId="main-horizontal-layout"
              direction="horizontal"
              storage={panelSizeStorage}
            >
              {showLeft && <LeftPanel />}
              {hasMultiplePanels && <ResizableHandle />}
              {showRight && <RightPanel />}
            </ResizablePanelGroup>
          </ResizablePanel>
        )}
        {hasHorizontalPanels && showBottom && <ResizableHandle />}
        {showBottom && <BottomPanel />}
      </ResizablePanelGroup>
    </main>
  );
}
