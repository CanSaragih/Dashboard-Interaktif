"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Revitalization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Revitalization.belongsTo(models.Regency, { foreignKey: "regencyId" });
    }
  }
  Revitalization.init(
    {
      jenjang: DataTypes.STRING,
      jumlah: DataTypes.INTEGER,
      anggaran: DataTypes.BIGINT,
      regencyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Revitalization",
    }
  );
  return Revitalization;
};
