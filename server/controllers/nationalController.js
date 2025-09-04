const { Revitalization, Regency, Province } = require("../models");
const { fn, col } = require("sequelize");
module.exports = class NationalController {
  static async getNational(req, res) {
    try {
      const revitalizations = await Revitalization.findAll();

      let total = 0;
      let totalAnggaran = 0;

      const summary = {
        paud: { jumlah: 0, anggaran: 0 },
        sd: { jumlah: 0, anggaran: 0 },
        smp: { jumlah: 0, anggaran: 0 },
        sma: { jumlah: 0, anggaran: 0 },
      };

      revitalizations.forEach((rev) => {
        const jumlah = Number(rev.jumlah) || 0;
        const anggaran = Number(rev.anggaran) || 0;

        total += jumlah;
        totalAnggaran += anggaran;

        if (summary[rev.jenjang]) {
          summary[rev.jenjang].jumlah += jumlah;
          summary[rev.jenjang].anggaran += anggaran;
        }
      });
      res.status(200).json({
        total,
        paud: summary.paud,
        sd: summary.sd,
        smp: summary.smp,
        sma: summary.sma,
        totalAnggaran,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getNationalByProvince(req, res) {
    try {
      const data = await Revitalization.findAll({
        attributes: [
          "jenjang",
          [fn("SUM", col("jumlah")), "totalSekolah"],
          [fn("SUM", col("anggaran")), "totalAnggaran"],
        ],
        include: [
          {
            model: Regency,
            attributes: ["provinceId"],
            include: [{ model: Province, attributes: ["id", "name"] }],
          },
        ],
        group: [
          "jenjang",
          "Regency.provinceId",
          "Regency.Province.id",
          "Regency.Province.name",
        ],
        raw: true,
      });

      const provinceSummary = {};
      data.forEach((row) => {
        const provinceId = row["Regency.Province.id"];
        const provinceName = row["Regency.Province.name"];

        if (!provinceSummary[provinceId]) {
          provinceSummary[provinceId] = {
            provinceId,
            provinceName,
            paud: { jumlah: 0, anggaran: 0 },
            sd: { jumlah: 0, anggaran: 0 },
            smp: { jumlah: 0, anggaran: 0 },
            sma: { jumlah: 0, anggaran: 0 },
          };
        }

        provinceSummary[provinceId][row.jenjang] = {
          jumlah: Number(row.totalSekolah),
          anggaran: Number(row.totalAnggaran),
        };
      });

      res.status(200).json(Object.values(provinceSummary));
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }
};
