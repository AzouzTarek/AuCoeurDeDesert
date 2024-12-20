const mongoose = require("mongoose");
const {Schema} = mongoose;

const excursion = mongoose.model("excursions", {
  title: {
    type: String, 
  },
  subtitle: {
    type: String,
  },
  heur_depart: {
    type: String,
  },
  heur_arrive: {
    type: String,
  },
  programme: [{
    type: String
  }],
  image:{
    type: String,
    
  },
  durée: {
    type: String,
  }
  
});
module.exports = excursion;
