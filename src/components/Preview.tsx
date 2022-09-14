import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import { AppContext } from "../AppContext";
import { AppContextProps, DrawItemProps } from "../models/Interfaces";

export const SVGrender = (elements: DrawItemProps[]) => {
  return elements.map((item) => {
    if (item.isCircle)
      return (
        <circle
          cx={item.posX + item.width / 2}
          cy={item.posY + item.width / 2}
          r={item.width / 2}
        />
      );
    return (
      <rect
        key={item.id}
        x={item.posX}
        y={item.posY}
        width={item.width}
        height={item.height}
        rx={item.rounded}
        ry={item.rounded}
      />
    );
  });
};

export default function Preview() {
  const { containerDimensions, elements } =
    useContext<AppContextProps>(AppContext);
  return (
    <ContentLoader
      viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
      backgroundColor="#CCD7E1"
      foregroundColor="#E6EBF0"
      width={containerDimensions.width}
      height={containerDimensions.height}
    >
      {SVGrender(elements)}
    </ContentLoader>
  );
}
