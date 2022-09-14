import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { AppContextProps } from "../../models/Interfaces";
import ContainerToolbar from "./ContainerToolbar";
import ItemToolbar from "./ItemToolbar";

export default function TopToolBar() {
  const { selectedElement, elements } = useContext<AppContextProps>(AppContext);
  const findEl = elements.find((item) => item.id === selectedElement);
  return (
    <Box
      display="flex"
      padding={2}
      sx={{
        flexDirection: "row",
        backgroundColor: "grey.800",
      }}
    >
      {findEl ? <ItemToolbar {...findEl} /> : <ContainerToolbar />}
    </Box>
  );
}
