var express = require('express');
var router = express.Router();
var Work =new require('../model/work')
var MenberWork=new require('../model/menberwork')

/* GET home page. */


//add work
router.post('/',function (req,res){

  const {name,email,target,endday,endmonth,endyear,status,description,nameproject,idproject}=req.body
  const work=new Work({name:name,email:email,target:target,status:status,endday:endday,endmonth:endmonth,endyear:endyear,description:description,nameproject:nameproject,idproject:idproject});
  work.save()
  //console.log(prj)
  res.send(work._id)
})


//addmenber work
router.post('/workmenber',function(req,res){
const {a0:a0,a1,a2,a3,a4}=req.body
const mbwork=new MenberWork({a0:a0,a1:a1,a2:a2,a3:a3,a4:a4})
mbwork.save()
console.log(mbwork)
res.send(mbwork._id)
})

//get work with id
router.get('/', function(req, res, next) {
  Work.findOne({_id:req.query.id}).then((docs)=>{

    console.log(docs)
    res.send(docs)
  })
});

//edit add id work and name work
router.get('/editwork',function(req,res){

  const {id,name,idwork}=req.query;
 MenberWork.findOneAndUpdate({_id:id},{name:name,idwork:idwork},{
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
// get all work
router.get('/getallmenber',function(req,res){
  MenberWork.find({}).then((docs)=>{

    res.send(docs)
  
  });

})

router.get('/getonemenberwork',function(req,res){

 MenberWork.findOne({idwork:req.query.idwork}).then((docs)=>{

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


MenberWork.update({_id:idmenber},  {$unset: obj})
  .then(doc => {
 console.log(obj)

  res.send(doc)
  })
  .catch(err => {

  })

})

//get one object menber
router.get('/getonemenber',function(req,res){

  MenberWork.findOne({_id:req.query.idmenber}).then((docs)=>{

   console.log(docs)
    res.send(docs)
  
  });
})
router.get('/getall',function(req,res){
  Work.find({idproject:req.query.idproject}).then((docs)=>{
res.send(docs)
  })
})
module.exports = router;
