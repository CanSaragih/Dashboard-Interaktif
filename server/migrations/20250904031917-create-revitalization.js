"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Revitalizations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jenjang: {
        type: Sequelize.STRING,
      },
      jumlah: {
        type: Sequelize.INTEGER,
      },
      anggaran: {
        type: Sequelize.BIGINT,
      },
      regencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Regencies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Revitalizations");
  },
};
