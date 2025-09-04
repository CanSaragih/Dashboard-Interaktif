import React from "react";
import SummaryCard from "./SummaryCard";
import { useNational } from "../../hooks/useNational";

const NationalSummarySection: React.FC = () => {
  const { data, loading, error } = useNational();

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Total Revitalisasi */}
        <SummaryCard
          label="Total Revitalisasi Sekolah"
          value={data?.total?.toLocaleString("id-ID") ?? "0"}
          color="bg-blue-50"
          borderColor="border-l-blue-500"
        />
        <SummaryCard
          label="Anggaran Total Revitalisasi Sekolah"
          value={`Rp ${data?.totalAnggaran?.toLocaleString("id-ID") ?? "0"},00`}
          color="bg-blue-50"
          borderColor="border-l-blue-500"
        />

        {/* PAUD */}
        <SummaryCard
          label="Revitalisasi Sekolah PAUD"
          value={data?.paud?.jumlah?.toLocaleString("id-ID") ?? "0"}
          color="bg-green-50"
          borderColor="border-l-green-500"
        />
        <SummaryCard
          label="Anggaran Revitalisasi Sekolah PAUD"
          value={`Rp ${
            data?.paud?.anggaran?.toLocaleString("id-ID") ?? "0"
          },00`}
          color="bg-green-50"
          borderColor="border-l-green-500"
        />

        {/* SD */}
        <SummaryCard
          label="Revitalisasi Sekolah SD"
          value={data?.sd?.jumlah?.toLocaleString("id-ID") ?? "0"}
          color="bg-yellow-50"
          borderColor="border-l-yellow-500"
        />
        <SummaryCard
          label="Anggaran Revitalisasi Sekolah SD"
          value={`Rp ${data?.sd?.anggaran?.toLocaleString("id-ID") ?? "0"},00`}
          color="bg-yellow-50"
          borderColor="border-l-yellow-500"
        />

        {/* SMP */}
        <SummaryCard
          label="Revitalisasi Sekolah SMP"
          value={data?.smp?.jumlah?.toLocaleString("id-ID") ?? "0"}
          color="bg-purple-50"
          borderColor="border-l-purple-500"
        />
        <SummaryCard
          label="Anggaran Revitalisasi Sekolah SMP"
          value={`Rp ${data?.smp?.anggaran?.toLocaleString("id-ID") ?? "0"},00`}
          color="bg-purple-50"
          borderColor="border-l-purple-500"
        />

        {/* SMA */}
        <SummaryCard
          label="Revitalisasi Sekolah SMA"
          value={data?.sma?.jumlah?.toLocaleString("id-ID") ?? "0"}
          color="bg-red-50"
          borderColor="border-l-red-500"
        />
        <SummaryCard
          label="Anggaran Revitalisasi Sekolah SMA"
          value={`Rp ${data?.sma?.anggaran?.toLocaleString("id-ID") ?? "0"},00`}
          color="bg-red-50"
          borderColor="border-l-red-500"
        />
      </div>
    </div>
  );
};

export default NationalSummarySection;
