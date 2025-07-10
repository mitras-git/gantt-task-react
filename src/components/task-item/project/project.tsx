import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./project.module.css";

export const Project: React.FC<TaskItemProps> = ({ task }) => {
  // const barColor = isSelected
  //   ? task.styles.backgroundSelectedColor
  //   : task.styles.backgroundColor;
  // const processColor = isSelected
  //   ? task.styles.progressSelectedColor
  //   : task.styles.progressColor;
  const projectWith = task.x2 - task.x1;

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      <rect
        fill="#e6a9a0"
        x={task.x1}
        width={projectWith}
        y={task.y}
        height={task.height}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        className={styles.projectBackground}
      />
      {/* <rect
        x={task.progressX}
        width={task.progressWidth}
        y={task.y}
        height={task.height}
        ry={task.barCornerRadius}
        rx={task.barCornerRadius}
        fill="#d67162"
      /> */}
      {task.progressWidth > task.barCornerRadius ? (
              <React.Fragment>
                <defs>
                  <clipPath id={`barClipLeft-${task.x1}`}>
                    <rect
                      x={task.progressX}
                      y={task.y}
                      width={task.progressWidth}
                      height={task.height}
                      rx={task.barCornerRadius}
                      ry={task.barCornerRadius}
                    />
                    <rect
                      x={task.progressX + task.barCornerRadius}
                      y={task.y}
                      width={task.progressWidth - task.barCornerRadius}
                      height={task.height}
                    />
                  </clipPath>
                </defs>
                <rect
                  x={task.progressX}
                  width={task.progressWidth}
                  y={task.y}
                  height={task.height}
                  fill="#d67162"
                  clipPath={`url(#barClipLeft-${task.x1})`}
                />
              </React.Fragment>
            ) : (
              <rect
                x={task.progressX}
                width={task.progressWidth}
                y={task.y}
                height={task.height}
                rx={task.barCornerRadius}
                ry={task.barCornerRadius}
                fill="#d67162"
              />
            )}
    </g>
  );
};
