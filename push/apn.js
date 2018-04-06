var apn = require('apn');

var options = {
  token: {
    key: "keys/AuthKey_R2LPVNL65N.p8",
    keyId: "R2LPVNL65N",
    teamId: "N9N724EGVF"
  },
  production: true
};

var apnProvider = new apn.Provider(options);

let deviceToken = "0755a2b416da1eeafc9853ed13061c9fa18acdaa83753ab373d084105cb57888"

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
note.payload = {'messageFrom': 'John Appleseed'};
note.topic = "com.markdcorner.micromobile";

apnProvider.send(note, deviceToken).then( (result) => {
  console.log(result);

  console.log(result.failed[0].response);
});
