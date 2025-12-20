import type { DistroFamily } from "@/types/generator.types";

const COMMANDS = {
  setHostname: {
    debian: "hostnamectl set-hostname",
    rhel: "hostnamectl set-hostname",
    arch: "hostnamectl set-hostname",
  },
  setTimezone: {
    debian: "timedatectl set-timezone",
    rhel: "timedatectl set-timezone",
    arch: "timedatectl set-timezone",
  },
  updateSystem: {
    debian: "apt-get update && apt-get upgrade -y",
    rhel: "dnf upgrade -y",
    arch: "pacman -Syu --noconfirm",
  },
  installPackage: {
    debian: "apt-get install -y",
    rhel: "dnf install -y",
    arch: "pacman -S --noconfirm",
  },
  enableAutoUpdates: {
    debian:
      "apt-get install -y unattended-upgrades && dpkg-reconfigure -plow unattended-upgrades",
    rhel: "dnf install -y dnf-automatic && systemctl enable --now dnf-automatic.timer",
    arch: "pacman -S --noconfirm pacman-contrib && systemctl enable --now paccache.timer",
  },
  userExists: {
    debian: "id -u",
    rhel: "id -u",
    arch: "id -u",
  },
  createUser: {
    debian: "useradd",
    rhel: "useradd",
    arch: "useradd",
  },
  setPassword: {
    debian: "echo",
    rhel: "echo",
    arch: "echo",
  },
};

export const getCommand = (
  key: keyof typeof COMMANDS,
  family: DistroFamily
): string => COMMANDS[key][family];
