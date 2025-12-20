import type { Distro, DistroFamily } from "@/types/generator.types";

export const DISTRO_MAP: Record<Distro, DistroFamily> = {
  ubuntu: "debian",
  debian: "debian",
  rhel: "rhel",
  centos: "rhel",
  fedora: "rhel",
  rocky: "rhel",
  alma: "rhel",
  arch: "arch",
  manjaro: "arch",
};

export const resolveFamily = (distro: Distro): DistroFamily =>
  DISTRO_MAP[distro];
