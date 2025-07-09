import React, { useRef, useEffect, useState } from "react";
import { Task } from "../../types/public-types";
import { BarTask } from "../../types/bar-task";
import styles from "./tooltip.module.css";

export type TooltipProps = {
  task: BarTask;
  arrowIndent: number;
  rtl: boolean;
  svgContainerHeight: number;
  svgContainerWidth: number;
  svgWidth: number;
  headerHeight: number;
  taskListWidth: number;
  scrollX: number;
  scrollY: number;
  rowHeight: number;
  fontSize: string;
  fontFamily: string;
  TooltipContent: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
  }>;
};
export const Tooltip: React.FC<TooltipProps> = ({
  task,
  rowHeight,
  rtl,
  svgContainerHeight,
  svgContainerWidth,
  scrollX,
  scrollY,
  arrowIndent,
  fontSize,
  fontFamily,
  headerHeight,
  taskListWidth,
  TooltipContent,
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [relatedY, setRelatedY] = useState(0);
  const [relatedX, setRelatedX] = useState(0);
  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipHeight = tooltipRef.current.offsetHeight * 1.1;
      const tooltipWidth = tooltipRef.current.offsetWidth * 1.1;

      let newRelatedY = task.index * rowHeight - scrollY + headerHeight;
      let newRelatedX: number;
      if (rtl) {
        newRelatedX = task.x1 - arrowIndent * 1.5 - tooltipWidth - scrollX;
        if (newRelatedX < 0) {
          newRelatedX = task.x2 + arrowIndent * 1.5 - scrollX;
        }
        const tooltipLeftmostPoint = tooltipWidth + newRelatedX;
        if (tooltipLeftmostPoint > svgContainerWidth) {
          newRelatedX = svgContainerWidth - tooltipWidth;
          newRelatedY += rowHeight;
        }
      } else {
        newRelatedX = task.x2 + arrowIndent * 1.5 + taskListWidth - scrollX;
        const tooltipLeftmostPoint = tooltipWidth + newRelatedX;
        const fullChartWidth = taskListWidth + svgContainerWidth;
        if (tooltipLeftmostPoint > fullChartWidth) {
          newRelatedX =
            task.x1 +
            taskListWidth -
            arrowIndent * 1.5 -
            scrollX -
            tooltipWidth;
        }
        if (newRelatedX < taskListWidth) {
          newRelatedX = svgContainerWidth + taskListWidth - tooltipWidth;
          newRelatedY += rowHeight;
        }
      }

      const tooltipLowerPoint = tooltipHeight + newRelatedY - scrollY;
      if (tooltipLowerPoint > svgContainerHeight - scrollY) {
        newRelatedY = svgContainerHeight - tooltipHeight;
      }
      setRelatedY(newRelatedY);
      setRelatedX(newRelatedX);
    }
  }, [
    tooltipRef,
    task,
    arrowIndent,
    scrollX,
    scrollY,
    headerHeight,
    taskListWidth,
    rowHeight,
    svgContainerHeight,
    svgContainerWidth,
    rtl,
  ]);

  return (
    <div
      ref={tooltipRef}
      className={
        relatedX
          ? styles.tooltipDetailsContainer
          : styles.tooltipDetailsContainerHidden
      }
      style={{ left: relatedX, top: relatedY }}
    >
      <TooltipContent task={task} fontSize={fontSize} fontFamily={fontFamily} />
    </div>
  );
};

export const StandardTooltipContent: React.FC<{
  task: Task;
  fontSize: string;
  fontFamily: string;
}> = ({ task, fontSize, fontFamily }) => {
  const style = {
    fontSize,
    fontFamily,
  };
  return (
    // <div className={styles.tooltipDefaultContainer} style={style}>
    //   <b style={{ fontSize: fontSize + 6 }}>{`${
    //     task.name
    //   }: ${task.start.getDate()}-${
    //     task.start.getMonth() + 1
    //   }-${task.start.getFullYear()} - ${task.end.getDate()}-${
    //     task.end.getMonth() + 1
    //   }-${task.end.getFullYear()}`}</b>
    //   {task.end.getTime() - task.start.getTime() !== 0 && (
    //     <p className={styles.tooltipDefaultContainerParagraph}>{`Duration: ${~~(
    //       (task.end.getTime() - task.start.getTime()) /
    //       (1000 * 60 * 60 * 24)
    //     )} day(s)`}</p>
    //   )}

    //   <p className={styles.tooltipDefaultContainerParagraph}>
    //     {!!task.progress && `Progress: ${task.progress} %`}
    //   </p>
    // </div>

    <div className={styles.tooltipDefaultContainer} style={style}>
      <table className={styles.tooltipTable}>
        <tbody>
          <tr>
            <td className={styles.tooltipLabel}>Name</td>
            <td className={styles.tooltipValue}>{task.name}</td>
          </tr>
          {task.type != "milestone" && (
            <React.Fragment>
              <tr>
                <td className={styles.tooltipLabel}>Start Date</td>
                <td className={styles.tooltipValue}>
                  {`${task.start.getDate().toString().padStart(2, '0')}-${(task.start.getMonth() + 1).toString().padStart(2, '0')}-${task.start.getFullYear()}`}
                </td>
              </tr>
              <tr>
                <td className={styles.tooltipLabel}>End Date</td>
                <td className={styles.tooltipValue}>
                  {`${task.end.getDate().toString().padStart(2, '0')}-${(task.end.getMonth() + 1).toString().padStart(2, '0')}-${task.end.getFullYear()}`}
                </td>
              </tr>
            </React.Fragment>
          )}
          {task.type === "milestone" && (
            <tr>
            <td className={styles.tooltipLabel}>Date</td>
            <td className={styles.tooltipValue}>
              {`${task.start.getDate().toString().padStart(2, '0')}-${(task.start.getMonth() + 1).toString().padStart(2, '0')}-${task.start.getFullYear()}`}
            </td>
          </tr>
          )}
          {!!task.progress && (
            <tr>
              <td className={styles.tooltipLabel}>Progress</td>
              <td className={styles.tooltipValue}>{task.progress.toFixed(2)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
