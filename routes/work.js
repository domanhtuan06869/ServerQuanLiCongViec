var express = require('express');
var router = express.Router();
var Work =new require('../model/work')
var MenberWork=new require('../model/menberwork')
var Test=new require('../model/inserttest')


/* GET home page. */


//add work
router.post('/',function (req,res){

  const {name,email,target,endday,endmonth,endyear,status,description,nameproject,idproject,emailtag}=req.body
 
  var resulttag = emailtag.split(',');
  const work=new Work({name:name,email:email,emailtag:resulttag,target:target,status:status,endday:endday,endmonth:endmonth,endyear:endyear,description:description,nameproject:nameproject,idproject:idproject});
  work.save()
  //console.log(prj)
  res.send(work)
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

  const {id,name,idwork,idproject,}=req.query;
 MenberWork.findOneAndUpdate({_id:id},{name:name,idwork:idwork,idproject:idproject},{
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
router.get('/deletework',function(req,res){
  Work.deleteMany({idproject:req.query.idproject}, function(err,result) {
 console.log(result)
 res.send(result)
  })

})
router.get('/deletemenberwork',function(req,res){
  MenberWork.remove({ idproject: req.query.idproject }, function(err) {
    if (!err) {
           console.log('ss')
           res.send('ss')
    }
    else {
           console.log('err')
           res.send('err')
    }
  
});
})
router.get('/getallworkmenber',function(req,res){
  MenberWork.find({}).then((docs)=>{
    res.send(docs)
  })
})
router.post('/test',function(req,res){
  var str = req.body.email;
var result = str.split(',');
  console.log(result)
  const test=new Test({name:'vdcg',email:result})
  test.save()
  //console.log(test)
  res.send(test)
  })
  router.get('/test',function(req,res){
    Test.findOne({_id:'5d6e2e4cf1741d1c64bdee53',email:{ $all : ["fhgh"] }}).then((docs)=>{
      res.send(docs.email)
    })
  })
module.exports = router;
