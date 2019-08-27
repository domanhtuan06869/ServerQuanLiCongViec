
const mongoose = require('mongoose');

const MenberWorkSchema = new mongoose.Schema({
    idwork:{
        type:String,
        require:true
    },name:{
        type:String,
        require:true
    },idproject:{
        type:String
    },
    a0:{
        type:String,
        require:true
    },
    a1:{
    type:String
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

const menberwork = mongoose.model('menberwork', MenberWorkSchema);

module.exports = menberwork;