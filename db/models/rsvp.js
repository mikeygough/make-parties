'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rsvp extends Model {
    static associate(models) {
      Rsvp.belongsTo(models.Event); // EventId
    }
  }
  Rsvp.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Rsvp',
    }
  );
  return Rsvp;
};
