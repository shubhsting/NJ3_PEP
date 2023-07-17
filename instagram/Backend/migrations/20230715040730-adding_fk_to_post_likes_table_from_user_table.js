"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint("post_likes_instagram", {
      type: "foreign key",
      fields: ["userId"],
      name: "fk_post_likes_to_user_table",
      references: {
        table: "users_instagram",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint("post_likes_instagram", {
      type: "foreign key",
      fields: ["userId"],
      name: "fk_post_likes_to_user_table",
      references: {
        table: "users_instagram",
        field: "id",
      },
    });
  },
};
