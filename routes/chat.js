var express = require('express');
var router = express.Router();
const { Expo } = require('expo-server-sdk')
const PushNotifications = require('pusher-push-notifications-node');

router.post('/',function(req,res){

  let expo = new Expo();

  // Create the messages that you want to send to clents
  let messages = [{
    to: ['ExponentPushToken[qlIPSNGfQpOixYygIi5wuQ]','ExponentPushToken[VED_7bOT2AM2G4MJhbeGId]','ExponentPushToken[qlIPSNGfQpOixYygIi5wuQ]'],
    sound: 'default',
    body: 'hello ',
    title:'hihi',
 
  }];

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);

      } catch (error) {
        console.error(error);
      }
    }
  })();
  

  
 
  let receiptIds = [];
  for (let ticket of tickets) {
    
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);

        for (let receipt of receipts) {
          if (receipt.status === 'ok') {
            continue;
          } else if (receipt.status === 'error') {
            console.error(`There was an error sending a notification: ${receipt.message}`);
            if (receipt.details && receipt.details.error) {
         
              console.error(`The error code is ${receipt.details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
  res.send('a')
})
router.get('/push',function(req,res){
  let pushNotifications = new PushNotifications({
    instanceId: '31d9d3e2-241f-4334-b13e-80b695429157',
    secretKey: '6D6C45E4102719E1E4AE8C738AC076C248AEA4235D7D9C48B5004865B1D1362F'
  });


  pushNotifications.publish(
    ['hello'],
    {
      fcm: {
        notification: {
          title: 'load di',
          body: 'loadluon',
          to:''
        }
      }
    }
  ).then((publishResponse) => {
    console.log('Just published:', publishResponse.publishId);
  }).catch((error) => {
    console.log('Error:', error);
  })
 // push('haha')
  res.send('gf')
})


router.get('/tinh',function(req,res){
  var a=req.query.dm;
  var b=req.query.tit
push('fgdg')
 res.send('ghf')
})
module.exports = router



class MyTimeout {
  constructor() {
    this.idMap = {};
  }

  setTimeout(myID, callback, time) {
    var originalID =setTimeout(callback, time);
    this.idMap[myID] = originalID;
    return myID;
  }

  clearTimeout(myID) {
    return clearTimeout(this.idMap[myID]);
  }
}

const t = new MyTimeout();
t.setTimeout('123', () => { 
  console.log('123'); 
}, 2000);

t.clearTimeout('123');


function push(tit){
  let expo = new Expo();

  // Create the messages that you want to send to clents
  let messages = [{
    to: ['ExponentPushToken[P0MWZaEYuLuMsyE62cVOMn]'],
    sound: 'default',
    body: tit,
    title:'ok',
 
  }];

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);

      } catch (error) {
   console.log(error)
      }
    }
  })();
  

  
 
  let receiptIds = [];
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);
  
        // The receipts specify whether Apple or Google successfully received the 
        // notification and information about an error, if one occurred.
        for (let receipt of receipts) {
          if (receipt.status === 'ok') {
            continue;
          } else if (receipt.status === 'error') {
            console.error(`There was an error sending a notification: ${receipt.message}`);
            if (receipt.details && receipt.details.error) {
         
              console.error(`The error code is ${receipt.details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

