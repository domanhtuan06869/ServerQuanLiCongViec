var express = require('express');
var router = express.Router();
var User= new require('../model/userlogin')
var sql= require('mssql')
/* GET users listing. */
/*router.get('/', function(req, res, next) {
 User.findOne({email:req.query.email}).then((doc)=>{
   if(doc){
    res.send(doc)
    console.log(doc)
   }
   else{
    console.log('kkk')
     res.send('khong')
   }
 
 })
});
router.post('/',function(req,res){
  User.findOne({ email: req.body.email }).then((user)=> {
    if (user) {
   res.send(user)
   console.log(req.body.email)
    
    }else{
      console.log(req.body.email)
      console.log('khong ton tai')
      const user=new User({email:req.body.email,name:'cap nhap',avatar:'vff',age:50})
      user.save();
      res.send(user)
    }
    
  }) 
})*/


router.post('/login',function(req,res){
  const{username,password,token}=req.body
  console.log(token)
  var request=new sql.Request()
  request.input('email',username)
  request.input('password',password).execute('loginuser').then(function(recodset){
   var request=new sql.Request()
   request.input('email',recodset.recordset[0].email)
   request.input('token',token).execute('updatetoken').then(function(){

   })
res.send(recodset.recordset[0])
  })
})
router.get('/getuser',function(req,res){
  var request=new sql.Request()
  request.execute('getusers').then(function(recodset){
    res.send(recodset.recordset)
  })
})
module.exports = router;
