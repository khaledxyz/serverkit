import { Analytics } from "@/components/analytics";
import { Providers } from "@/providers";

import { MainPanels } from "./panels";

export default function App() {
  return (
    <Providers>
      <Analytics />
      <MainPanels />
    </Providers>
  );
}
