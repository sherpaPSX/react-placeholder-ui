import { Rnd } from "react-rnd";
import { useContext } from "react";
import classNames from "classnames";
import { AppContext } from "../AppContext";
import { DrawItemFunctions } from "../functions/drawItemFunctions";
import { AppContextProps, DrawItemProps } from "../models/Interfaces";
import { Box } from "@mui/material";

export default function Element(props: DrawItemProps) {
  const { width, height, posX, posY, id, isCircle, rounded } = props;
  const {
    gridSize,
    elements,
    setElements,
    selectedElement,
    setSelectedElement,
  } = useContext<AppContextProps>(AppContext);

  const methods = new DrawItemFunctions(
    elements,
    setElements,
    setSelectedElement
  );

  const isSelected = selectedElement === id;

  return (
    <Rnd
      bounds=".wrapper"
      className={classNames(
        { "is-circle": isCircle, "is-selected": isSelected },
        "draw-item"
      )}
      style={{ borderRadius: isCircle ? undefined : rounded }}
      position={{
        x: posX,
        y: posY,
      }}
      size={{ width, height }}
      onDragStop={(e, d) => {
        methods.onUpdate({
          ...props,
          posX: methods.roundToNearest(d.x, gridSize),
          posY: methods.roundToNearest(d.y, gridSize),
        });
      }}
      onResize={(e, direction, ref, delta, position) => {
        methods.onUpdate({
          ...props,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          posX: position.x,
          posY: position.y,
        });
      }}
      dragGrid={[gridSize, gridSize]}
      resizeGrid={[gridSize, gridSize]}
      lockAspectRatio={isCircle}
    >
      <Box
        onClick={(ev) => {
          ev.stopPropagation();
          setSelectedElement(id);
        }}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      ></Box>
    </Rnd>
  );
}
