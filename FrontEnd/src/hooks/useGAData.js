import { useState, useEffect } from "react";
import { getAnalyticsData } from "../api/analyticsApi";

const useGAData = (metric) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAnalyticsData(metric);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [metric]);

  return { data, loading, error };
};

export default useGAData;
