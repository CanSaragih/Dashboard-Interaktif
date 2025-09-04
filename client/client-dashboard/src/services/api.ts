import axios from "axios";
import type { NationalSummary } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",
});

export const getNational = async (): Promise<NationalSummary> => {
  const { data } = await api.get<NationalSummary>("/national");
  return data;
};
