import { TextField } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { AppContextProps } from "../../models/Interfaces";

export default function ContainerToolbar() {
  const { gridSize, containerDimensions, setContainerDimensions, setGridSize } =
    useContext<AppContextProps>(AppContext);

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Grid size"
        variant="filled"
        type="number"
        size="small"
        inputProps={{
          step: 2,
        }}
        placeholder="Grid size"
        value={gridSize}
        onChange={(ev) => setGridSize(parseInt(ev.target.value))}
        sx={{ backgroundColor: "white", marginRight: 2 }}
      />

      <TextField
        id="outlined-basic"
        label="Container width"
        variant="filled"
        size="small"
        type="number"
        inputProps={{
          step: gridSize,
        }}
        placeholder="Container width"
        value={containerDimensions.width}
        onChange={(ev) =>
          setContainerDimensions({
            width: parseInt(ev.target.value),
            height: containerDimensions.height,
          })
        }
        sx={{ backgroundColor: "white", marginRight: 2 }}
      />

      <TextField
        id="outlined-basic"
        label="Container height"
        variant="filled"
        size="small"
        type="number"
        inputProps={{
          step: gridSize,
        }}
        placeholder="Container height"
        value={containerDimensions.height}
        onChange={(ev) =>
          setContainerDimensions({
            width: containerDimensions.width,
            height: parseInt(ev.target.value),
          })
        }
        sx={{ backgroundColor: "white" }}
      />
    </>
  );
}
