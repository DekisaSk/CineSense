import React from "react";
import { Box, Button } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

export default function FilterButton({ isFilterOpen, toggleFilter }) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "auto" },
        mt: { xs: 2, sm: 0 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={toggleFilter}
        startIcon={isFilterOpen ? <FilterListOffIcon /> : <FilterListIcon />}
        sx={{
          height: 54,
          width: "100%",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        {isFilterOpen ? "Hide Filters" : "Show Filters"}
      </Button>
    </Box>
  );
}
