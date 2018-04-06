module.exports = function(Sequelize, DataType){
  const RawEventLog = Sequelize.define('rawEventLog', {
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
    eventAt: {
      field: 'event_at',
      type: DataType.DATE,
      allowNull: false
    },
    lambdaRequestId: {
      field: 'lambda_request_id',
      type: DataType.STRING,
      allowNull: false
    },
    deviceId: {
      field: 'device_id',
      type: DataType.INTEGER,
      allowNull: false,
//      references: {
//        model: 'devices',
//        key: 'id'
//      },
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
    advertisingIdentifier: {
      field: 'advertising_identifier',
      type: DataType.STRING,
      allowNull: true
    },
    vendorIdentifier: {
      field: 'vendor_identifier',
      type: DataType.STRING,
      allowNull: true
    },
    webIdentifier: {
      field: 'web_identifier',
      type: DataType.STRING,
      allowNull: true
    },
    platform: {
      field: 'platform',
      type: DataType.STRING,
      allowNull: false
    },
    userAgent: {
      field: 'device_os',
      type: DataType.STRING,
      allowNull: false
    },
    impression: {
      field: 'impression',
      type: DataType.STRING,
      allowNull: true
    },
    referrer: {
      field: 'referrer',
      type: DataType.STRING,
      allowNull: true
    },
  },
  {
    tableName: 'raw_event_logs'
  });

  return RawEventLog;
};
