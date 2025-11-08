import { create } from "zustand";

export type LogLevel = "info" | "warning" | "error";

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: Date;
}

interface ConsoleState {
  logs: LogEntry[];
  filterLevel: LogLevel | "all";
}

interface ConsoleActions {
  addLog: (level: LogLevel, message: string) => void;
  clearLogs: () => void;
  setFilterLevel: (level: LogLevel | "all") => void;
}

type ConsoleStore = ConsoleState & ConsoleActions;

export const useConsoleStore = create<ConsoleStore>()((set) => ({
  logs: [],
  filterLevel: "all",

  addLog: (level, message) =>
    set((state) => ({
      logs: [
        ...state.logs,
        {
          id: crypto.randomUUID(),
          level,
          message,
          timestamp: new Date(),
        },
      ],
    })),

  clearLogs: () => set({ logs: [] }),

  setFilterLevel: (level) => set({ filterLevel: level }),
}));
