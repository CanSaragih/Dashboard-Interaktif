"use strict";

/** @type {import('sequelize-cli').Migration} */

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

module.exports = {
  async up(queryInterface, Sequelize) {
    const provincesData = [];
    const regenciesData = [];
    const revitalizationsData = [];

    const filePath = path.join(__dirname, "../data/data.csv");

    const rows = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    const provinceRows = rows.filter((r) => parseInt(r.kode_kab) === 0);
    provinceRows.forEach((row) => {
      provincesData.push({
        kode_pro: parseInt(row.kode_pro),
        name: row.nama_wilayah,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("Provinces", provincesData, {});

    const [provinces] = await queryInterface.sequelize.query(
      `SELECT id, kode_pro FROM "Provinces";`
    );
    const provinceMap = {};
    provinces.forEach((p) => {
      provinceMap[p.kode_pro] = p.id;
    });

    const regencyRows = rows.filter((r) => parseInt(r.kode_kab) !== 0);
    regencyRows.forEach((row) => {
      regenciesData.push({
        kode_kab: parseInt(row.kode_kab),
        name: row.nama_wilayah,
        provinceId: provinceMap[row.kode_pro],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("Regencies", regenciesData, {});

    const [regencies] = await queryInterface.sequelize.query(
      `SELECT id, kode_kab FROM "Regencies";`
    );
    const regencyMap = {};
    regencies.forEach((r) => {
      regencyMap[r.kode_kab] = r.id;
    });

    regencyRows.forEach((row) => {
      ["paud", "sd", "smp", "sma"].forEach((jenjang) => {
        const cleanAnggaran = row[`anggaran_rev_${jenjang}`]
          ? row[`anggaran_rev_${jenjang}`].toString().replace(/\D/g, "")
          : "0";

        revitalizationsData.push({
          jenjang,
          jumlah: parseInt(row[`Jml_rev_${jenjang}`]) || 0,
          anggaran: cleanAnggaran ? BigInt(cleanAnggaran) : 0n,
          regencyId: regencyMap[row.kode_kab],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert("Revitalizations", revitalizationsData, {});

    console.log("✅ Insert data from CSV completed");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Revitalizations", null, {});
    await queryInterface.bulkDelete("Regencies", null, {});
    await queryInterface.bulkDelete("Provinces", null, {});
  },
};
