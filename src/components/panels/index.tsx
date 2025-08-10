import { Sidebar } from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
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
      <ResizablePanelGroup direction="vertical">
        {hasHorizontalPanels && (
          <ResizablePanel>
            <ResizablePanelGroup direction="horizontal">
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
