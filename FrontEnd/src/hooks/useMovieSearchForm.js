import { useState } from "react";

export default function useMovieSearchForm() {
  const [userPrompt, setUserPrompt] = useState("");
  const [mediaType, setMediaType] = useState("movie");

  const handleSubmit = (e, onSearch, selectedType) => {
    e.preventDefault();
    if (userPrompt.trim()) {
      onSearch(userPrompt, selectedType || mediaType);
    }
  };

  return {
    userPrompt,
    setUserPrompt,
    mediaType,
    setMediaType,
    handleSubmit,
  };
}
