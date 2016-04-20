'use strict';
module.exports = function(sequelize, DataTypes) {
  var published_message = sequelize.define('published_message', {
    message_id: DataTypes.STRING,
    topic_name: DataTypes.STRING,
    message: DataTypes.MEDIUM_TEXT,
    publisher_id: DataTypes.STRING,
    message_status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return published_message;
};