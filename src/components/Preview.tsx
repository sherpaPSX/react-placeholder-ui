import { Alert } from "@mui/material";
import { useContext } from "react";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { AppContextProps } from "../models/Interfaces";

export default function Preview() {
  const { containerDimensions, elements } =
    useContext<AppContextProps>(AppContext);

  if (!elements.length) {
    return (
      <Alert severity="info" sx={{ marginRight: 2 }}>
        You have to add some elements first, than you can see preview :) Start
        in the <Link to="/">Editor</Link>
      </Alert>
    );
  }
  return (
    <ContentLoader
      viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
      backgroundColor="#CCD7E1"
      foregroundColor="#E6EBF0"
      width={containerDimensions.width}
      height={containerDimensions.height}
      style={{ border: "1px solid #d9d9d9" }}
    >
      {elements.map((item) => {
        if (item.isCircle)
          return (
            <circle
              key={item.id}
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
      })}
    </ContentLoader>
  );
}
