/** biome-ignore-all lint/a11y/noLabelWithoutControl: <This is a wrapper component> */
import type React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("inline-flex items-center gap-2 text-sm/4", className)}
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
