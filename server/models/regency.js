"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Regency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Regency.belongsTo(models.Province, { foreignKey: "provinceId" });
      Regency.hasMany(models.Revitalization, { foreignKey: "regencyId" });
    }
  }
  Regency.init(
    {
      kode_kab: DataTypes.INTEGER,
      name: DataTypes.STRING,
      provinceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Regency",
    }
  );
  return Regency;
};
