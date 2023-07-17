"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      imageURL: {
        type: DataTypes.STRING,
      },
      postContent: {
        type: DataTypes.STRING,
      },
      likesCount: {
        type: DataTypes.BIGINT,
      },
      postedBy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "user_posts_instagram",
      timestamps: false,
    }
  );

  Post.associate = function (model) {
    Post.hasMany(model.PostLike, {
      foreignKey: "postId",
    });

    Post.hasMany(model.PostComment, {
      foreignKey: "postId"
    })
    Post.belongsTo(model.User, {
      foreignKey: "postedBy"
    })
  };
  return Post;
};
