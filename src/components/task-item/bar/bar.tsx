import React from "react";
import { BarDisplay } from "./bar-display";
import { TaskItemProps } from "../task-item";
import styles from "./bar.module.css";

export const Bar: React.FC<TaskItemProps> = ({
  task,
  isDateChangeable,
  onEventStart,
  isSelected,
  shouldRenderSplit,
  actualCoordinates,
}) => {
  return (
    <g className={styles.barWrapper} tabIndex={0}>
      <BarDisplay
        x={task.x1}
        y={task.y}
        width={task.x2 - task.x1}
        height={task.height}
        progressX={task.progressX}
        progressWidth={task.progressWidth}
        barCornerRadius={task.barCornerRadius}
        styles={task.styles}
        actual={
          shouldRenderSplit && actualCoordinates
            ? {
                x: actualCoordinates.ax1,
                width: actualCoordinates.ax2 - actualCoordinates.ax1,
                y: actualCoordinates.ay,
                height: task.actualHeight || task.height,
              }
            : null
        }
        shouldRenderSplit={shouldRenderSplit}
        isSelected={isSelected}
        onMouseDown={e => {
          isDateChangeable && onEventStart("move", task, e);
        }}
      />
    </g>
  );
};
