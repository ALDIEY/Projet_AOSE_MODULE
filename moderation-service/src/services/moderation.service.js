const axios = require('axios');
require('dotenv').config();

const ANNONCE_SERVICE_URL = process.env.ANNONCE_SERVICE_URL || 'http://localhost:8081';

// Stockage en mémoire des décisions
const decisions = {};

async function approuver(annonceId) {
  // Vérifier que l'annonce existe dans Spring Boot
  console.log('annonce id',annonceId);
  
  try {
    await axios.get(`${ANNONCE_SERVICE_URL}/annonces/${annonceId}`);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new Error(`Annonce ${annonceId} introuvable`);
    }
    throw new Error(`Erreur de communication avec le service d'annonces: ${err.message}`);
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
    // On ne lance pas d'erreur pour ne pas bloquer, mais on pourrait
  }

  return decisions[annonceId];
}

async function rejeter(annonceId, motif) {
  // Vérifier que l'annonce existe dans Spring Boot
  try {
    await axios.get(`${ANNONCE_SERVICE_URL}/annonces/${annonceId}`);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new Error(`Annonce ${annonceId} introuvable`);
    }
    throw new Error(`Erreur de communication avec le service d'annonces: ${err.message}`);
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

// Fonction pour obtenir toutes les décisions (bonus)
function getAllDecisions() {
  return Object.values(decisions);
}

module.exports = { approuver, rejeter, getAllDecisions };