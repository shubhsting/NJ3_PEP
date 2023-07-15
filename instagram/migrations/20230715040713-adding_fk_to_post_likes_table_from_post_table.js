"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint("post_likes_instagram", {
      type: "foreign key",
      fields: ["postId"],
      name: "fk_post_likes_to_post",
      references: {
        table: "user_posts_instagram",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint("post_likes_instagram", {
      type: "foreign key",
      fields: ["postId"],
      name: "fk_post_likes_to_post",
      references: {
        table: "user_posts_instagram",
        field: "id",
      },
    });
  },
};
