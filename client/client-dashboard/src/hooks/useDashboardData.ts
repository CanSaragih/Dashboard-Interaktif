// src/hooks/useDashboardData.ts
import { useMemo } from "react";
import type { NationalSummary, ProvinceDetail } from "../types";
import type { NationalProvinceRow } from "../types";

export const useDashboardData = (
  selectedProvince: number | null,
  national: NationalSummary | null,
  province: ProvinceDetail | null,
  nationalByProvince: NationalProvinceRow[]
) => {
  // Tabel
  const tableRows = useMemo(() => {
    if (selectedProvince && province) {
      return province.regencyData.map((r) => ({
        provinsi: r.regencyName,
        jenjang: r.jenjang,
        jumlah: r.totalSekolah,
        anggaran: r.totalAnggaran,
        regencyId: r.regencyId,
        regencyName: r.regencyName,
      }));
    }
    return nationalByProvince
      .map((p) => [
        {
          provinsi: p.provinceName,
          jenjang: "PAUD",
          jumlah: p.paud.jumlah,
          anggaran: p.paud.anggaran,
        },
        {
          provinsi: p.provinceName,
          jenjang: "SD",
          jumlah: p.sd.jumlah,
          anggaran: p.sd.anggaran,
        },
        {
          provinsi: p.provinceName,
          jenjang: "SMP",
          jumlah: p.smp.jumlah,
          anggaran: p.smp.anggaran,
        },
        {
          provinsi: p.provinceName,
          jenjang: "SMA",
          jumlah: p.sma.jumlah,
          anggaran: p.sma.anggaran,
        },
      ])
      .flat();
  }, [selectedProvince, province, nationalByProvince]);

  // Donut chart
  const chartData = useMemo(() => {
    if (selectedProvince && province) {
      return province.summary.map((s) => ({
        name: s.jenjang.toUpperCase(),
        value: s.totalAnggaran,
      }));
    }
    if (national) {
      return [
        { name: "PAUD", value: national.paud.anggaran },
        { name: "SD", value: national.sd.anggaran },
        { name: "SMP", value: national.smp.anggaran },
        { name: "SMA", value: national.sma.anggaran },
      ];
    }
    return [];
  }, [selectedProvince, province, national]);

  // Bar+Line chart
  const dualChartData = useMemo(() => {
    if (selectedProvince && province) {
      return province.regencyData.map((r) => ({
        name: r.regencyName,
        sekolah: r.totalSekolah,
        anggaran: r.totalAnggaran,
      }));
    }
    return nationalByProvince.map((p) => ({
      name: p.provinceName,
      sekolah: p.paud.jumlah + p.sd.jumlah + p.smp.jumlah + p.sma.jumlah,
      anggaran:
        p.paud.anggaran + p.sd.anggaran + p.smp.anggaran + p.sma.anggaran,
    }));
  }, [selectedProvince, province, nationalByProvince]);

  return { tableRows, chartData, dualChartData };
};
