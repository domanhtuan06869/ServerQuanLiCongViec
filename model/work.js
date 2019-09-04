
const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  emailtag:{
    type:Array
  },
  email:{
    type:String
  },
   target:{
    type:String,
    required:true
  },
  starttime:{
    type: Date,
    default: Date.now 
  },

  endday:{
    type:Number
  },
  endmonth:{
    type:Number
  },
  endyear:{
  type:Number
  },
  description:{
      type:String
  },
  status:{
      type:String
  },
  idproject:{
      type:String
  },
  nameproject:{
      type:String
  }

});

const work = mongoose.model('work', WorkSchema);

module.exports = work;