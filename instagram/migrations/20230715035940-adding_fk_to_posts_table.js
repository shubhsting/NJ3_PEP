"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint("user_posts_instagram", {
      type: "foreign key",
      fields: ["postedBy"],
      name: "fk_posts_to_users",
      references: {
        table: "users_instagram",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint("user_posts_instagram", {
      type: "foreign key",
      fields: ["postedBy"],
      name: "fk_posts_to_users",
      references: {
        table: "users_instagram",
        field: "id",
      },
    });
  },
};
