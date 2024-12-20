const mongoose = require("mongoose");
const {Schema} = mongoose;

const reservation = mongoose.model("reservation", {
  Nom: {
    type: String, 
  },
  Prenom: {
    type: String,
  },
  Adresse: {
    type: String,
  },
  Code_postal: {
    type: String,
  },
  Ville:{
    type: String,
  },
  Pays: {
    type: String
  },
  
 Email:{
    type: String,
    
  },
  code_telephone: {
    type: String,
  },

  Tél: {
    type: String,
  },
  DateAller:{
    type: Date,
  },
  DateRetour:{
    type: Date,
  },
  message:{
    type: String,
  },
  reservationTitle:{
    type: String,
  },
  
});
module.exports = reservation;
