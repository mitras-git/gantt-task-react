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
  };
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

      {progressWidth > barCornerRadius ? (
        <React.Fragment>
          <defs>
            <clipPath id={`barClipLeft-${x}`}>
              <rect
                x={progressX}
                y={y}
                width={progressWidth}
                height={height}
                rx={barCornerRadius}
                ry={barCornerRadius}
              />
              <rect
                x={progressX + barCornerRadius}
                y={y}
                width={progressWidth - barCornerRadius}
                height={height}
              />
            </clipPath>
          </defs>
          <rect
            x={progressX}
            width={progressWidth}
            y={y}
            height={height}
            fill={getProcessColor()}
            clipPath={`url(#barClipLeft-${x})`}
          />
        </React.Fragment>
      ) : (
        <rect
          x={progressX}
          width={progressWidth}
          y={y}
          height={height}
          rx={barCornerRadius}
          ry={barCornerRadius}
          fill={getProcessColor()}
        />
      )}
    </g>
  );
};
