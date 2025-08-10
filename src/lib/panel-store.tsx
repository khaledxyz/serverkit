import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from "react";

interface PanelState {
  showLeft: boolean;
  showRight: boolean;
  showBottom: boolean;
}

interface PanelContextType extends PanelState {
  toggleLeft: () => void;
  toggleRight: () => void;
  toggleBottom: () => void;
}

type PanelAction =
  | { type: "TOGGLE_LEFT" }
  | { type: "TOGGLE_RIGHT" }
  | { type: "TOGGLE_BOTTOM" }
  | { type: "INIT_STATE"; payload: PanelState };

const PanelContext = createContext<PanelContextType | undefined>(undefined);

const getStoredPanelState = (): PanelState => {
  try {
    const stored = localStorage.getItem("panel-state");
    if (stored) {
      return { ...getDefaultState(), ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn("Failed to parse stored panel state:", error);
  }
  return getDefaultState();
};

const getDefaultState = (): PanelState => ({
  showLeft: true,
  showRight: true,
  showBottom: true,
});

const savePanelState = (state: PanelState) => {
  try {
    localStorage.setItem("panel-state", JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save panel state:", error);
  }
};

const panelReducer = (state: PanelState, action: PanelAction): PanelState => {
  switch (action.type) {
    case "INIT_STATE":
      return action.payload;
    case "TOGGLE_LEFT":
      return { ...state, showLeft: !state.showLeft };
    case "TOGGLE_RIGHT":
      return { ...state, showRight: !state.showRight };
    case "TOGGLE_BOTTOM":
      return { ...state, showBottom: !state.showBottom };
    default:
      return state;
  }
};

export const PanelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(panelReducer, getDefaultState(), () =>
    getStoredPanelState(),
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      savePanelState(state);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [state]);

  const toggleLeft = useCallback(() => dispatch({ type: "TOGGLE_LEFT" }), []);
  const toggleRight = useCallback(() => dispatch({ type: "TOGGLE_RIGHT" }), []);
  const toggleBottom = useCallback(
    () => dispatch({ type: "TOGGLE_BOTTOM" }),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      toggleLeft,
      toggleRight,
      toggleBottom,
    }),
    [state, toggleLeft, toggleRight, toggleBottom],
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};

export const usePanelStore = () => {
  const ctx = useContext(PanelContext);
  if (!ctx)
    throw new Error("usePanelStore must be used within a PanelProvider");
  return ctx;
};
