import React, { useState } from "react";
import {
  Box,
  Container,
  Grid2 as Grid,
  Pagination,
  PaginationItem,
  InputLabel,
  Select,
  Menu,
  MenuItem,
  Collapse,
  TextField,
  FormControl as MuiFormControl,
} from "@mui/material";
import useMovies from "../hooks/useMovies.js";
import SmallMovieCard from "../components/SmallMovieCard";
import SearchBar from "../components/MoviesPageComponents/SearchBar";
import FilterButton from "../components/MoviesPageComponents/FilterButton";
import ItemCard from "../components/MoviesPageComponents/ItemCard.jsx";

const MAX_PAGE_ITEMS = 4;

export default function MoviesPage() {
  const {
    filteredItems,
    setSearchQuery,
    type,
    setType,
    genre,
    setGenre,
    year,
    setYear,
  } = useMovies();
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handlePageChange = (_, value) => setPage(value);
  const paginatedItems = filteredItems.slice(
    (page - 1) * MAX_PAGE_ITEMS,
    page * MAX_PAGE_ITEMS
  );
  const toggleFilter = () => {
    console.log("Jesmo li dobro: " + isFilterOpen);
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        mb={2}
      >
        <SearchBar setSearchQuery={setSearchQuery} />
        <FilterButton isFilterOpen={isFilterOpen} toggleFilter={toggleFilter} />
      </Box>

      <Collapse in={isFilterOpen}>
        <Box
          display="flex"
          gap={2}
          sx={{
            borderRadius: 1,
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: "100%", sm: "auto" }}>
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
            <Grid size={{ xs: "100%", sm: "auto" }}>
              <TextField
                variant="outlined"
                label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: "100%", sm: "auto" }}>
              <TextField
                variant="outlined"
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {paginatedItems.map((item) => (
            <Grid
              size={{ xs: "12", sm: "6" }}
              key={item.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ItemCard movie={item} />
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={Math.ceil(filteredItems.length / MAX_PAGE_ITEMS)}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{ fontWeight: item.page === page ? "bold" : "normal" }}
            />
          )}
          sx={{ display: "flex", justifyContent: "center", mt: 3 }}
        />
      </Container>
    </Box>
  );
}
