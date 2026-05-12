const axios = require('axios');

const ANNONCE_SERVICE_URL = 'http://localhost:8081';

// Stockage en mémoire des décisions
const decisions = {};

async function approuver(annonceId) {
  // Vérifier que l'annonce existe dans Spring Boot
  try {
    await axios.get(`${ANNONCE_SERVICE_URL}/annonces/${annonceId}`);
  } catch (err) {
    throw new Error(`Annonce ${annonceId} introuvable`);
  }

  // Enregistrer la décision
  decisions[annonceId] = {
    annonceId,
    decision: 'APPROUVEE',
    date: new Date().toISOString()
  };

  // Notifier Spring Boot
  try {
    await axios.patch(`${ANNONCE_SERVICE_URL}/annonces/${annonceId}/publier`);
    console.log(`Annonce ${annonceId} approuvée et publiée`);
  } catch (err) {
    console.warn(`Impossible de notifier Spring Boot :`, err.message);
  }

  return decisions[annonceId];
}

async function rejeter(annonceId, motif) {
  // Vérifier que l'annonce existe dans Spring Boot
  try {
    await axios.get(`${ANNONCE_SERVICE_URL}/annonces/${annonceId}`);
  } catch (err) {
    throw new Error(`Annonce ${annonceId} introuvable`);
  }

  decisions[annonceId] = {
    annonceId,
    decision: 'REJETEE',
    date: new Date().toISOString(),
    motif: motif || 'Non conforme'
  };

  // Notifier Spring Boot
  try {
    await axios.patch(`${ANNONCE_SERVICE_URL}/annonces/${annonceId}/rejeter`);
    console.log(`Annonce ${annonceId} rejetée`);
  } catch (err) {
    console.warn(`Impossible de notifier Spring Boot :`, err.message);
  }

  return decisions[annonceId];
}

module.exports = { approuver, rejeter };