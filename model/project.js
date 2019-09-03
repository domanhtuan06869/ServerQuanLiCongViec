
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  email:{
    type:String
  },
  emailtag:{
  type:Array
  },
  desire:{
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
  }
});

const project = mongoose.model('project', ProjectSchema);

module.exports = project;