import type { Distro } from "@/types/generator.types";

import { resolveFamily } from "@/lib/distro-resolver";
import { DISTRO_FAMILY_LABELS } from "@/types/generator.types";

export const generateHeader = (distro: Distro): string => {
  const family = resolveFamily(distro);

  const familyName = DISTRO_FAMILY_LABELS[family];

  return `#!/bin/bash
# Linux Server Setup Script
# Generated for: ${distro} (${familyName})
# Generated on: ${new Date().toISOString()}
#
# This script is idempotent and can be run multiple times safely

set -euo pipefail

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
NC='\\033[0m' # No Color

log_info() { echo -e "\${GREEN}[INFO]\${NC} $1"; }
log_warn() { echo -e "\${YELLOW}[WARN]\${NC} $1"; }
log_error() { echo -e "\${RED}[ERROR]\${NC} $1"; }

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   log_error "This script must be run as root"
   exit 1
fi

log_info "Starting server setup for ${distro}..."
`;
};
