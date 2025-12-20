import type { DistroFamily } from "@/types/generator.types";

import { getCommand } from "@/lib/command-registry";

export const generateHostname = (
  hostname: string,
  family: DistroFamily
): string => {
  if (!hostname) {
    return "";
  }

  const cmd = getCommand("setHostname", family);

  return `
# Set hostname
CURRENT_HOSTNAME=$(hostname)
if [[ "$CURRENT_HOSTNAME" != "${hostname}" ]]; then
    log_info "Setting hostname to ${hostname}..."
    ${cmd} "${hostname}"
    echo "127.0.0.1 ${hostname}" >> /etc/hosts
    log_info "Hostname set successfully"
else
    log_info "Hostname already set to ${hostname}"
fi
`;
};
