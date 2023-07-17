"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define(
    "PostLike",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "post_likes_instagram",
      timestamps: false
    }
  );

  PostLike.associate = function (models) {
    PostLike.belongsTo(models.Post, {
      foreignKey: 'postId'
    })
    PostLike.belongsTo(models.User, {
      foreignKey: "userId"
    })
  }
  return PostLike;
};
