import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { name: string; sekolah: number; anggaran: number }[];
  title: string;
  subtitle: string;
}

const RevitalizationBarChart: React.FC<Props> = ({ data, title, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-semibold text-zinc-800">{title}</h2>
        <p className="text-base text-zinc-500">{subtitle}</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Grid dashed horizontal only */}
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
            vertical={false}
          />

          {/* Axis */}
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              fontSize: "12px",
            }}
            formatter={(value: number, name) =>
              name === "Jumlah Sekolah"
                ? `${value.toLocaleString("id-ID")} sekolah`
                : `Rp ${value.toLocaleString("id-ID")}`
            }
          />

          <Legend wrapperStyle={{ fontSize: 12 }} />

          {/* Bar & Line */}
          <Bar
            yAxisId="left"
            dataKey="sekolah"
            fill="#ff6900"
            name="Jumlah Sekolah"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="anggaran"
            stroke="#3180ff"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Anggaran"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevitalizationBarChart;
