import { Box, Typography, Link } from "@mui/material";

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
        Developed By{" "}
        <Link href="https://www.linkedin.com/in/lukas-werner/" target="_blank">
          Lukas "Sherpa" Werner
        </Link>
      </Typography>
    </Box>
  );
}
