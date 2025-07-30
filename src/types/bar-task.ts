import { Task, TaskType } from "./public-types";

export interface BarTask extends Task {
  index: number;
  typeInternal: TaskTypeInternal;
  x1: number;
  x2: number;
  ax1: number;
  ax2: number;
  shouldSplit: boolean;
  y: number;
  y1: number;
  height: number;
  /** Height of the actual bar when task is split */
  actualHeight?: number;
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  handleWidth: number;
  barChildren: BarTask[];
  showTaskNameonBar: boolean;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
    actualColor?: string;
  };
}

export type TaskTypeInternal = TaskType | "smalltask";
