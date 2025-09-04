import React, { useState } from "react";
import MapIndonesia from "../components/dashboard/MapIndonesia";
import NationalSummarySection from "../components/dashboard/NationalSummary";
import SchoolTable from "../components/dashboard/SchoolTable";
import BudgetChart from "../components/dashboard/BudgetChart";
import { useNational } from "../hooks/useNational";
import { useProvince } from "../hooks/useProvince";
import { useNationalByProvince } from "../hooks/useNationalByProvince";

const Dashboard: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);

  const { data: national } = useNational();
  const { data: province } = useProvince(selectedProvince);
  const { data: nationalByProvince } = useNationalByProvince();

  //  Table rows
  const tableRows = selectedProvince
    ? province?.regencyData.map((r) => ({
        provinsi: r.regencyName,
        jenjang: r.jenjang,
        jumlah: r.totalSekolah,
        anggaran: r.totalAnggaran,
      })) ?? []
    : nationalByProvince
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

  //  Chart data
  const chartData = selectedProvince
    ? province?.summary.map((s) => ({
        name: s.jenjang.toUpperCase(),
        value: s.totalAnggaran,
      })) ?? []
    : national
    ? [
        { name: "PAUD", value: national.paud.anggaran },
        { name: "SD", value: national.sd.anggaran },
        { name: "SMP", value: national.smp.anggaran },
        { name: "SMA", value: national.sma.anggaran },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Peta Indonesia */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200">
        <h2 className="font-semibold text-zinc-800">
          Persebaran Program Revitalisasi Sekolah Nasional
        </h2>
        <p className="text-base text-zinc-500 mb-6">
          Menampilkan distribusi program revitalisasi sekolah di seluruh
          provinsi
        </p>
        <MapIndonesia onProvinceClick={(id) => setSelectedProvince(id)} />
      </div>

      {/* Data Ringkasan */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200">
        <h2 className="font-semibold text-zinc-800 ">
          {selectedProvince
            ? `Data Ringkasan - Provinsi ${province?.province ?? ""}`
            : "Data Ringkasan - Nasional"}
        </h2>
        <p className="text-base text-zinc-500 mb-4">
          Detail alokasi anggaran untuk setiap tingkat pendidikan
        </p>
        {!selectedProvince ? (
          <NationalSummarySection />
        ) : province ? (
          <div className="grid grid-cols-2 gap-4">
            {province.summary.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border bg-gray-50 shadow-sm"
              >
                <p className="text-sm font-medium text-gray-600">
                  Revitalisasi {s.jenjang.toUpperCase()}
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {s.totalSekolah.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-500">
                  Rp {s.totalAnggaran.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Memuat data provinsi...</p>
        )}
      </div>

      {/* Tabel  */}
      <div className="col-span-2 grid grid-cols-3 gap-4">
        <div className="col-span-2 border border-zinc-200 rounded-2xl">
          <SchoolTable
            title={
              selectedProvince
                ? `Tabel Revitalisasi Sekolah Provinsi – ${
                    province?.province ?? ""
                  }`
                : "Tabel Revitalisasi Sekolah Berdasarkan Provinsi"
            }
            subtitle={
              "Daftar jumlah sekolah yang direvitalisasi beserta anggaran"
            }
            rows={tableRows}
          />
        </div>

        {/* Chart */}
        <div className="col-span-1 border border-zinc-200 rounded-2xl p-6 ">
          <BudgetChart
            title={
              selectedProvince
                ? `Anggaran Revitalisasi – Provinsi ${province?.province ?? ""}`
                : "Anggaran Revitalisasi – Nasional"
            }
            subtitle={"Per-tingkat pendidikan"}
            data={chartData}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
