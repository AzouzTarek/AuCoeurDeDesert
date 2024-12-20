const express = require('express');
const multer = require('multer');
const path = require('path');
const Excursion = require('../Models/Excursion'); // Assurez-vous que votre modèle Excursion est correctement importé
const fs = require('fs');

const router = express.Router();

// Définir le stockage pour Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads'; // Dossier où les fichiers seront enregistrés
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Crée le dossier s'il n'existe pas
    }
    cb(null, uploadDir); // Dossier de destination
  },
  filename: (req, file, cb) => {
    // Utiliser le nom d'origine du fichier
    const originalName = file.originalname;
    const extname = path.extname(originalName);

    // Vous pouvez vérifier si le fichier existe déjà, par exemple
    const filePath = path.join('./uploads', originalName);
    if (fs.existsSync(filePath)) {
      cb(new Error('Ce fichier existe déjà'), null); // Erreur si le fichier existe déjà
    } else {
      cb(null, originalName); // Utiliser le nom d'origine du fichier
    }
  }
});

// Initialiser Multer avec la configuration
const upload = multer({ storage: storage });

// Route POST pour ajouter une excursion avec une image
router.post('/addExcursion', upload.single('image'), async (req, res) => {
  try {
    const data = req.body;

    // Si un fichier est téléchargé, ajoutez son chemin à l'excursion
    if (req.file) {
      data.image = req.file.path; // Stocke le chemin de l'image téléchargée
    }

    // Créer une nouvelle excursion avec les données
    const newExcursion = new Excursion(data);
    
    // Sauvegarder l'excursion dans la base de données
    await newExcursion.save();
  
    res.json(newExcursion);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/getall", async (req, res) => {
  Excursion.find()
    .then((Excursion) => {
      res.send(Excursion);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
