// curl --header "Content-Type: application/json" --header "Authorization: key=AAAAU57jBIo:APA91bEJzrix-JJxpG-K7opHKtUwIkGiIQzIKc85czmrflWHd1IGKIQptxbLPeO7V6scccnk07aD6ULlbEG9Nt4nu2lCrFwMfRwhZ1sL6ANBq6M70h3vPYZP07Z8V_U2y8VpYmHNMbmX" https://fcm.googleapis.com/fcm/send -d '{"notification": {"body": "Hello from curl via FCM!", "sound": "default"}, "priority": "high","to":"e2TX28YR5bE:APA91bGdbSW6BvtJ53qE9B3P2-KuG_rPxEfXgg8cC38dQxHFzJHUXltZ4l2PhCBE4r7ta8xS4-j6yl93frIg_mDQ6FADnqYsQfKaF9H-PuU5gPtDQQeZReTYcN1pP4LCD-UjdsGd6ANs"}'


var admin = require("firebase-admin");

var serviceAccount = require("./micromobile-71c73-firebase-adminsdk-gt63o-21dc5b764a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://micromobile-71c73.firebaseio.com"
});

//var registrationToken="c2I13yj_R6I:APA91bFK4h7CuDx9YPuVJkcjQAyRIcx2UNNJkikhjHcJp-3vuuyQE7XEwRf2m9idNGn32w8yDVyhwV7CmuhqR54jh1FCyevmKNYV2WjsVconjON1-KuAGT71B-09Ns03bDKNAruwG4jO"

var registrationToken="e2TX28YR5bE:APA91bF0y_22rhnTjADZDjuheXYHPRKSeaJarA19Wq9_6CyNdkyTqlpg21bPtzo6RRw7zad9g5cJwqXheM9MuF_H2-_vGlkhDX3I5JmKWWTt3YHaOr6RsJfA_zQvuk6ldHvJoYI4LwSU"

// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
    "notification": {
      "title": "My Title",
    	"body": "My message"
    },
    "data": {
    	"key1": "data 1",
    	"key2": "data 2"
    }
}
/*var payload = {
  data: {
    title: "MicroMobile",
    message: "Click here",
    url: 'https://www.cnn.com',
    image: 'https://avatars1.githubusercontent.com/u/60365?v=3&s=200'
  }
};
*/

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().sendToDevice(registrationToken, payload, {priority: "high"})
  .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
    console.log("Successfully sent message:", response.results);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
