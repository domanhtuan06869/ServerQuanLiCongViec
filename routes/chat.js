var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = function(io){
  var router = express.Router();
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('haha',function(text){
      console.log(text)
      
    })
   
  });
  io.emit('ping', { data: 'hgfhfg'});

 
  return   router
}
