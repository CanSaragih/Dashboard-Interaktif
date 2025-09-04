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
