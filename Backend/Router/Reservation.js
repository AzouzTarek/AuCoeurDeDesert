const express = require('express');
const nodemailer = require('nodemailer');
const Reservation = require('../Models/Reservation'); 

const router = express.Router();

router.post('/addreservations', async (req, res) => {
  const data = req.body;

  // Configurer Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'titoazouz47@gmail.com', // Votre email
      pass: 'afzpmkszgbbmakgq', // Mot de passe d'application ou similaire
    },
  });


// Vérification et formatage de DateAller
const dateAller = new Date(data.DateAller);
const formattedDateAller = !isNaN(dateAller) ? dateAller.toLocaleDateString() : 'Non spécifiée';

  // Email pour l'agence envoyé depuis l'email du client
const mailToAgency = {
  from: 'titoazouz47@gmail.com',
  to: 'tarekazouz47@gmail.com',
  subject: 'Nouvelle Réservation',
  text: `Nouvelle réservation par ${data.Nom} ${data.Prenom}.\n
          Nom: ${data.Nom}\n
          Prénom: ${data.Prenom}\n
          Adresse: ${data.Adresse}\n
          Code Postal: ${data.Code_postal}\n
          Ville: ${data.Ville}\n
          Pays: ${data.Pays}\n
          Email: ${data.Email}\n
          Code Téléphone: ${data.code_telephone}\n
          Tél: ${data.Tél}\n
          Date Aller: ${formattedDateAller}\n
          Date Retour: ${data.DateRetour ? new Date(data.DateRetour).toLocaleDateString() : 'Non spécifiée'}\n
          Réservation Titre: ${data.reservationTitle}`,
  replyTo: data.Email,
};

  try {
    // Créer une nouvelle réservation avec les données
    const newReservation = new Reservation(data);

    // Sauvegarder la réservation dans la base de données
    await newReservation.save();

    // Envoyer l'email à l'agence
    await transporter.sendMail(mailToAgency);

    // Répondre au client avec succès
    res.status(200).json({
      message: 'Réservation envoyée et enregistrée avec succès !',
      reservation: newReservation,
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email ou de l\'enregistrement:', error);
    res.status(500).json({ message: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
  }
});

module.exports = router;
