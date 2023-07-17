"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      profileImage: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users_instagram",
      timestamps: false,
    }
  );

  User.associate = function (model) {
    User.hasMany(model.PostLike, {
      foreignKey: "userId",
    });

    User.hasMany(model.PostComment, {
      foreignKey: "commentedBy"
    })

    User.hasMany(model.Post, {
      foreignKey: "postedBy"
    })
  };
  return User;
};
