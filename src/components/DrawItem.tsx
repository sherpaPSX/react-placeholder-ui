import { Rnd } from "react-rnd";
import { useContext, useState } from "react";
import classNames from "classnames";
import { AppContext } from "../AppContext";
import { DrawItemFunctions } from "../functions/drawItemFunctions";
import { AppContextProps, DrawItemProps } from "../models/Interfaces";

function roundToNearest(num: number, modulo: number) {
  return Math.round(num / modulo) * modulo;
}

export default function Element(props: DrawItemProps) {
  const { width, height, posX, posY, isNew, id, isCircle } = props;
  const { gridSize, elements, setElements } =
    useContext<AppContextProps>(AppContext);
  const [showButtons, setShowButtons] = useState(false);

  const methods = new DrawItemFunctions(elements, setElements);

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
        methods.onUpdateHadler({
          ...props,
          posX: roundToNearest(d.x, gridSize),
          posY: roundToNearest(d.y, gridSize),
          isNew: false,
        });
      }}
      onResize={(e, direction, ref, delta, position) => {
        methods.onUpdateHadler({
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
            <button onClick={() => methods.onCloneHandler({ ...props })}>
              Clone
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                methods.onDeleteHandler(id);
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
