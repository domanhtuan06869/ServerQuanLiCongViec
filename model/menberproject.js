
const mongoose = require('mongoose');

const MenberProjectSchema = new mongoose.Schema({
    idproject:{
        type:String,
        require:true
    },name:{
        type:String
    },
    a0:{
        type:String,
        require:true
    },
    a1:{
    type:String,
    require:true
    },
    a2:{
    type:String
        },
    a3:{
     type:String
      },
      a4:{
        type:String
      }},{ versionKey: false });

const menberproject = mongoose.model('menberproject', MenberProjectSchema);

module.exports = menberproject;