import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "dark",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const getStoredTheme = (storageKey: string, defaultTheme: Theme): Theme => {
  try {
    const stored = localStorage.getItem(storageKey);
    return (stored as Theme) || defaultTheme;
  } catch (error) {
    console.warn("Failed to get stored theme:", error);
    return defaultTheme;
  }
};

const saveTheme = (storageKey: string, theme: Theme) => {
  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    console.warn("Failed to save theme:", error);
  }
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    getStoredTheme(storageKey, defaultTheme),
  );

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() => {
    if (theme !== "system") return theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      saveTheme(storageKey, newTheme);
    },
    [storageKey],
  );

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const currentTheme = theme === "system" ? resolvedTheme : theme;

    requestAnimationFrame(() => {
      root.classList.remove("light", "dark");
      root.classList.add(currentTheme);
    });
  }, [theme, resolvedTheme]);

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setResolvedTheme(systemTheme);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
    }),
    [theme, setTheme, resolvedTheme],
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
