import type { DistroFamily } from "@/types/generator.types";

import { getCommand } from "@/lib/command-registry";

export const generateSystemUpdates = (family: DistroFamily): string => {
  const cmd = getCommand("updateSystem", family);
  return `
# Update system packages
log_info "Updating system packages..."
${cmd}
log_info "System packages updated"
`;
};

export const generateAutoSecurityUpdates = (family: DistroFamily): string => {
  const cmd = getCommand("enableAutoUpdates", family);
  return `
# Enable automatic security updates
log_info "Enabling automatic security updates..."
${cmd}
log_info "Automatic security updates enabled"
`;
};
