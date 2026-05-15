const moderationService = require('../services/moderation.service');

async function approve(req, res) {
    console.log("Appel approve avec params:", req.params);
    try {
        const annonceId = req.params.annonceId;   // ← changer 'id' en 'annonceId'
        console.log("annonceId reçu:", annonceId);

        const result = await moderationService.approuver(annonceId);
        console.log("Résultat approuver:", result);

        res.json({ message: 'Annonce approuvée', decision: result });
    } catch (error) {
        console.error("Erreur dans approve:", error);
        if (error.message.includes('introuvable')) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}


async function reject(req, res) {
  try {
    const annonceId = req.params.id;
    const { motif } = req.body;
    const result = await moderationService.rejeter(annonceId, motif);
    res.json({ message: 'Annonce rejetée', decision: result });
  } catch (error) {
    console.error(error);
    if (error.message.includes('introuvable')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// Optionnel : obtenir toutes les décisions
async function getAllDecisions(req, res) {
  const decisions = moderationService.getAllDecisions();
  res.json(decisions);
}

module.exports = { approve, reject, getAllDecisions };