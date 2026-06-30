/**
 * Icon registry — maps stable string keys to Remix Icon components.
 * Used by client components (ExpertiseBlock, RoadmapBlock) to resolve
 * icon keys coming from server-serializable data in lib/data.ts.
 * Adding a new icon here is the only change needed to support it everywhere.
 */
import {
  RiCpuLine,
  RiLayout3Line,
  RiRocketLine,
  RiServerLine,
  RiDatabase2Line,
  RiExchangeBoxLine,
  RiLayoutMasonryLine,
  RiMagicLine,
  RiSmartphoneLine,
  RiHardDrive2Line,
  RiShieldKeyholeLine,
  RiTerminalBoxLine,
  RiToolsLine,
  RiReactjsLine,
  RiJavascriptLine,
  RiTailwindCssFill,
  RiNodejsLine,
  RiTerminalWindowLine,
  RiGithubLine,
  RiUbuntuLine,
  RiCloudWindyLine,
} from "@remixicon/react";

export const ICON_REGISTRY = {
  RiCpuLine,
  RiLayout3Line,
  RiRocketLine,
  RiServerLine,
  RiDatabase2Line,
  RiExchangeBoxLine,
  RiLayoutMasonryLine,
  RiMagicLine,
  RiSmartphoneLine,
  RiHardDrive2Line,
  RiShieldKeyholeLine,
  RiTerminalBoxLine,
  RiToolsLine,
  RiReactjsLine,
  RiJavascriptLine,
  RiTailwindCssFill,
  RiNodejsLine,
  RiTerminalWindowLine,
  RiGithubLine,
  RiUbuntuLine,
  RiCloudWindyLine,
} as const;

export type IconKey = keyof typeof ICON_REGISTRY;
