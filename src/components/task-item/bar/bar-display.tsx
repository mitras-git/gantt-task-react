import React from "react";
import style from "./bar.module.css";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
    auctualColor?: string;
  };
  /**
   * Draw additional bar using these coordinates when task is split
   */
  actual?: { x: number; width: number; y: number; height: number } | null;
  shouldRenderSplit?: boolean;
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  isSelected,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
  actual,
  shouldRenderSplit,
  onMouseDown,
}) => {
  const getProcessColor = () => {
    return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  const getBarColor = () => {
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  };

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
      {shouldRenderSplit && actual && (
        <rect
          x={actual.x}
          width={actual.width}
          y={actual.y}
          height={actual.height}
          ry={barCornerRadius}
          rx={barCornerRadius}
          fill={styles.auctualColor || "#80fa65"}
          className={style.actualBackground}
        />
      )}
    </g>
  );

  // return (
  //   <g onMouseDown={onMouseDown}>
  //     <rect
  //       x={x}
  //       width={width}
  //       y={y}
  //       height={height}
  //       ry={barCornerRadius}
  //       rx={barCornerRadius}
  //       fill={getBarColor()}
  //       className={style.barBackground}
  //     />

  //     {progressWidth > barCornerRadius ? (
  //       <React.Fragment>
  //         <defs>
  //           <clipPath id={`barClipLeft-${x}`}>
  //             <rect
  //               x={progressX}
  //               y={y}
  //               width={progressWidth}
  //               height={height}
  //               rx={barCornerRadius}
  //               ry={barCornerRadius}
  //             />
  //             <rect
  //               x={progressX + barCornerRadius}
  //               y={y}
  //               width={progressWidth - barCornerRadius}
  //               height={height}
  //             />
  //           </clipPath>
  //         </defs>
  //         <rect
  //           x={progressX}
  //           width={progressWidth}
  //           y={y}
  //           height={height}
  //           fill={getProcessColor()}
  //           clipPath={`url(#barClipLeft-${x})`}
  //         />
  //       </React.Fragment>
  //     ) : (
  //       <rect
  //         x={progressX}
  //         width={progressWidth}
  //         y={y}
  //         height={height}
  //         rx={barCornerRadius}
  //         ry={barCornerRadius}
  //         fill={getProcessColor()}
  //       />
  //     )}
  //   </g>
  // );
};
