import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: "right",
        backgroundColor: "grey.900",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingX: 2,
        paddingY: 1,
      }}
    >
      <Typography color={"white"} fontSize={12}>
        Developed By Lukas "Sherpa" Werner
      </Typography>
    </Box>
  );
}
