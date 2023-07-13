"use strict";
module.exports = (sequelize, DataTypes) => {
  const FollowRequest = sequelize.define(
    "FollowRequest",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sentBy: {
        type: DataTypes.BIGINT,
      },
      sentTo: {
        type: DataTypes.BIGINT,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "ACCEPTED", "REJECTED", "DELETED"],
      },
    },
    {
      tableName: "follow_requests_instagram",
    }
  );
  return FollowRequest;
};
