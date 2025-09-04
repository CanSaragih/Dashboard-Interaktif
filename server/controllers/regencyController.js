const { Revitalization, Regency, Province } = require("../models");
const { fn, col } = require("sequelize");
module.exports = class RegencyController {
  static async getRegencySummary(req, res) {
    try {
      const { id } = req.params;
      // summary per jenjang
      const summary = await Revitalization.findAll({
        attributes: [
          "jenjang",
          [fn("SUM", col("jumlah")), "totalSekolah"],
          [fn("SUM", col("anggaran")), "totalAnggaran"],
        ],
        where: { regencyId: id },
        group: ["jenjang"],
        raw: true,
      });

      //  info wilayah
      const regency = await Regency.findByPk(id, {
        include: [{ model: Province, attributes: ["id", "name"] }],
      });

      if (!regency) {
        return res.status(404).json({ message: "Regency not found" });
      }

      // format hasil
      const result = {
        province: regency.Province.name,
        regency: regency.name,
        summary: {
          paud: { jumlah: 0, anggaran: 0 },
          sd: { jumlah: 0, anggaran: 0 },
          smp: { jumlah: 0, anggaran: 0 },
          sma: { jumlah: 0, anggaran: 0 },
        },
        total: 0,
        totalAnggaran: 0,
      };

      summary.forEach((row) => {
        const jenjang = row.jenjang.toLowerCase();
        result.summary[jenjang] = {
          jumlah: Number(row.totalSekolah),
          anggaran: Number(row.totalAnggaran),
        };
        result.total += Number(row.totalSekolah);
        result.totalAnggaran += Number(row.totalAnggaran);
      });

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }
};
