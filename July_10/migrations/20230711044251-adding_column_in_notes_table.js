"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("notes_mysql_demo", "createdBy", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("notes_mysql_demo", "createdBy", {
      type: Sequelize.STRING,
    });
  },
};
