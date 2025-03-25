import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const MovieSearchForm = ({ onSearch }) => {
  const [userPrompt, setUserPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(userPrompt);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Describe the movie you'd like to watch"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className="mt-4"
        fullWidth
        type="submit"
      >
        Find Movies
      </Button>
    </Box>
  );
};

export default MovieSearchForm;
