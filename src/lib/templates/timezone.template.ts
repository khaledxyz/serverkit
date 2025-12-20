import type { DistroFamily } from "@/types/generator.types";

import { getCommand } from "@/lib/command-registry";

export const generateTimezone = (
  timezone: string,
  family: DistroFamily
): string => {
  if (!timezone) {
    return "";
  }

  const cmd = getCommand("setTimezone", family);
  return `
# Set timezone
CURRENT_TZ=$(timedatectl show --property=Timezone --value)
if [[ "$CURRENT_TZ" != "${timezone}" ]]; then
    log_info "Setting timezone to ${timezone}..."
    ${cmd} "${timezone}"
    log_info "Timezone set successfully"
else
    log_info "Timezone already set to ${timezone}"
fi
`;
};
