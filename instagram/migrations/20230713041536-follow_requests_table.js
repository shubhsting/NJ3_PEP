"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("follow_requests_instagram", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sentBy: {
        type: Sequelize.BIGINT,
      },
      sentTo: {
        type: Sequelize.BIGINT,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["PENDING", "ACCEPTED", "REJECTED", "DELETED"],
      },
    });
  },

  async down(queryInterface, Sequelize) {
   queryInterface.dropTable("follow_requests_instagram", {})
  },
};
