import { useEffect, useState } from "react";
import { getNational } from "../services/api";
import type { NationalSummary } from "../types";

export const useNational = () => {
  const [data, setData] = useState<NationalSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNational();
        setData(result);
      } catch (err) {
        console.log(err);
        setError("Gagal memuat data nasional");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
