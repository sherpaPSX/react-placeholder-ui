import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { AppContextProps } from "../../models/Interfaces";

export default function TopToolBar() {
  const { gridSize, containerDimensions, setContainerDimensions, setGridSize } =
    useContext<AppContextProps>(AppContext);
  return (
    <header>
      <input
        type="number"
        step={2}
        placeholder="Grid size"
        value={gridSize}
        onChange={(ev) => setGridSize(parseInt(ev.target.value))}
      />
      <input
        type="number"
        step={gridSize}
        placeholder="Container width"
        value={containerDimensions.width}
        onChange={(ev) =>
          setContainerDimensions({
            width: parseInt(ev.target.value),
            height: containerDimensions.height,
          })
        }
      />
      <input
        type="number"
        step={gridSize}
        placeholder="Container height"
        value={containerDimensions.height}
        onChange={(ev) =>
          setContainerDimensions({
            width: containerDimensions.width,
            height: parseInt(ev.target.value),
          })
        }
      />
    </header>
  );
}
