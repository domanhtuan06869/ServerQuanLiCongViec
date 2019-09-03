
const mongoose = require('mongoose');

const MenberProjectSchema = new mongoose.Schema({
 name:{
        type:String
    },
    email:{
        type:Array
    }
    
  
},{ versionKey: false });

const menberproject = mongoose.model('insert', MenberProjectSchema);

module.exports = menberproject;