import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PanelState {
  showLeft: boolean;
  showRight: boolean;
  showBottom: boolean;
}

interface PanelActions {
  toggleLeft: () => void;
  toggleRight: () => void;
  toggleBottom: () => void;
}

type PanelStore = PanelState & PanelActions;

// use sparingly
export const usePanelStore = create<PanelStore>()(
  persist(
    (set) => ({
      showLeft: true,
      showRight: true,
      showBottom: true,

      toggleLeft: () => set((state) => ({ showLeft: !state.showLeft })),
      toggleRight: () => set((state) => ({ showRight: !state.showRight })),
      toggleBottom: () => set((state) => ({ showBottom: !state.showBottom })),
    }),
    {
      name: "panel-state",
    }
  )
);

// use these for better performance
export const useShowLeft = () => usePanelStore((state) => state.showLeft);
export const useShowRight = () => usePanelStore((state) => state.showRight);
export const useShowBottom = () => usePanelStore((state) => state.showBottom);

// Custom storage for react-resizable-panels that persists to localStorage
export const panelSizeStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, value);
  },
};
