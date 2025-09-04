import { FunnelX, MapPin } from "lucide-react";
import React from "react";

interface Props {
  selectedProvince: string;
  onResetFilter: () => void;
}

const ProvinceFilterBox: React.FC<Props> = ({
  selectedProvince,
  onResetFilter,
}) => {
  return (
    <div className="fixed top-6 right-6 bg-white rounded-xl shadow-lg border border-gray-100 p-5 min-w-[280px] z-50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg">
          <MapPin className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Provinsi Terpilih
          </p>
          <h3 className="font-semibold text-gray-900 text-sm">
            {selectedProvince}
          </h3>
        </div>
      </div>

      <button
        onClick={onResetFilter}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[0.98] active:scale-95 cursor-pointer"
      >
        <FunnelX className="w-4 h-4" />
        Reset Filter
      </button>
    </div>
  );
};

export default ProvinceFilterBox;
