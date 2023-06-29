'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profilepicture: {
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      birth: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      introduce: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.fn('now'),
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.fn('now'),
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
