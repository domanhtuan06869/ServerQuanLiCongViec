var express = require('express');
var router = express.Router();
var MenberWork=new require('../model/menberwork')

/* GET home page. */


module.exports = function(io){
  var router = express.Router();
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('haha',function(text){
      console.log(text)
      socket.emit('ping', { data: text});
    })
  });
  
  router.get('/', function(req, res, next) {
 MenberWork.find({}).then((docs)=>{
  res.send(docs)
 })
    
  });
  router.post('/', (req, res) => {
    var message = new MenberWork({name:'dsfsdfadfsdadf'});
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', 'fgdf');
      res.sendStatus(200);
    })
  })
  return   router
}
