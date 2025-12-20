import type { DistroFamily, User } from "@/types/generator.types";

import { getCommand } from "@/lib/command-registry";

export const generateUser = (user: User, family: DistroFamily): string => {
  const userExistsCmd = getCommand("userExists", family);
  const createUserCmd = getCommand("createUser", family);

  const systemFlag = user.systemUser ? "--system" : "";
  const shellFlag = user.defaultShell
    ? `-s ${user.defaultShell}`
    : "-s /bin/bash";
  const groupsFlag = user.additionalGroups ? `-G ${user.additionalGroups}` : "";

  let script = `
# Create user: ${user.username}
if ${userExistsCmd} "${user.username}" &>/dev/null; then
    log_warn "User ${user.username} already exists, skipping creation"
else
    log_info "Creating user ${user.username}..."
    ${createUserCmd} -m ${systemFlag} ${shellFlag} ${groupsFlag} "${user.username}"
    log_info "User ${user.username} created"
fi
`;

  if (user.password) {
    script += `
# Set password for ${user.username}
echo "${user.username}:${user.password}" | chpasswd
${user.forcePasswordChange ? `chage -d 0 "${user.username}"` : ""}
log_info "Password set for ${user.username}"
`;
  }

  if (user.sudo) {
    script += `
# Add ${user.username} to sudo group
usermod -aG sudo "${user.username}" 2>/dev/null || usermod -aG wheel "${user.username}"
log_info "Sudo privileges granted to ${user.username}"
`;
  }

  if (user.sshPublicKey) {
    script += `
# Configure SSH key for ${user.username}
USER_HOME=$(eval echo ~${user.username})
mkdir -p "$USER_HOME/.ssh"
echo "${user.sshPublicKey}" >> "$USER_HOME/.ssh/authorized_keys"
chmod 700 "$USER_HOME/.ssh"
chmod 600 "$USER_HOME/.ssh/authorized_keys"
chown -R ${user.username}:${user.username} "$USER_HOME/.ssh"
log_info "SSH key configured for ${user.username}"
`;
  }

  return script;
};
