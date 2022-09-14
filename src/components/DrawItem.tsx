import { Rnd } from "react-rnd";
import React, { useContext, useEffect, useState } from "react";
import DrawItemProps from "../models/DrawItem";
import { AppContext, AppContextProps } from "../App";
import classNames from "classnames";

interface Props extends DrawItemProps {
  onUpdate: (props: DrawItemProps) => void;
  onClone: (props: DrawItemProps) => void;
  onDelete: (id: string) => void;
}

function roundToNearest(num: number, modulo: number) {
  return Math.round(num / modulo) * modulo;
}

export default function Element(props: Props) {
  const {
    width,
    height,
    posX,
    posY,
    isNew,
    onUpdate,
    onClone,
    onDelete,
    id,
    isCircle,
  } = props;
  const { gridSize } = useContext(AppContext);
  const [showButtons, setShowButtons] = useState(false);

  return (
    <Rnd
      bounds=".wrapper"
      className={classNames(
        { "is-new": isNew, "is-circle": isCircle },
        "draw-item "
      )}
      position={{
        x: posX,
        y: posY,
      }}
      size={{ width, height }}
      onDragStop={(e, d) => {
        onUpdate({
          ...props,
          posX: roundToNearest(d.x, gridSize),
          posY: roundToNearest(d.y, gridSize),
          isNew: false,
        });
      }}
      onResize={(e, direction, ref, delta, position) => {
        onUpdate({
          ...props,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          posX: position.x,
          posY: position.y,
          isNew: false,
        });
      }}
      dragGrid={[gridSize, gridSize]}
      resizeGrid={[gridSize, gridSize]}
      lockAspectRatio={isCircle}
    >
      <div
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {width} X {height}
        {showButtons && (
          <>
            <button onClick={() => onClone({ ...props })}>Clone</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(id);
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </Rnd>
  );
}
