import { useState, useCallback } from "react";

export function useBigChart(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openBigChart = useCallback(() => setIsOpen(true), []);
  const closeBigChart = useCallback(() => setIsOpen(false), []);
  const toggleBigChart = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, openBigChart, closeBigChart, toggleBigChart };
}
