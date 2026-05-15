const express = require('express');
const router = express.Router();
const moderationController = require('../controller/moderation.controller');
const authenticateToken = require('../middleware/auth');
const { validateId, validateReject } = require('../middleware/validation');

// ---------- Toutes les routes ci-dessous sont protégées par JWT ----------
router.use(authenticateToken);

/**
 * @swagger
 * /moderations/{annonceId}/approve:
 *   patch:
 *    
 *     tags: [Modération]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: annonceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce à approuver
 *     responses:
 *       200:
 *         description: Annonce approuvée et publiée
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Token invalide ou expiré
 *       404:
 *         description: Annonce introuvable
 *       500:
 *         description: Erreur serveur
 */
router.patch('/:annonceId/approve', validateId, moderationController.approve);

/**
 * @swagger
 * /moderations/{annonceId}/reject:
 *   patch:
 *    
 *     tags: [Modération]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: annonceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'annonce à rejeter
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motif:
 *                 type: string
 *                 maxLength: 200
 *                 description: Motif du rejet (optionnel)
 *     responses:
 *       200:
 *         description: Annonce rejetée
 *       400:
 *         description: ID invalide ou motif trop long
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Token invalide ou expiré
 *       404:
 *         description: Annonce introuvable
 *       500:
 *         description: Erreur serveur
 */
router.patch('/:annonceId/reject', validateId, validateReject, moderationController.reject);

/**
 * @swagger
 * /moderations/decisions:
 *   get:
 *    
 *     tags: [Modération]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des décisions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   annonceId: { type: integer }
 *                   decision: { type: string }
 *                   date: { type: string }
 *                   motif: { type: string }
 */
router.get('/decisions', moderationController.getAllDecisions);

module.exports = router;