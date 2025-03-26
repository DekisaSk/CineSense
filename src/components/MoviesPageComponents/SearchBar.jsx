import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ setSearchQuery }) {
  return (
    <>
      <Box
        display="flex"
        gap={2}
        sx={{
          alignItems: "center",
          height: "100%",
          width: { xs: "100%", sm: "auto" },
          borderRadius: 1,
          padding: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search movies and TV shows"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ height: 54 }}
        />
        <Button
          margin="0.3rem"
          variant="contained"
          sx={{
            display: "flex",
            height: 54,
            padding: { xs: "0 1.5rem" },
            width: { xs: 54, sm: "auto" },
            minWidth: { xs: 54, sm: "auto" },
            justifyContent: "center",
            alignItems: "center",
          }}
          startIcon={<SearchIcon />}
        >
          <Typography
            sx={{
              display: { xs: "none", sm: "inline" },
            }}
          >
            Search
          </Typography>
        </Button>
      </Box>
    </>
  );
}
