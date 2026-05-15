// Validation pour l'ID
function validateId(req, res, next) {
    const id = parseInt(req.params.annonceId);  // ← bien 'annonceId'
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'ID d’annonce invalide' });
    }
    req.params.annonceId = id;
    next();
}
// Validation pour le rejet (motif optionnel)
function validateReject(req, res, next) {
  const { motif } = req.body;
  // Le motif est optionnel, mais on peut limiter sa longueur
  if (motif && (typeof motif !== 'string' || motif.length > 200)) {
    return res.status(400).json({ message: 'Motif trop long (max 200 caractères)' });
  }
  next();
}

module.exports = { validateId, validateReject };