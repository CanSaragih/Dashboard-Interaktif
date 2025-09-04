import React, { useState } from "react";
import MapIndonesia from "../components/dashboard/MapIndonesia";
import NationalSummarySection from "../components/dashboard/NationalSummary";

const Dashboard: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Peta Indonesia */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200">
        <h2 className="text-base font-medium text-zinc-800">
          Persebaran Program Revitalisasi Sekolah Nasional
        </h2>
        <p className="text-base text-zinc-500 mb-6">
          Menampilkan distribusi program revitalisasi sekolah di seluruh
          provinsi
        </p>
        <MapIndonesia onProvinceClick={(id) => setSelectedProvince(id)} />
      </div>

      {/*  Data Ringkasan  */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200">
        <h2 className="text-base font-medium text-zinc-800 ">
          {selectedProvince
            ? "Data Ringkasan - (Menunggu Filtering Provinsi)"
            : "Data Ringkasan - Nasional"}
        </h2>
        <p className="text-base text-zinc-500 mb-4">
          Detail alokasi anggaran untuk setiap tingkat pendidikan
        </p>

        {!selectedProvince ? (
          <NationalSummarySection />
        ) : (
          <p className="text-gray-500">
            Silakan pilih provinsi untuk memuat data
          </p>
        )}
      </div>

      {/* Tabel Revitalisasi Sekolah */}
      <div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200">
          <h2 className="text-base font-medium text-zinc-800">
            Tabel Revitalisasi Sekolah Berdasarkan Provinsi
          </h2>
          <p className="text-base text-zinc-500 mb-6">
            Daftar jumlah sekolah yang direvitalisasi beserta anggaran
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
