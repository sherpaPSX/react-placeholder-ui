import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CodeIcon from "@mui/icons-material/Code";
import PreviewIcon from "@mui/icons-material/Preview";

import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box
      sx={{
        textAlign: "right",
        backgroundColor: "grey.900",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography
        sx={{ color: "common.white", textAlign: "left" }}
        variant="h5"
        component="h1"
      >
        SVG Skeleton Generator GUI
      </Typography>
      <div>
        <Button
          component={NavLink}
          to="/"
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
        >
          Editor
        </Button>

        <Button
          component={NavLink}
          to="/code"
          variant="contained"
          color="primary"
          sx={{ marginLeft: 1 }}
          startIcon={<CodeIcon />}
        >
          Code
        </Button>
        <Button
          sx={{ marginLeft: 1 }}
          component={NavLink}
          to="/preview"
          variant="contained"
          color="primary"
          startIcon={<PreviewIcon />}
        >
          Preview
        </Button>
      </div>
    </Box>
  );
}
