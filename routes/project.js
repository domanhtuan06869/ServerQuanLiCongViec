var express = require('express');
var sql = require('mssql');
var router = express.Router();
const { Expo } = require('expo-server-sdk')
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
  const {idproject,email}=req.query
 Project.update({ _id:idproject}, { $pull: { emailtag:{$in: [email]}}}).then((doc)=>{
  res.send(doc)
 })

})
router.get('/getprojectwithmenber',function(req,res){
  const {email}=req.query
  Project.find({emailtag:{ $all : [email] }}).then((docs)=>{
    res.send(docs)
  })
})

router.get('/getoneproject',function(req,res){
  Project.findOne({_id:req.query.id}).then((doc)=>{
    res.send(doc)
  })

})
router.post('/editproject',function(req,res){

  const {id,name,status,endday,endmonth,endyear,desire,emailtag,description,company}=req.body;
  Project.findOneAndUpdate({_id:id},{name:name,status:status,description:description,endday:endday,endmonth:endmonth,endyear:endyear,desire:desire,company:company,emailtag:emailtag.split(',')},{
    new: true,                    
    runValidators: true             
  })
  .then(doc => {
 
      res.send(doc)
  })
  .catch(err => {
  console.error(err)
  })

})
router.get('/hihi',function(req,res){
  var arr=['fdg','hgj','fbchb']
  for(let i=0;i<arr.length;i++){
      console.log(arr[i])
      let query = "select duan.id ,duan.tenduan from duan where id=111"  ;
      request.query(query, function (err, recordset) {
    
        if (err) console.log(err)
    
    
      console.log(recordset)
      res.end(JSON.stringify(recordset))

    
    });
  }
 

})
/*--------------------------------------------------------sql----------------------------------------------------------*/
router.post('/insertproject',function(req,res){
  var request = new sql.Request();
  const {name,company,email,emailtag,desire,starttime,endtime,id,status,description,token}=req.body
  var str = emailtag;
  var resulttag = str.split(',');
  var tokentag = token.split(',');

  request.input('id',id)
  request.input('tenduan',name)
  request.input('email',email)
  request.input('congty',company)
  request.input('mongmuon',desire)
  request.input('thoigianstart',starttime)
  request.input('thoigianend',endtime)
  request.input('trangthai',status)
  request.input('mota',description).execute('insertduan').then( function(recordset){
  //  console.log(recordset.recordset)

    for(let i=0;i<resulttag.length;i++){
      var request = new sql.Request();
     
    request.input('idproject',id)
    request.input('emailtag',resulttag[i])
    request.input('token',tokentag[i])
    .execute('insertemailtagduan').then( function(recordset){
    
res.end(JSON.stringify(recordset))
    }).catch(err=>{})
    
    }
    push('bạn được giao  dự án mới',tokentag)
     var date=new Date()
     var dateend=new Date(endtime)
     var c= dateend-date-30000
     console.log(c)
    const t = new MyTimeout();
   t.setTimeout(id, () => { 
  push('Dự án của bạn sắp hết hạn rồi kìa'+id,tokentag)
  
},c);
    res.send(recordset.recordset)
  })


})

//get data du an voi email
router.get('/getduansql',function(req,res){
  

var request = new sql.Request();
request.input('email',req.query.email).execute('getproject').then((docs)=>{
  res.send(docs.recordset)
})
})

//get one data du an voi id
router.get('/getoneduanwithid',function(req,res){
  var request= new sql.Request()
  request.input('id',req.query.idproject).execute('getprojectwithid').then(function(recordset){
    res.send(recordset.recordset[0])
  })
})

/// get data menber of project
router.get('/getmenberprojectsql',function(req,res){
  req
  var request= new sql.Request()
  request.input('idduan',req.query.idproject).execute('getmenberproject').then(function(recordset){
    res.send(recordset.recordset)
  
  })
})

router.get('/getprojectlienquan',function(req,res){
  
  var request=new sql.Request()
  request.input('emailtag',req.query.email).execute('getduanlienquan').then(function(recordset){
    res.send(recordset.recordset)
  })
})
router.post('/updateprojectsql',function(req,res){
  var request = new sql.Request();
  const {name,company,email,emailtag,desire,starttime,endtime,id,status,description,token}=req.body
  var str = emailtag;
  var resulttag = str.split(',');
  var tokentag=token.split(',')
  request.input('id',id)
  request.input('tenduan',name)
  request.input('email',email)
  request.input('congty',company)
  request.input('mongmuon',desire)
  request.input('thoigianstart',starttime)
  request.input('thoigianend',endtime)
  request.input('trangthai',status)
  request.input('mota',description).execute('updateduan').then( function(recordset){
   var request=new sql.Request()
   request.input('idduan',id).execute('deletemenberproject').then(function(recordset){
  for(let i=0;i<resulttag.length;i++){
      var request = new sql.Request();
    request.input('idproject',id)
    request.input('emailtag',resulttag[i])
    request.input('token',tokentag[i])
    .execute('insertemailtagduan').then( function(recordset){
    console.log(resulttag[i])
    }).catch(err=>{})
    }

   })
    res.send(recordset.recordset)
    push('Có thay đổi trong dự án'+name,tokentag)
    const t = new MyTimeout();
   t.setTimeout(id, () => { 
   push('Dụ án sắp hết hạn'+id,tokentag)
}, 10000);
  })
})

//lay gia tri email duoc tag trong project
router.get('/getoneemailtagduan',function(req,res){
  var request=new sql.Request()
  request.input('idproject',req.query.idproject).execute('getoneemailtagduanid').then(function(recordset){
    res.send(recordset.recordset)
  })
})



router.get('/getemailandtoken',function(req,res){
  var request=new sql.Request()
  request.input('idproject',req.query.idproject).execute('getemailandtoken').then(function(recordset){
    res.send(recordset.recordset)
  })
})
module.exports = router;

function push(tit,arr){
  let expo = new Expo();

  let messages = [{
    to: arr,
    sound: 'default',
    body: tit,
    title:'Chào',
 
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
    
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      //  console.log(receipts);
  
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
