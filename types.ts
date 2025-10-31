// Fix: Import `ElementType` from `react` to resolve namespace errors.
import type { ElementType } from 'react';

export interface SummaryCategory {
  title: string;
  taskCount: number;
  // Fix: Replaced `React.ElementType` with `ElementType` to fix error on line 5.
  icon: ElementType;
  color: string;
  bgColor: string;
}

export interface Task {
  id: number;
  title: string;
  emoji: string;
  description: string;
  time?: string;
  // Fix: Replaced `React.ElementType` with `ElementType` to fix error on line 16.
  icon: ElementType;
  iconBgColor: string;
}

export interface ScheduleItem {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  color: string;
  isLunch?: boolean;
}
