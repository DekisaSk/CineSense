import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "List", path: "/list" },
  { name: "Smart Search", path: "/smartsearch" },
  { name: "About Us", path: "/about" },
];

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
          key={page.name}
          sx={{
            my: 2,
            color: "white",
          }}
          component={Link}
          to={page.path}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}
