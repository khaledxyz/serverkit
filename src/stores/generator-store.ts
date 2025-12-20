import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GeneratorStore {
  generatedScript: string;
  setGeneratedScript: (script: string) => void;
  reset: () => void;
}

export const useGeneratorStore = create<GeneratorStore>()(
  devtools(
    (set) => ({
      generatedScript: "",
      setGeneratedScript: (script) =>
        set({ generatedScript: script }, false, "setGeneratedScript"),
      reset: () => set({ generatedScript: "" }, false, "reset"),
    }),
    { name: "GeneratorStore" }
  )
);
