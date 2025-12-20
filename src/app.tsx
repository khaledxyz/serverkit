import { Analytics } from "@/components/analytics";
import { Providers } from "@/providers";

import { DevelopmentDialog } from "./components/development-dialog";
import { MainPanels } from "./panels";

export default function App() {
  return (
    <Providers>
      <Analytics />
      <MainPanels />
      <DevelopmentDialog />
    </Providers>
  );
}
