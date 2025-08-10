import { create } from "zustand";

interface ScriptState {
  script: string;
}

interface ScriptActions {
  setScript: (script: string) => void;
}

type ScriptStore = ScriptState & ScriptActions;

export const useScriptStore = create<ScriptStore>()((set) => ({
  script: "",

  setScript: (script: string) => set({ script }),
}));

// selector for just the script value
export const useScript = () => useScriptStore((state) => state.script);
