const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const excursionRoute = require("./Router/Excursion");  
const circuitsRoute = require("./Router/Circuits"); 
const reservationRoute = require("./Router/Reservation");  
require("./config/connect");  

const app = express();


const corsOptions = {
  origin: '*',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));  // Utiliser CORS avec des options

// Middleware pour analyser les requêtes entrantes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use("/excursion", excursionRoute);
app.use("/circuits", circuitsRoute);
app.use("/reservation", reservationRoute);

// Gestion des erreurs - Route non trouvée
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

// Gestion des erreurs génériques
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
