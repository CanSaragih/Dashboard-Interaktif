import { useEffect, useState } from "react";
import { getProvince } from "../services/api";
import type { ProvinceDetail } from "../types";

export const useProvince = (provinceId: number | null) => {
  const [data, setData] = useState<ProvinceDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provinceId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getProvince(provinceId);
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data provinsi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [provinceId]);

  return { data, loading, error };
};
