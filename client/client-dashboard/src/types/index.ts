export interface JenjangData {
  jumlah: number;
  anggaran: number;
}

export interface NationalSummary {
  total: number;
  paud: JenjangData;
  sd: JenjangData;
  smp: JenjangData;
  sma: JenjangData;
  totalAnggaran: number;
}

export interface ProvinceSummary {
  jenjang: string;
  totalSekolah: number;
  totalAnggaran: number;
}

export interface ProvinceRegency {
  regencyId: number;
  regencyName: string;
  jenjang: string;
  totalSekolah: number;
  totalAnggaran: number;
}

export interface ProvinceDetail {
  province: string;
  summary: ProvinceSummary[];
  regencyData: ProvinceRegency[];
}

export interface NationalProvinceRow {
  provinceId: number;
  provinceName: string;
  paud: { jumlah: number; anggaran: number };
  sd: { jumlah: number; anggaran: number };
  smp: { jumlah: number; anggaran: number };
  sma: { jumlah: number; anggaran: number };
}
