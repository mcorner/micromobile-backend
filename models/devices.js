module.exports = function(Sequelize, DataType){
  const Device = Sequelize.define('device', {
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
    pushToken: {
      field: 'push_token',
      type: DataType.STRING,
      allowNull: true
    },
    advertisingIdentifier: {
      field: 'advertising_identifier',
      type: DataType.STRING,
      allowNull: true,
      unique: true,
    },
    vendorIdentifier: {
      field: 'vendor_identifier',
      type: DataType.STRING,
      allowNull: true,
      unique: true,
    },
    webIdentifier: {
      field: 'web_identifier',
      type: DataType.STRING,
      allowNull: true,
      unique: true,
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
  },
  {
    tableName: 'devices'
  });

  Device.findOrCreateDevice = async function(event) {
    let userDevice = null;

    try{
      const defaults = {}

      if (event.idfa) {defaults.advertisingIdentifier = event.idfa.toUpperCase();}
      if (event.idfv) {defaults.vendorIdentifier = event.idfv.toUpperCase();}
      // Don't use webIdentifiers when we have an idfa/v.
      if (!event.idfa && !event.idfv && event.webId) {defaults.webIdentifier = event.webId.toUpperCase();}
      if (event.userAgent) {defaults.userAgent = event.userAgent;}
      if (event.platform) {defaults.platform = event.platform;}

      let result = null;

      if (event.idfa){
        // If we have the IDFA, use that as the primary identifier
        result = await Device.findOrCreate({defaults: defaults, where: {advertisingIdentifier: defaults.advertisingIdentifier}});
      } else if (event.idfv){
        result = await Device.findOrCreate({defaults: defaults, where: {vendorIdentifier: defaults.vendorIdentifier}});
      } else if (event.webId){
        result = await Device.findOrCreate({defaults: defaults, where: {webIdentifier: defaults.webIdentifier}});
      }
      if (!result){
        console.log("Null user device, event:" + JSON.stringify(event));
        throw("null user device");
      }
      userDevice = result[0];
    } catch(e){
      console.log("Error in findOrCreateDevice: " + e);
      throw(e);
    }
    return userDevice;
  };

  return Device;
};
