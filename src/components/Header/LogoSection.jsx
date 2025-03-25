import Typography from "@mui/material/Typography";
import { Box, Button, SvgIcon } from "@mui/material";

export function Logo() {
  return (
    <SvgIcon>
      <image
        href="src/assets/icon.png"
        alt="Custom Icon"
        height="24"
        width="24"
      />
    </SvgIcon>
  );
}

export default function LogoSection() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: { xs: "100%", md: "auto" }, // Center logo on mobile
      }}
    >
      <Button
        variant="contained"
        startIcon={<Logo />}
        color="primary"
        disableElevation
      >
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#"
          sx={{
            letterSpacing: ".3rem",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          CineSense
        </Typography>
      </Button>
    </Box>
  );
}
