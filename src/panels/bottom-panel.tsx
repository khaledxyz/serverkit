import type { LogLevel } from "@/stores/console-store";

import { useCallback, useMemo } from "react";

import {
  AlertCircleIcon,
  InfoIcon,
  Trash2Icon,
  TriangleAlertIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConsoleStore } from "@/stores/console-store";

const LOG_COLORS: Record<LogLevel, string> = {
  info: "text-info-foreground",
  warning: "text-warning-foreground",
  error: "text-destructive-foreground",
};

const LOG_BG_COLORS: Record<LogLevel, string> = {
  info: "hover:bg-info/10",
  warning: "hover:bg-warning/10",
  error: "hover:bg-destructive/10",
};

const LOG_ICONS: Record<
  LogLevel,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: AlertCircleIcon,
};

// Memoized time formatter
const formatTime = (date: Date): string =>
  date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export function BottomPanel() {
  const logs = useConsoleStore((state) => state.logs);
  const filterLevel = useConsoleStore((state) => state.filterLevel);
  const setFilterLevel = useConsoleStore((state) => state.setFilterLevel);
  const clearLogs = useConsoleStore((state) => state.clearLogs);

  const filteredLogs = useMemo(() => {
    if (filterLevel === "all") {
      return logs;
    }
    return logs.filter((log) => log.level === filterLevel);
  }, [logs, filterLevel]);

  const handleFilterAll = useCallback(
    () => setFilterLevel("all"),
    [setFilterLevel]
  );
  const handleFilterInfo = useCallback(
    () => setFilterLevel("info"),
    [setFilterLevel]
  );
  const handleFilterWarning = useCallback(
    () => setFilterLevel("warning"),
    [setFilterLevel]
  );
  const handleFilterError = useCallback(
    () => setFilterLevel("error"),
    [setFilterLevel]
  );

  return (
    <ResizablePanel defaultSize={20}>
      <div className="flex h-full flex-col">
        {/* Header with filters */}
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center gap-1">
            <Button
              onClick={handleFilterAll}
              size="sm"
              variant={filterLevel === "all" ? "default" : "ghost"}
            >
              All
            </Button>
            <Button
              className="gap-1.5"
              onClick={handleFilterInfo}
              size="sm"
              variant={filterLevel === "info" ? "default" : "ghost"}
            >
              <InfoIcon size={14} />
              Info
            </Button>
            <Button
              className="gap-1.5"
              onClick={handleFilterWarning}
              size="sm"
              variant={filterLevel === "warning" ? "default" : "ghost"}
            >
              <TriangleAlertIcon size={14} />
              Warning
            </Button>
            <Button
              className="gap-1.5"
              onClick={handleFilterError}
              size="sm"
              variant={filterLevel === "error" ? "default" : "ghost"}
            >
              <AlertCircleIcon size={14} />
              Error
            </Button>
          </div>

          <Button
            className="gap-1.5"
            onClick={clearLogs}
            size="sm"
            variant="ghost"
          >
            <Trash2Icon size={14} />
            Clear
          </Button>
        </div>

        {/* Console logs */}
        <ScrollArea className="flex-1" orientation="vertical">
          <div className="font-mono text-sm">
            {filteredLogs.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No logs to display
              </div>
            ) : (
              filteredLogs.map((log) => {
                const Icon = LOG_ICONS[log.level];
                return (
                  <div
                    className={`flex items-start gap-2 border-b px-3 py-2 ${LOG_BG_COLORS[log.level]}`}
                    key={log.id}
                  >
                    <Icon
                      className={`mt-0.5 shrink-0 ${LOG_COLORS[log.level]}`}
                      size={16}
                    />
                    <span className="text-muted-foreground text-xs">
                      {formatTime(log.timestamp)}
                    </span>
                    <span className="flex-1">{log.message}</span>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </ResizablePanel>
  );
}
