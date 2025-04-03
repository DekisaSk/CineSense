import { Box, Button, TextField } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useMovieSearchForm from "../../hooks/useMovieSearchForm";

const MovieSearchForm = ({ onSearch }) => {
  const { userPrompt, setUserPrompt, handleSubmit } = useMovieSearchForm();

  return (
    <Box
      component="form"
      onSubmit={(e) => handleSubmit(e, onSearch)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
      noValidate={false}
    >
      <TextField
        label="Describe the movie"
        variant="outlined"
        required
        fullWidth
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          width: 56,
          height: 56,
          minWidth: 56,
          minHeight: 56,
          borderRadius: "50%",
          padding: 0,
        }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default MovieSearchForm;
