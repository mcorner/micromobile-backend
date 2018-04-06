const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const config = require('./config/config.json');
var models = require("./models");

function callInit (event, context, callback){
  context.callbackWaitsForEmptyEventLoop = false;

  if (event['detail-type'] ==  "Scheduled Event"){
    console.log("warmup");
    callback(null, "done");
    return false;
  }

//  console.log("Event data: " + JSON.stringify(event));
  return true;
}

exports.experimentFileResultHandler = function(event, context, callback) {
  if (!callInit(event, context, callback)) { return; }

  const param = {Bucket: config.backendBucket, Key: 'experiment-results/' + event.experimentName, Body: JSON.stringify(event.data)};

  s3.upload(param, function(err, data) {
    if (err){
      callback(err);
      console.log(err, err.stack);
    } // an error occurred
    else{
      console.log(data);           // successful response
      callback(null, "done");
    }
  });
};

exports.pushRegistrationHandler = async function(event, context, callback) {
  if (!callInit(event, context, callback)) { return; }

  try {
    let userDevice = await models.device.findOrCreateDevice(event);
    if (event.pushToken) {userDevice.pushToken = event.pushToken;}

    await userDevice.save();

    if (event.path){
      await models.pushSubscription.findOrCreate({where: {deviceId: userDevice.id, path: event.path }});
    }

    callback(null,"done");
  } catch(e){
    callback(e);
    console.log(e, e.stack);
  }
};

exports.eventHandler = async function(event, context, callback) {
  if (!callInit(event, context, callback)) { return; }

  try {
    let userDevice = await models.device.findOrCreateDevice(event);
    await models.event.create({
      deviceId: userDevice.id,
      eventType: event.eventType,
      eventSubtype: event.eventSubType,
      data: event.data,
      referrer: event.referrer,
      impression: event.impression,
    });

    callback(null,"done");
  } catch(e){
    callback(e);
    console.log(e, e.stack);
  }
};

exports.impressionHandler = async function(event, context, callback) {
  if (!callInit(event, context, callback)) { return; }

  try {
    await models.impression.create({
      path: event.path,
      dsp: event.dsp,
      impression: event.impression,
      clickUrl: event.click_url,
      pageUrl: event.page_url,
      referrerUrl: event.referrer_url,
      deviceIdentifierType: event.device_identifier_type,
      deviceIdentifier: event.device_identifier,
      deviceIsp: event.device_isp,
      deviceModel: event.device_model,
      deviceOs: event.device_os,
      osVersion: event.os_version,
      ipAdd: event.ip_add,
      sourceId: event.source_id,
      timestamp: event.timestamp,
      datetime: event.datetime,
      exchange: event.exchange,
      gps: event.gps,
      userAgent: event.user_agent,
      gaid: event.gaid,
      ifa: event.ifa,
      sha1Aid: event.sha1_aid,
      sha1Udid: event.sha1_udid,
      sha1Dpid: event.sha1_dpid,
      sha1Did: event.sha1_did,
      bundleId: event.bundle_id,
      orderId: !isNaN(parseInt(event.order_id)) ? parseInt(event.order_id) : null,
      lat: !isNaN(parseFloat(event.lat)) ? parseFloat(event.lat) : null,
      lon: !isNaN(parseFloat(event.lon)) ? parseFloat(event.lon) : null,
      postalCode: event.postal_code,
      dnt: event.dnt,
      adSize: event.ad_size,
      campaign: !isNaN(parseInt(event.campaign)) ? parseInt(event.campaign) : null,
      creativeType: event.creative_type,
    });

    callback(null,"done");
  } catch(e){
    callback(e);
    console.log(e, e.stack);
  }
};


exports.redirectHandler = async function(event, context, callback) {
  if (!callInit(event, context, callback)) { return; }

  const experiment = event.resource.substring(1); // strip leading /
  const randomList = config.experiments[experiment];
  var randomExperiment = randomList[Math.floor(Math.random() * randomList.length)];

  console.log("redirect: " + randomExperiment);

  var response = {
      statusCode: 301,
      headers: {
          "Location" : randomExperiment,
      },
      body: null
  };
  callback(null, response);
}
