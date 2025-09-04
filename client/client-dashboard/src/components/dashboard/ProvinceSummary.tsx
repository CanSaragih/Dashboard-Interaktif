// components/dashboard/ProvinceSummary.tsx
import React from "react";
import SummaryCard from "./SummaryCard";

interface SummaryItem {
  jenjang: string;
  totalSekolah: number;
  totalAnggaran: number;
}

interface Props {
  data: SummaryItem[];
  loading?: boolean;
}

const ProvinceSummarySection: React.FC<Props> = ({ data, loading = false }) => {
  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!data || data.length === 0)
    return <p className="text-red-500">Tidak ada data</p>;

  const jenjangOrder = ["paud", "sd", "smp", "sma"];

  const jenjangStyles: Record<string, { color: string; border: string }> = {
    paud: { color: "bg-green-50", border: "border-l-green-500" },
    sd: { color: "bg-yellow-50", border: "border-l-yellow-500" },
    smp: { color: "bg-purple-50", border: "border-l-purple-500" },
    sma: { color: "bg-red-50", border: "border-l-red-500" },
  };

  const totalSekolah = data.reduce(
    (acc, item) => acc + (item.totalSekolah || 0),
    0
  );
  const totalAnggaran = data.reduce(
    (acc, item) => acc + (item.totalAnggaran || 0),
    0
  );

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        {/* Total */}
        <SummaryCard
          label="Total Revitalisasi Sekolah"
          value={totalSekolah.toLocaleString("id-ID")}
          color="bg-blue-50"
          borderColor="border-l-blue-500"
        />
        <SummaryCard
          label="Anggaran Total Revitalisasi Sekolah"
          value={`Rp ${totalAnggaran.toLocaleString("id-ID")},00`}
          color="bg-blue-50"
          borderColor="border-l-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {jenjangOrder.map((jenjang) => {
          const item = data.find((d) => d.jenjang.toLowerCase() === jenjang);
          if (!item) return null;
          const style = jenjangStyles[jenjang];

          return (
            <React.Fragment key={jenjang}>
              <SummaryCard
                label={`Revitalisasi Sekolah ${jenjang.toUpperCase()}`}
                value={item.totalSekolah.toLocaleString("id-ID")}
                color={style.color}
                borderColor={style.border}
              />
              <SummaryCard
                label={`Anggaran Revitalisasi Sekolah ${jenjang.toUpperCase()}`}
                value={`Rp ${item.totalAnggaran.toLocaleString("id-ID")},00`}
                color={style.color}
                borderColor={style.border}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProvinceSummarySection;
