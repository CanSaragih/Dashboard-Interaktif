import axios from "axios";
import type {
  NationalProvinceRow,
  NationalSummary,
  ProvinceDetail,
} from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api",
});

export const getNational = async (): Promise<NationalSummary> => {
  const { data } = await api.get<NationalSummary>("/national");
  return data;
};

export const getProvince = async (
  provinceId: number
): Promise<ProvinceDetail> => {
  const res = await api.get<ProvinceDetail>(`/province/${provinceId}`);
  return res.data;
};

export const getNationalByProvince = async (): Promise<
  NationalProvinceRow[]
> => {
  const res = await api.get<NationalProvinceRow[]>("/national/by-province");
  return res.data;
};
