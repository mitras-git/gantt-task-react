import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./milestone.module.css";

export const Milestone: React.FC<TaskItemProps> = ({
  task,
  isDateChangeable,
  onEventStart,
  isSelected,
}) => {
  const getBarColor = () => {
    return isSelected
      ? task.styles.backgroundSelectedColor
      : task.styles.backgroundColor;
  };

  const getSecondaryBarColor = () => {
    return task.styles.actualColor || "#80fa65";
  };

  const transform = `rotate(45 ${task.x1 + task.height * 0.356} ${
    task.y + task.height * 0.85
  })`;

  const actualTransform = `rotate(45 ${task.ax1 + task.height * 0.356} ${
    task.y + task.height * 0.85
  })`;

  return (
    <g tabIndex={0} className={styles.milestoneWrapper}>
      {task.shouldSplit && (
        <rect
          fill={getSecondaryBarColor()}
          x={task.ax1}
          width={task.height}
          y={task.y}
          height={task.height}
          rx={task.barCornerRadius}
          ry={task.barCornerRadius}
          transform={actualTransform}
          className={styles.milestoneBackground}
        />
      )}
      <rect
        fill={getBarColor()}
        x={task.x1}
        width={task.height}
        y={task.y}
        height={task.height}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        transform={transform}
        className={styles.milestoneBackground}
        onMouseDown={e => {
          isDateChangeable && onEventStart("move", task, e);
        }}
      />
    </g>
  );
};