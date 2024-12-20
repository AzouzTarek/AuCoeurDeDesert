const mongoose = require("mongoose");
const {Schema} = mongoose;

const DetailSchema = new mongoose.Schema({
    description: { 
        type: String,
    },
    
    emplacement: {
        type: String,
      }

});


const JourSchema = new mongoose.Schema({
    jour: { 
        type: String, 
    }, 
    details: { 
        type: [DetailSchema]
    },
    heur_depart: {
      type: String
      },
 heur_arrive: {
     type: String,
   },
});

const circuits = mongoose.model("circuits", {
  title: {
    type: String, 
  },
  description:{
    type: String,
  },
 
  programme: {
    type: [JourSchema]
  },

  durée: {
    type: String,
  },
  image:{
    type: String,
  },
  conditionGenerale: {
    type:String
  }
  
});
module.exports = circuits;
