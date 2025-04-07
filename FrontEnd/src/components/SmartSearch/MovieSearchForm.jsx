import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useMovieSearchForm from "../../hooks/useMovieSearchForm";

const MovieSearchForm = ({ onSearch }) => {
  const { userPrompt, setUserPrompt, handleSubmit, mediaType, setMediaType } =
    useMovieSearchForm();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, onSearch, mediaType);
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", gap: 2 }}>
      <Select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <MenuItem value="movie">Movie</MenuItem>
        <MenuItem value="tv">TV Show</MenuItem>
      </Select>

      <TextField
        label="Describe the content"
        fullWidth
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ minWidth: 56, minHeight: 56 }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default MovieSearchForm;
