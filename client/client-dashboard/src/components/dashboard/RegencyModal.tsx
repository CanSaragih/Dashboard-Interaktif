// components/dashboard/RegencyModal.tsx
import { X } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";
import type { RegencySummary } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: {
    province: string;
    regency: string;
    summary: RegencySummary;
    total: number;
    totalAnggaran: number;
  } | null;
}

const RegencyModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  //  data untuk chart
  const chartData = [
    {
      name: "PAUD",
      sekolah: data.summary.paud.jumlah,
      anggaran: data.summary.paud.anggaran,
    },
    {
      name: "SD",
      sekolah: data.summary.sd.jumlah,
      anggaran: data.summary.sd.anggaran,
    },
    {
      name: "SMP",
      sekolah: data.summary.smp.jumlah,
      anggaran: data.summary.smp.anggaran,
    },
    {
      name: "SMA",
      sekolah: data.summary.sma.jumlah,
      anggaran: data.summary.sma.anggaran,
    },
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      {/* Transparent backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-xs"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      {/* Modal content */}
      <div
        className="relative bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto z-[1001]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-top p-6 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Detail Wilayah</h2>
            <h3 className="text-base font-zinc-500">
              Informasi Revitalisasi Sekolah di {data.regency}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-700  text-2xl cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Jumlah Revitalisasi Sekolah per Jenjang */}
            <div className="bg-white border border-zinc-200 p-4 rounded-2xl">
              <h4 className="font-medium mb-6 text-center">
                Jumlah Revitalisasi Sekolah per Jenjang
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value}`, "Jumlah Sekolah"]}
                  />
                  <Legend />
                  <Bar dataKey="sekolah" fill="#2b7fff" name="Jumlah Sekolah" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Total Anggaran Revitalisasi per Jenjang */}
            <div className="bg-white border border-zinc-200 p-4 rounded-2xl">
              <h4 className="font-medium mb-6 text-center">
                Total Anggaran Revitalisasi per Jenjang
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `Rp ${Number(value).toLocaleString("id-ID")}`,
                      "Anggaran",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="anggaran" fill="#2b7fff" name="Anggaran (Rp)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Combined Chart - Revitalisasi Sekolah dan Anggaran per Jenjang */}
          <div className="bg-white border border-zinc-200 p-4 rounded-2xl">
            <h4 className="font-medium mb-6 text-center">
              Revitalisasi Sekolah dan Anggaran per Jenjang
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) =>
                    `Rp ${(value / 1000000).toFixed(0)}J`
                  }
                />
                <Tooltip
                  formatter={(value, name) =>
                    name === "sekolah"
                      ? [`${value} sekolah`, "Jumlah Sekolah"]
                      : [
                          `Rp ${Number(value).toLocaleString("id-ID")}`,
                          "Anggaran",
                        ]
                  }
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sekolah"
                  fill="#2b7fff"
                  name="Jumlah Sekolah"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="anggaran"
                  stroke="#2d9900"
                  name="Anggaran (Rp)"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegencyModal;
