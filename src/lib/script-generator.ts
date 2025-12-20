import type { FormData } from "@/types/generator.types";

import { resolveFamily } from "@/lib/distro-resolver";

import { generateFooter } from "./templates/footer.template";
import { generateHeader } from "./templates/header.template";
import { generateHostname } from "./templates/hostname.template";
import { generateTimezone } from "./templates/timezone.template";
import {
  generateAutoSecurityUpdates,
  generateSystemUpdates,
} from "./templates/updates.template";
import { generateUser } from "./templates/user.template";

export const generateScript = (data: FormData): string => {
  const family = resolveFamily(data.distro);
  const sections: string[] = [];

  // Header
  sections.push(generateHeader(data.distro));

  // Hostname
  if (data.hostname) {
    sections.push(generateHostname(data.hostname, family));
  }

  // Timezone
  if (data.timezone) {
    sections.push(generateTimezone(data.timezone, family));
  }

  // System updates
  if (data.initialSystemUpdate) {
    sections.push(generateSystemUpdates(family));
  }

  // Auto security updates
  if (data.automaticSecurityUpdates) {
    sections.push(generateAutoSecurityUpdates(family));
  }

  // Users
  if (data.users) {
    for (const user of data.users) {
      if (!user.username) {
        continue;
      }
      sections.push(generateUser(user, family));
    }
  }

  // Footer
  sections.push(generateFooter());

  return sections.join("\n");
};
