import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid2 as Grid,
  Pagination,
  PaginationItem,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  TextField,
  FormControl as MuiFormControl,
  CircularProgress,
  Typography,
} from "@mui/material";
import useSearch from "../hooks/useSearch";
import ItemCard from "../components/MoviesPageComponents/ItemCard";
import SearchBar from "../components/MoviesPageComponents/SearchBar";
import FilterButton from "../components/MoviesPageComponents/FilterButton";

const UI_ITEMS_PER_PAGE = 4;
const UI_PAGES_PER_API_PAGE = 5;

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("all");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [uiPage, setUiPage] = useState(1);

  const apiPage = useMemo(
    () => Math.ceil(uiPage / UI_PAGES_PER_API_PAGE),
    [uiPage]
  );

  const dynamicMax = uiPage + 50;

  const {
    items: apiItems,
    totalPages: apiTotalPages,
    loading,
    error,
  } = useSearch({
    query: searchQuery,
    type,
    genre,
    year,
    page: apiPage,
  });

  const uiTotalPages = useMemo(
    () => Math.min(apiTotalPages * UI_PAGES_PER_API_PAGE, dynamicMax),
    [apiTotalPages, dynamicMax]
  );

  const uiIndex = (uiPage - 1) % UI_PAGES_PER_API_PAGE;
  const uiItems = useMemo(() => {
    return apiItems.slice(
      uiIndex * UI_ITEMS_PER_PAGE,
      uiIndex * UI_ITEMS_PER_PAGE + UI_ITEMS_PER_PAGE
    );
  }, [apiItems, uiIndex]);

  const handlePageChange = (_, value) => setUiPage(value);
  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

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
            <Grid item xs={12} sm="auto">
              <MuiFormControl variant="outlined" fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Type"
                >
                  <MenuItem value="movie">Movie</MenuItem>
                  <MenuItem value="tv">TV Show</MenuItem>
                </Select>
              </MuiFormControl>
            </Grid>
            <Grid item xs={12} sm="auto">
              <TextField
                variant="outlined"
                label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm="auto">
              <TextField
                variant="outlined"
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      <Container sx={{ mt: 4 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography color="error">Error: {error.message}</Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {uiItems.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={item.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <ItemCard movie={item} />
                </Grid>
              ))}
            </Grid>

            <Pagination
              count={uiTotalPages}
              page={uiPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{ fontWeight: item.page === uiPage ? "bold" : "normal" }}
                />
              )}
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
            />
          </>
        )}
      </Container>
    </Box>
  );
}
