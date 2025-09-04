import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface ChartData {
  name: string;
  value: number;
}

interface Props {
  data: ChartData[];
  title: string;
  subtitle: string;
}

interface ActiveSegment extends ChartData {
  index: number;
}

const COLORS = {
  PAUD: "#10b981",
  SD: "#f59e0b",
  SMP: "#8b5cf6",
  SMA: "#ef4444",
} as const;

const BudgetChart: React.FC<Props> = ({ data, title, subtitle }) => {
  const [activeSegment, setActiveSegment] = useState<ActiveSegment | null>(
    null
  );

  const handleMouseEnter = (chartData: ChartData, index: number) => {
    setActiveSegment({ ...chartData, index });
  };

  const handleMouseLeave = () => {
    setActiveSegment(null);
  };

  // Custom legend component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customLegend = (props: any) => {
    const { payload } = props;
    if (!payload) return null;

    return (
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={0}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseOut={handleMouseLeave}
            >
              {data.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={COLORS[entry.name as keyof typeof COLORS] || COLORS.SD}
                />
              ))}
            </Pie>
            {/* Disable default tooltip completely */}
            <Tooltip content={() => null} />
            <Legend content={customLegend} />
          </PieChart>
        </ResponsiveContainer>

        {/* Hover info display  */}
        {activeSegment && (
          <div className="absolute top-16 right-8 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-10">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-1 h-4 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[activeSegment.name as keyof typeof COLORS],
                }}
              />
              <span className="text-sm font-semibold text-gray-900">
                {activeSegment.name}
              </span>
            </div>
            <div className="text-xs text-zinc-600 ml-3">
              {activeSegment.name}{" "}
              <span className="font-medium font-mono text-zinc-800">
                {activeSegment.value.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetChart;
