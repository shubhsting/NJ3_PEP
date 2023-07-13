'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("post_comments_instagram", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.BIGINT,
      },
      commentedBy: {
        type: Sequelize.BIGINT,
      },
      content: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("post_comments_instagram", {})
  }
};
