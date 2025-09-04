interface SummaryCardProps {
  label: string;
  value: string | number;
  color: string;
  borderColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  color,
  borderColor,
}) => {
  return (
    <div
      className={`relative p-4 rounded-lg ${color} border-l-4 ${borderColor} flex flex-col justify-between`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${borderColor.replace(
          "border-l-",
          "bg-"
        )} rounded-l-lg`}
      ></div>

      <div className="flex flex-col gap-2">
        <span
          className={`text-sm font-medium ${
            borderColor === "border-l-blue-500"
              ? "text-blue-700"
              : borderColor === "border-l-green-500"
              ? "text-green-700"
              : borderColor === "border-l-yellow-500"
              ? "text-orange-700"
              : borderColor === "border-l-purple-500"
              ? "text-purple-700"
              : "text-red-700"
          }`}
        >
          {label}
        </span>
        <span className="text-lg font-medium text-gray-900 leading-tight">
          {value}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
