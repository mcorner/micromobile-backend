module.exports = function(Sequelize, DataType){
  const PushSubscription = Sequelize.define('pushSubscription', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: DataType.DATE,
      defaultValue: Sequelize.literal("(now() at time zone 'utc')"),
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: DataType.DATE,
      defaultValue: Sequelize.literal("(now() at time zone 'utc')"),
      allowNull: false
    },
    deviceId: {
      field: 'device_id',
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'devices',
        key: 'id'
      },
    },
    path: {
      field: 'path',
      type: DataType.STRING,
      allowNull: false
    },
  },
  {
    tableName: 'push_subscriptions',
  });

  return PushSubscription;
};
