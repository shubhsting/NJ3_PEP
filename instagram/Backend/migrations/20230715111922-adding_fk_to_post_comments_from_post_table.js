"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint("post_comments_instagram", {
      type: "foreign key",
      name: "fk_post_comment_to_post",
      fields: ["postId"],
      references: {
        table: "user_posts_instagram",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint("post_comments_instagram", {
      type: "foreign key",
      name: "fk_post_comment_to_post",
      fields: ["postId"],
      references: {
        table: "user_posts_instagram",
        field: "id",
      },
    });
  },
};
