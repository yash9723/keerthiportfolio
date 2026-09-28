import { Ambulance, BriefcaseBusiness, ChartColumn, Code, LucideIcon, Music, Scale } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  scale: Scale,
  chart: ChartColumn,
  ambulance: Ambulance,
  music: Music,
  briefcase: BriefcaseBusiness
};

/** Resolves a project's `icon` key to its Lucide component. */
export const getProjectIcon = (key: string): LucideIcon => icons[key] ?? Code;
