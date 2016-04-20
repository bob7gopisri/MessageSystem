'use strict';
module.exports = function(sequelize, DataTypes) {
  var topic = sequelize.define('topic', {
    topic_name: DataTypes.STRING,
    owner: DataTypes.STRING,
    topic_status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return topic;
};