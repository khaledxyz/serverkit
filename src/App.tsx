import { Analytics } from "./components/analytics-script";
import { MainPanels } from "./components/panels";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainPanels />
      <Analytics />
    </ThemeProvider>
  );
}
