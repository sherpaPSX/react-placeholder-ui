import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { AppContextProps } from "../../models/Interfaces";
import { Box, IconButton, Tooltip } from "@mui/material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { DrawItemFunctions } from "../../functions/drawItemFunctions";

export default function Toolbar() {
  const { elements, setElements, setSelectedElement } =
    useContext<AppContextProps>(AppContext);
  const methods = new DrawItemFunctions(
    elements,
    setElements,
    setSelectedElement
  );
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        backgroundColor: "grey.800",
      }}
      padding={1}
    >
      <Tooltip title="Add rectangle" placement="right">
        <IconButton
          aria-label="Add rectangle"
          sx={{ color: "white" }}
          onClick={() => setElements([...elements, methods.renderNewElement()])}
        >
          <CropSquareIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add circle" placement="right">
        <IconButton
          aria-label="Add circle"
          sx={{ color: "white" }}
          onClick={() =>
            setElements([...elements, methods.renderNewElement(true)])
          }
        >
          <PanoramaFishEyeIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
