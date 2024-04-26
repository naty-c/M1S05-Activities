module.exports = (sequelize, DataTypes) => {
    const userAttribute = sequelize.define('userAttributes', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      specialization: DataTypes.STRING
    }, {});
    userAttribute.associate = function(models) {
      userAttribute.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    };
    return userAttribute;
  };
  