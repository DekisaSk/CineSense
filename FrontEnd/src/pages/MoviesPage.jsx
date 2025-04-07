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
import { useUserRole } from "../hooks/useCheckRole";
import { useRoleContext } from "../contexts/RoleContext";
import { useEffect } from "react";

const UI_ITEMS_PER_PAGE = 4;
const UI_PAGES_PER_API_PAGE = 5;

export default function MoviesPage() {
  const role = useUserRole();
  const { updateRole } = useRoleContext();
  useEffect(() => {
    if (role) {
      updateRole(role);
    }
  }, [role, updateRole]);
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("movie");
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
    genreList,
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
        gap={2}
      >
        <Box flexGrow={1}>
          <SearchBar setSearchQuery={setSearchQuery} />
        </Box>
        <FilterButton isFilterOpen={isFilterOpen} toggleFilter={toggleFilter} />
      </Box>

      <Collapse in={isFilterOpen}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          sx={{
            borderRadius: 1,
            padding: 2,
          }}
        >
          <MuiFormControl
            variant="outlined"
            sx={{ minWidth: 150, flex: "1 1 200px" }}
          >
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

          <MuiFormControl
            variant="outlined"
            sx={{ minWidth: 150, flex: "1 1 200px" }}
          >
            <InputLabel>Genre</InputLabel>
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              label="Genre"
            >
              <MenuItem value="">All</MenuItem>
              {genreList.map((g) => (
                <MenuItem key={g.genre_id} value={g.genre_id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </MuiFormControl>

          <TextField
            variant="outlined"
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={{ flex: "1 1 200px", minWidth: 150 }}
          />
        </Box>
      </Collapse>

      <Container sx={{ px: 2, py: 3 }}>
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
            <Grid container spacing={3} justifyContent="center">
              {uiItems.slice(0, 4).map((item) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={item.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box sx={{ width: "100%", maxWidth: 400 }}>
                    <ItemCard movie={item} />
                  </Box>
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
