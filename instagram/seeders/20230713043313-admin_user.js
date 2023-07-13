"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users_instagram", [
      {
        firstName: "Shubham",
        lastName: "Singh",
        email: "shubham@admin.com",
        phone: "+91 8976423456",
        userName: "adminsingh",
        password:
          "$2b$10$QLOxEinXlcXRqKlDjBRNZe1Lk.01UEmP9sZ5urK7Rsa77MN1mUj8a",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users_instagram", null, {});
  },
};
