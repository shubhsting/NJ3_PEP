'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("post_likes_instagram", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.BIGINT,
      },
      userId: {
        type: Sequelize.BIGINT,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("post_likes_instagram", {})
  }
};
