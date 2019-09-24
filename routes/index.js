var express = require('express');
var router = express.Router();
var MenberWork=new require('../model/menberwork')
var sql=require('mssql')

/* GET home page. */
var a={
  chat:'dgdgsd',
  id:'fgdfgdf'
}

module.exports = function(io){
  var router = express.Router();
  /*io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('ping', a);

  
  });*/

  router.get('/', function(req, res, next) {
   
    io.on('connection', function(socket){
      console.log('a user connected');
      var request =new sql.Request()
   request.query('select * from testchat').then(function(recosdset){
  
        socket.emit('ping'+req.query.aa,recosdset.recordset);
   
      })
    //  console.log(re)
   
    });
 
res.send('')


  })


    

  router.get('/aa',function(req,res){
      var request=new sql.Request()
          request.input('chat',req.query.chat).execute('postchat').then(function(recosdset){
              console.log(recosdset.recordset)
              io.emit('ping',recosdset.recordset);
          })

 
    res.send('dgh')
  })
  return   router
}
