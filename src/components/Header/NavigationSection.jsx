import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const pages = ["Home", "List", "Custom Page", "About Us"];

export default function NavigationSection() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
      }}
    >
      {pages.map((page) => (
        <Button
          key={page}
          sx={{
            my: 2,
            color: "white",
          }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
}
