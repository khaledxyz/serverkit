import { create } from "zustand";

interface ErrorState {
  errors: string[];
}

interface ErrorActions {
  addError: (error: string) => void;
  removeError: (index: number) => void;
  clearErrors: () => void;
}

type ErrorStore = ErrorState & ErrorActions;

export const useErrorStore = create<ErrorStore>()((set) => ({
  errors: [],

  addError: (error: string) =>
    set((state) => ({
      errors: [...state.errors, error],
    })),
  removeError: (index: number) =>
    set((state) => ({
      errors: state.errors.filter((_, i) => i !== index),
    })),
  clearErrors: () => set({ errors: [] }),
}));

// selector for just the errors array
export const useErrors = () => useErrorStore((state) => state.errors);
