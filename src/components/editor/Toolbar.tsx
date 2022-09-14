import { useContext } from "react";
import { AppContext } from "../../AppContext";
import uniqid from "uniqid";
import { AppContextProps, DrawItemProps } from "../../models/Interfaces";
import { Box, IconButton, Tooltip } from "@mui/material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { DrawItemFunctions } from "../../functions/drawItemFunctions";

export default function Toolbar() {
  const { elements, setElements } = useContext<AppContextProps>(AppContext);
  const methods = new DrawItemFunctions(elements, setElements);
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        backgroundColor: "grey.800",
      }}
      padding={1}
    >
      <Tooltip title="Add rectangle">
        <IconButton
          aria-label="Add rectangle"
          sx={{ color: "white" }}
          onClick={() => setElements([...elements, methods.renderNewElement()])}
        >
          <CropSquareIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add circle">
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
