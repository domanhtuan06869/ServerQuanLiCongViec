var express = require('express');
var router = express.Router();
var Project =new require('../model/project')
var MenberProject=new require('../model/menberproject')
var find=require('../config/find')

/* GET home page. */
router.get('/', function(req, res, next) {
  Project.find({email:req.query.email}).then((docs)=>{

    res.send(docs)
  })
});
router.post('/',function (req,res){

  const {name,company,email,desire,endday,endmonth,endyear,status,description}=req.body
  const prj=new Project({name:name,email:email,company:company,status:status,desire:desire,endday:endday,endmonth:endmonth,endyear:endyear,description:description});
  prj.save()
  //console.log(prj)
  res.send(prj._id)
})

router.post('/menber',function(req,res){
const {a0:a0,a1,a2,a3,a4}=req.body
const mbprj=new MenberProject({a0:a0,a1:a1,a2:a2,a3:a3,a4:a4})
mbprj.save()
//console.log(mbprj._id)
res.send(mbprj._id)
})
router.get('/menber', function(req, res, next) {
  Project.findOne({_id:req.query.id}).then((docs)=>{
console.log(docs)
    res.send(docs)
  })
});
router.get('/editmenber',function(req,res){

  const {id,name,idproject}=req.query;
 MenberProject.findOneAndUpdate({_id:id},{name:name,idproject:idproject},{
    new: true,                    
    runValidators: true             
  })
  .then(doc => {
 // console.log(doc)

  res.send(doc)
  })
  .catch(err => {
  //console.error(err)
  })

})
router.get('/getallmenber',function(req,res){
  MenberProject.find({}).then((docs)=>{

    res.send(docs)
  
  });

})

router.get('/getonemenberproject',function(req,res){

  MenberProject.findOne({idproject:req.query.idproject}).then((docs)=>{

   console.log(docs)
    res.send(docs)
  
  });
})




router.get('/editmenberid',function(req,res){

  const {idmenber,keyfield}=req.query;
  const str2obj = str => {
    return str
      .split(',')
      .map(keyVal => {
        return keyVal
          .split(':')
          .map(_ => _.trim())
      })
      .reduce((accumulator, currentValue) => {
        accumulator[currentValue[0]] = currentValue[1]
        return accumulator
      }, {})
  }
  
 var obj=str2obj(keyfield+':'+1)
 Object.keys(obj).forEach(function(el){
  obj[el] = parseInt(obj[el])
})


 MenberProject.update({_id:idmenber},  {$unset: obj})
  .then(doc => {
 console.log(obj)

  res.send(doc)
  })
  .catch(err => {
  //console.error(err)
  })

})
module.exports = router;
