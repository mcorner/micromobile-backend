module.exports = function(Sequelize, DataType){
  const Event = Sequelize.define('event', {
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
    eventType: {
      field: 'event_type',
      type: DataType.STRING,
      allowNull: false
    },
    eventSubtype: {
      field: 'event_subtype',
      type: DataType.STRING,
      allowNull: true
    },
    referrer: {
      field: 'referrer',
      type: DataType.STRING,
      allowNull: true
    },
    impression: {
      type: DataType.STRING,
      allowNull: true
    },
    data: {
      type: DataType.JSON,
      allowNull: true
    },
  },
  {
    tableName: 'events',
  });

  return Event;
};
