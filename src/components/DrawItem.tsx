import { Rnd } from "react-rnd";
import { useContext, useState } from "react";
import classNames from "classnames";
import { AppContext } from "../AppContext";
import { DrawItemFunctions } from "../functions/drawItemFunctions";
import { AppContextProps, DrawItemProps } from "../models/Interfaces";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
        "draw-item"
      )}
      position={{
        x: posX,
        y: posY,
      }}
      size={{ width, height }}
      onDragStop={(e, d) => {
        methods.onUpdateHadler({
          ...props,
          posX: methods.roundToNearest(d.x, gridSize),
          posY: methods.roundToNearest(d.y, gridSize),
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
      <Box
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        {showButtons && (
          <Box
            position="absolute"
            sx={{ right: 0, top: 0, backgroundColor: "rgba(0,0,0, .2)" }}
          >
            <Tooltip title="Clone element">
              <IconButton
                aria-label="Clone element"
                onClick={() => methods.onCloneHandler({ ...props })}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete element">
              <IconButton
                aria-label="Delete element"
                onClick={(e) => {
                  e.preventDefault();
                  methods.onDeleteHandler(id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Rnd>
  );
}
