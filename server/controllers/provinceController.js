const { Revitalization, Regency, Province } = require("../models");
const { fn, col } = require("sequelize");

module.exports = class ProvinceController {
  static async getProvinceSummary(req, res) {
    try {
      const { id } = req.params;

      // cek provinsi
      const province = await Province.findByPk(id);
      if (!province)
        return res.status(404).json({ message: "Province not found" });

      // summary per jenjang di provinsi
      const summary = await Revitalization.findAll({
        attributes: [
          "jenjang",
          [fn("SUM", col("jumlah")), "totalSekolah"],
          [fn("SUM", col("anggaran")), "totalAnggaran"],
        ],
        include: [
          { model: Regency, attributes: [], where: { provinceId: id } },
        ],
        group: ["jenjang"],
        raw: true,
      });

      // breakdown per kabupaten
      const regencyData = await Revitalization.findAll({
        attributes: [
          "regencyId",
          "jenjang",
          [fn("SUM", col("jumlah")), "totalSekolah"],
          [fn("SUM", col("anggaran")), "totalAnggaran"],
        ],
        include: [
          {
            model: Regency,
            attributes: ["id", "name"],
            where: { provinceId: id },
          },
        ],
        group: ["regencyId", "jenjang", "Regency.id", "Regency.name"],
        raw: true,
      });

      // format hasil
      const formattedSummary = summary.map((row) => ({
        jenjang: row.jenjang,
        totalSekolah: Number(row.totalSekolah),
        totalAnggaran: Number(row.totalAnggaran),
      }));

      const formattedRegencyData = regencyData.map((row) => ({
        regencyId: row.regencyId,
        regencyName: row["Regency.name"],
        jenjang: row.jenjang,
        totalSekolah: Number(row.totalSekolah),
        totalAnggaran: Number(row.totalAnggaran),
      }));

      res.status(200).json({
        province: province.name,
        summary: formattedSummary,
        regencyData: formattedRegencyData,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }
};
