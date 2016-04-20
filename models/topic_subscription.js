'use strict';
module.exports = function(sequelize, DataTypes) {
  var topic_subscriber = sequelize.define('topic_subscriber', {
    topic_name: DataTypes.STRING,
    subscription_group: DataTypes.STRING,
    subscription_owner: DataTypes.STRING,
    subscription_status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return topic_subscriber;
};