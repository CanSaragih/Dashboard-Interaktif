import React from "react";

interface Props {
  title: string;
  subtitle: string;
  rows: {
    provinsi: string;
    jenjang: string;
    jumlah: number;
    anggaran: number;
  }[];
}

const SchoolTable: React.FC<Props> = ({ title, subtitle, rows }) => {
  // Group rows by province
  const groupedData = rows.reduce((acc, row) => {
    if (!acc[row.provinsi]) {
      acc[row.provinsi] = [];
    }
    acc[row.provinsi].push(row);
    return acc;
  }, {} as Record<string, typeof rows>);

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className=" font-semibold text-gray-800">{title}</h2>
        <p className="text-base text-gray-500">{subtitle}</p>
      </div>

      {/* Table */}
      <div className="max-h-[300px] overflow-y-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6  text-left text-sm font-semibold text-gray-900 w-1/4">
                Provinsi
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">
                Bentuk Pendidikan
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 w-1/4">
                Banyak Sekolah
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 w-1/4">
                Anggaran
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {Object.entries(groupedData).map(([province, provinceRows]) => (
              <React.Fragment key={province}>
                {provinceRows.map((row, idx) => (
                  <tr
                    key={`${province}-${idx}`}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {idx === 0 ? (
                        <div className="font-semibold text-gray-900">
                          {row.provinsi}
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.jenjang.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center font-medium">
                      {row.jumlah.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                      Rp {row.anggaran.toLocaleString("id-ID")},00
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolTable;
