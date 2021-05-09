'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.associate = (models) => {
        Note.belongsTo(models.user, {foreignKey: 'userId'})
      }
      // define association here
    }
  };
  Note.init({
    userId: {
      foreignKey: true,
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4
    },
    subject: DataTypes.STRING,
    detail: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};