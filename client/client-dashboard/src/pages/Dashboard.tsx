import React, { useState } from "react";
import MapIndonesia from "../components/dashboard/MapIndonesia";
import NationalSummarySection from "../components/dashboard/NationalSummary";
import SchoolTable from "../components/dashboard/SchoolTable";
import BudgetChart from "../components/dashboard/BudgetChart";
import { useNational } from "../hooks/useNational";
import { useProvince } from "../hooks/useProvince";
import { useNationalByProvince } from "../hooks/useNationalByProvince";
import RevitalizationBarChart from "../components/dashboard/RevitalizationBarChart";
import ProvinceSummarySection from "../components/dashboard/ProvinceSummary";
import { useDashboardData } from "../hooks/useDashboardData";
import BackButton from "../components/dashboard/BackButton";
import RegencyModal from "../components/dashboard/RegencyModal";
import { getRegency } from "../services/api";

const Dashboard: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedRegency, setSelectedRegency] = useState<number | null>(null);
  const [regencyData, setRegencyData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingRegency, setLoadingRegency] = useState(false);

  const { data: national, loading: nationalLoading } = useNational();
  const { data: province, loading: provinceLoading } =
    useProvince(selectedProvince);
  const { data: nationalByProvince, loading: provincesLoading } =
    useNationalByProvince();

  const { tableRows, chartData, dualChartData } = useDashboardData(
    selectedProvince,
    national,
    province,
    nationalByProvince
  );

  const handleProvinceClick = (provinceId: number) => {
    setSelectedProvince(provinceId);
  };

  const handleBackToNational = () => {
    setSelectedProvince(null);
    setSelectedRegency(null);
  };

  const handleRegencyClick = async (regencyId: number) => {
    setLoadingRegency(true);
    try {
      const data = await getRegency(regencyId);
      setRegencyData(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("❌ API Error:", error);
    } finally {
      setLoadingRegency(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRegency(null);
    setRegencyData(null);
  };

  if (nationalLoading || provincesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header dengan tombol kembali */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Revitalisasi Sekolah
        </h1>
        {selectedProvince && <BackButton onClick={handleBackToNational} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peta Indonesia */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h2 className="font-semibold text-zinc-800 text-lg ">
            Persebaran Program Revitalisasi Sekolah Nasional
          </h2>
          <p className="text-base text-zinc-500 mb-6">
            Menampilkan distribusi program revitalisasi sekolah di seluruh
            provinsi
          </p>
          <MapIndonesia
            onProvinceClick={handleProvinceClick}
            selectedProvince={selectedProvince}
          />
        </div>

        {/* Data Ringkasan */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h2 className="font-semibold text-zinc-800 text-lg">
            {selectedProvince
              ? `Data Ringkasan - Provinsi ${province?.province || ""}`
              : "Data Ringkasan - Nasional"}
          </h2>
          <p className="text-base text-zinc-500 mb-6">
            Detail alokasi anggaran untuk setiap tingkat pendidikan
          </p>

          {!selectedProvince ? (
            <NationalSummarySection />
          ) : provinceLoading ? (
            <div className="text-gray-500">Memuat data provinsi...</div>
          ) : province ? (
            <ProvinceSummarySection
              data={province?.summary || []}
              loading={provinceLoading}
            />
          ) : (
            <div className="text-red-500">Gagal memuat data provinsi</div>
          )}
        </div>
      </div>

      {/* Tabel dan Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabel - 2 kolom */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <SchoolTable
            title={
              selectedProvince
                ? `Tabel Revitalisasi Sekolah Provinsi – ${
                    province?.province || ""
                  }`
                : "Tabel Revitalisasi Sekolah Berdasarkan Provinsi"
            }
            subtitle={
              "Daftar jumlah sekolah yang direvitalisasi beserta anggaran"
            }
            rows={tableRows}
            onRegencyClick={selectedProvince ? handleRegencyClick : undefined}
            isProvinceSelected={!!selectedProvince}
          />
        </div>

        {/* Chart Donut kolom */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <BudgetChart
            title={
              selectedProvince
                ? `Anggaran Revitalisasi – Provinsi ${province?.province || ""}`
                : "Anggaran Revitalisasi – Nasional"
            }
            subtitle={"Per-tingkat pendidikan"}
            data={chartData}
          />
        </div>
      </div>

      {/* Bar Chart  */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <RevitalizationBarChart
          data={dualChartData}
          title={
            selectedProvince
              ? `Banyaknya Revitalisasi Sekolah Berdasarkan Anggaran Revitalisasi – Provinsi ${
                  province?.province || ""
                }`
              : "Banyaknya Revitalisasi Sekolah Berdasarkan Anggaran Revitalisasi – Nasional"
          }
          subtitle={
            selectedProvince
              ? "Jumlah sekolah dan anggaran per kabupaten/kota di provinsi terpilih"
              : "Jumlah sekolah dan anggaran per provinsi"
          }
        />
      </div>

      {/* Modal untuk Detail Kabupaten/Kota */}
      <RegencyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={regencyData}
      />
    </div>
  );
};

export default Dashboard;
