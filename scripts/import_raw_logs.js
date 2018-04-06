//NODE_ENV=production babel-node scripts/import_raw_logs.js

// Uncompress first
// find /Users/mcorner/logs/ -type f -exec gzip -d "{}" \;

import Models from '../models';
import find from 'find';
var lineByLine = require('n-readlines');


(async ()=>{
  var liner = new lineByLine('./out.txt');
let line = '';
  while (line = liner.next()) {
    let event = JSON.parse(line);
    if (!event.deviceId){
      continue;
    }
    if (!event.eventAt){
      continue;
    }


    try{
      await Models.rawEventLog.create(event);
    } catch(error) {
      console.log(error);
      console.log(event);
//      process.exit();
    }

  }

})();
