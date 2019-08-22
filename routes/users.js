var express = require('express');
var router = express.Router();
var User= new require('../model/userlogin')
/* GET users listing. */
router.get('/', function(req, res, next) {
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
})

module.exports = router;
