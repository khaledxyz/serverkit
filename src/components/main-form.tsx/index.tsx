import { DistroSelector } from "./distro-selector";
import { HostnameInput } from "./hostname-input";
import { SystemUpdatesItem } from "./system-updates-toggle";
import { TimezoneInput } from "./timezone-input";
import { UsersSettings } from "./users-settings";

export function MainForm() {
  return (
    <form className="space-y-5">
      <DistroSelector />
      <HostnameInput />
      <TimezoneInput />
      <SystemUpdatesItem />
      <UsersSettings />
    </form>
  );
}
