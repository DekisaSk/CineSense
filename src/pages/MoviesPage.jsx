import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Collapse,
  Select,
  MenuItem,
  InputLabel,
  FormControl as MuiFormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { Grid2 as Grid } from "@mui/material";

export default function MoviesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [type, setType] = useState("movie");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleToggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleApplyFilter = () => {
    console.log("Filters Applied:", { type, genre, year });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        mb={2}
      >
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
            variant="outlined"
            placeholder="Serach movies and TV shows"
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

        <Box
          sx={{
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 2, sm: 0 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleToggleFilter}
            startIcon={
              isFilterOpen ? <FilterListOffIcon /> : <FilterListIcon />
            }
            sx={{
              height: 54,
              width: "100%",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            Filters
          </Button>
        </Box>
      </Box>

      <Collapse in={isFilterOpen}>
        <Box
          mb={2}
          sx={{
            borderRadius: 1,
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={12} sm={4}>
              <MuiFormControl variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                >
                  <MenuItem value="movie">Movie</MenuItem>
                  <MenuItem value="tvshow">TV Show</MenuItem>
                </Select>
              </MuiFormControl>
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                variant="outlined"
                label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={4}>
              <TextField
                variant="outlined"
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button variant="contained" onClick={handleApplyFilter}>
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
