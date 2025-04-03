import { useState } from "react";

export default function useMovieSearchForm(initialPrompt = "") {
  const [userPrompt, setUserPrompt] = useState(initialPrompt);

  const handleSubmit = (e, onSearch) => {
    if (!e.currentTarget.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    onSearch(userPrompt);
  };

  return { userPrompt, setUserPrompt, handleSubmit };
}
