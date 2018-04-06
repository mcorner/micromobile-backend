const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const config = require('../config/config.json');
var models = require("../models");
var admin = require("firebase-admin");

var serviceAccount = require("./micromobile-71c73-firebase-adminsdk-gt63o-21dc5b764a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://micromobile-71c73.firebaseio.com"
});

var payload = {
    "data": {
        "title": "Participate in an experiment!",
      	"body": "Thanks for agreeing to help.  We would really appreciate it if you would help us out again and complete a short experiment.",
        "force-start": "1"
    }
}

async function sendNotifications(){
  const pushes = await models.pushSubscription.findAll({
    where: { '$device.push_token$' : { $ne: null } },
    include: ['device']
  });

  pushes.forEach(async (p) => {
    payload.data.path = p.path;
    console.log(JSON.stringify(payload));

    response = await admin.messaging().sendToDevice(p.device.pushToken, payload, {priority: "high"});

    console.log("Successfully sent message:", response.results);

    await models.event.create({deviceId: p.device.id, eventType: 'push', eventSubtype: p.path});

    // check for success and insert event

  });
}

sendNotifications().then(() => {console.log("done")});
