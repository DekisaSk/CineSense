import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Movies/Series", path: "/filter" },
  { name: "Smart Search", path: "/smartsearch" },
  { name: "About Us", path: "/about" },
];

export default function NavigationSection({ isHeader = false }) {
  const [highlightedButton, setHighlightedButton] = useState("Home");

  function handleHighlighting(pageName) {
    if (isHeader) {
      setHighlightedButton(pageName);
    }
  }

  const canHighlight = (name) => {
    return (
      isHeader &&
      highlightedButton.trim().toLowerCase() === name.trim().toLowerCase()
    );
  };

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
            color: "text.primary",
          }}
          component={Link}
          to={page.path}
          variant={canHighlight(page.name) ? "outlined" : "inherit"}
          color={canHighlight(page.name) ? "highlighted" : "inherit"}
          onClick={() => handleHighlighting(page.name)}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );
}
