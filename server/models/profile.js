'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }

  Profile.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Full name is required',
          },
          notEmpty: {
            msg: 'Full name is required',
          },
        },
      },
      gender: DataTypes.ENUM('male', 'female'),
      picture: DataTypes.STRING,
      phone: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );

  return Profile;
};
