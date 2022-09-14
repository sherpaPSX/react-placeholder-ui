import { Box } from "@mui/material";
import { useContext } from "react";
import { Rnd } from "react-rnd";
import { AppContext } from "../../AppContext";
import { AppContextProps } from "../../models/Interfaces";
import DrawItem from "../DrawItem";
import Toolbar from "./Toolbar";
import TopToolBar from "./TopToolBar";

export default function Editor() {
  const { containerDimensions, setContainerDimensions, gridSize, elements } =
    useContext<AppContextProps>(AppContext);

  return (
    <>
      <TopToolBar />
      <Box display="flex" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Box position="relative" padding={2}>
          <Rnd
            disableDragging={true}
            style={{ backgroundSize: `${gridSize}px ${gridSize}px` }}
            size={{
              width: containerDimensions.width + 1,
              height: containerDimensions.height + 1,
            }}
            position={{ x: 16, y: 16 }}
            className="wrapper"
            resizeGrid={[gridSize, gridSize]}
            onResize={(e, direction, ref, delta, position) => {
              setContainerDimensions({
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              });
            }}
          >
            {elements.map((item) => (
              <DrawItem {...item} key={item.id} />
            ))}
          </Rnd>
        </Box>
      </Box>
    </>
  );
}
