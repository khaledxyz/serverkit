export type DistroFamily = "debian" | "rhel" | "arch";

export type Distro =
  | "ubuntu"
  | "debian"
  | "rhel"
  | "centos"
  | "fedora"
  | "rocky"
  | "alma"
  | "arch"
  | "manjaro";

export const DISTRO_FAMILY_LABELS: Record<DistroFamily, string> = {
  debian: "Debian/Ubuntu",
  rhel: "RHEL/CentOS/Fedora",
  arch: "Arch",
};

export interface FormData {
  distro: Distro;
  hostname: string;
  timezone: string;
  initialSystemUpdate: boolean;
  automaticSecurityUpdates: boolean;
  users: User[];
}

export interface User {
  username: string;
  password: string;
  forcePasswordChange: boolean;
  sshPublicKey: string;
  defaultShell: string;
  additionalGroups: string;
  sudo: boolean;
  systemUser: boolean;
}

export interface CommandTemplate {
  family: DistroFamily;
  command: string;
}
