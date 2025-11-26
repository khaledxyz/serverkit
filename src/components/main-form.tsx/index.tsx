import { DistroSelector } from "./distro-selector";
import { HostnameInput } from "./hostname-input";
import { SshSettings } from "./ssh-settings";
import { SystemUpdatesSettings } from "./system-updates-settings";
import { TimezoneInput } from "./timezone-input";
import { UsersSettings } from "./users-settings";

export function MainForm() {
  return (
    <form className="space-y-5">
      <DistroSelector />
      <HostnameInput />
      <TimezoneInput />
      <SystemUpdatesSettings />
      <UsersSettings />
      <SshSettings />
    </form>
  );
}
