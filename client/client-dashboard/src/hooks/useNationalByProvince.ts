import { useEffect, useState } from "react";
import { getNationalByProvince } from "../services/api";
import type { NationalProvinceRow } from "../types";

export const useNationalByProvince = () => {
  const [data, setData] = useState<NationalProvinceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getNationalByProvince();
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data provinsi");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
