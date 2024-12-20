const express = require('express');
const Circuits = require('../Models/Circuits'); // Assurez-vous que votre modèle Excursion est correctement importé
const router = express.Router();

router.post('/addCircuits', async (req, res) => {
    try {
      const data = req.body;
      // Créer une nouvelle Circuits avec les données
      const newCircuits = new Circuits(data);
      // Sauvegarder l'excursion dans la base de données
      await newCircuits.save();
    
      res.json(newCircuits);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.get("/getall", async (req, res) => {
    Circuits.find()
      .then((Circuits) => {
        res.send(Circuits);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  module.exports = router;