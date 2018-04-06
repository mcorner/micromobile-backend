module.exports = function(Sequelize, DataType){
  const Impression = Sequelize.define('impression', {
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
    path: {
      field: 'path',
      type: DataType.STRING,
      allowNull: true
    },
    dsp: {
      field: 'dsp',
      type: DataType.STRING,
      allowNull: true
    },
    impression: {
      field: 'impression',
      type: DataType.STRING,
      allowNull: true
    },
    clickUrl: {
      field: 'click_url',
      type: DataType.STRING,
      allowNull: true
    },
    pageUrl: {
      field: 'page_url',
      type: DataType.STRING,
      allowNull: true
    },
    referrerUrl: {
      field: 'referrer_url',
      type: DataType.STRING,
      allowNull: true
    },
    deviceIdentifierType: {
      field: 'device_identifier_type',
      type: DataType.STRING,
      allowNull: true
    },
    deviceIdentifier: {
      field: 'device_identifier',
      type: DataType.STRING,
      allowNull: true
    },
    deviceIsp: {
      field: 'device_isp',
      type: DataType.STRING,
      allowNull: true
    },
    deviceModel: {
      field: 'device_model',
      type: DataType.STRING,
      allowNull: true
    },
    deviceOs: {
      field: 'device_os',
      type: DataType.STRING,
      allowNull: true
    },
    osVersion: {
      field: 'os_version',
      type: DataType.STRING,
      allowNull: true
    },
    ipAdd: {
      field: 'ip_add',
      type: DataType.STRING,
      allowNull: true
    },
    sourceId: {
      field: 'source_id',
      type: DataType.STRING,
      allowNull: true
    },
    timestamp: {
      field: 'timestamp',
      type: DataType.STRING,
      allowNull: true
    },
    datetime: {
      field: 'datetime',
      type: DataType.STRING,
      allowNull: true
    },
    exchange: {
      field: 'exchange',
      type: DataType.STRING,
      allowNull: true
    },
    gps: {
      field: 'gps',
      type: DataType.STRING,
      allowNull: true
    },
    userAgent: {
      field: 'user_agent',
      type: DataType.STRING,
      allowNull: true
    },
    gaid: {
      field: 'gaid',
      type: DataType.STRING,
      allowNull: true
    },
    ifa: {
      field: 'ifa',
      type: DataType.STRING,
      allowNull: true
    },
    sha1Aid: {
      field: 'sha1_aid',
      type: DataType.STRING,
      allowNull: true
    },
    sha1Udid: {
      field: 'sha1_udid',
      type: DataType.STRING,
      allowNull: true
    },
    sha1Dpid: {
      field: 'sha1_dpid',
      type: DataType.STRING,
      allowNull: true
    },
    sha1Did: {
      field: 'sha1_did',
      type: DataType.STRING,
      allowNull: true
    },
    bundleId: {
      field: 'bundle_id',
      type: DataType.STRING,
      allowNull: true
    },
    orderId: {
      field: 'order_id',
      type: DataType.INTEGER,
      allowNull: true
    },
    lat: {
      field: 'lat',
      type: DataType.DOUBLE,
      allowNull: true
    },
    lon: {
      field: 'lon',
      type: DataType.DOUBLE,
      allowNull: true
    },
    postalCode: {
      field: 'postal_code',
      type: DataType.STRING,
      allowNull: true
    },
    dnt: {
      field: 'dnt',
      type: DataType.STRING,
      allowNull: true
    },
    adSize: {
      field: 'ad_size',
      type: DataType.STRING,
      allowNull: true
    },
    campaign: {
      field: 'campaign',
      type: DataType.INTEGER,
      allowNull: true
    },
    creativeType: {
      field: 'creative_type',
      type: DataType.STRING,
      allowNull: true
    },
  },
  {
    tableName: 'impressions',
  });

  return Impression;
};
