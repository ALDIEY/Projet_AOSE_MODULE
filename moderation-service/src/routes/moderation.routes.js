const express = require('express');
const router = express.Router();
const moderationService = require('../services/moderation.service');

/**
 * @swagger
 * /moderations/{annonceId}/approve:
 *   patch:
 *     summary: Approuver une annonce
 *     tags: [Modération]
 *     parameters:
 *       - in: path
 *         name: annonceId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Annonce approuvée
 */


// PATCH /moderations/:annonceId/approve
router.patch('/:annonceId/approve', async (req, res) => {
  const { annonceId } = req.params;
  
  try {
    const decision = await moderationService.approuver(annonceId);
    res.json({
      message: `Annonce ${annonceId} approuvée`,
      decision
    });
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
});

/**
 * @swagger
 * /moderations/{annonceId}/reject:
 *   patch:
 *     summary: Rejeter une annonce
 *     tags: [Modération]
 *     parameters:
 *       - in: path
 *         name: annonceId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motif:
 *                 type: string
 *                 description: Motif du rejet
 *     responses:
 *       200:
 *         description: Annonce rejetée
 */

// PATCH /moderations/:annonceId/reject
router.patch('/:annonceId/reject', async (req, res) => {
  const { annonceId } = req.params;
  const { motif } = req.body;

  try {
    const decision = await moderationService.rejeter(annonceId, motif);
    res.json({
      message: `Annonce ${annonceId} rejetée`,
      decision
    });
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
});

module.exports = router;