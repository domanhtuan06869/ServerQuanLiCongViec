var express = require('express');
var router = express.Router();
var Project =new require('../model/project')
var  MenberProject=new require('../model/menberproject')


/* GET home page. */
router.get('/', function(req, res, next) {
  Project.find({email:req.query.email}).then((docs)=>{

    res.send(docs)
  })
});
router.post('/',function (req,res){

  const {name,company,email,emailtag,desire,endday,endmonth,endyear,status,description}=req.body
  var str = emailtag;
  var resulttag = str.split(',');
  const prj=new Project({name:name,email:email,emailtag:resulttag,company:company,status:status,desire:desire,endday:endday,endmonth:endmonth,endyear:endyear,description:description});
  prj.save()
  //console.log(prj)
  res.send(prj._id)
})


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


router.get('/getonemenberproject',function(req,res){

  Project.findOne({_id:req.query.idproject}).then((docs)=>{

  // console.log(docs)
    res.send(docs.emailtag)
  
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
 //console.log(obj)

  res.send(doc)
  })
  .catch(err => {

  })

})

router.get('/deleteproject',function(req,res){
  const removePrj=new Project({_id:req.query.id});
  removePrj.remove()
  console.log(removePrj)
  res.send(removePrj)
})



router.get('/deletemenberproject',function(req,res){
  const {id,email}=req.query
 Project.update({ _id: '5d6e3f816fef5f00047c2a79' }, { $pull: { emailtag:{$in: ['tt@gmail.com']}}}).then((doc)=>{
  res.send(doc)
 })

})
router.get('/getprojectwithmenber',function(req,res){
  const {email}=req.query
  Project.find({_id:'5d6e2e4cf1741d1c64bdee53',emailtag:{ $all : [email] }}).then((docs)=>{
    res.send(docs)
  })
})

module.exports = router;
