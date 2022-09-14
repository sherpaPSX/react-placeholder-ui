import React, { useContext } from "react";
import DrawItemProps from "../models/DrawItem";
import { AppContext } from "../App";
import ContentLoader from "react-content-loader";

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
      />
    );
  });
};

export default function Preview() {
  const { elements, containerHeight } = useContext(AppContext);
  return (
    <ContentLoader
      viewBox={`0 0 1000 ${containerHeight}`}
      backgroundColor="#CCD7E1"
      foregroundColor="#E6EBF0"
    >
      {SVGrender(elements)}
    </ContentLoader>
  );
}
