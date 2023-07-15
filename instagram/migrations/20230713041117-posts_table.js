'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("user_posts_instagram", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imageURL: {
        type: Sequelize.STRING,
      },
      postContent: {
        type: Sequelize.STRING,
      },
      likesCount: {
        type: Sequelize.BIGINT,
      },
      postedBy: {
        type: Sequelize.INTEGER,
      }
    });
  },

  async down (queryInterface, Sequelize) {
   queryInterface.dropTable("user_posts_instagram", {})
  }
};
