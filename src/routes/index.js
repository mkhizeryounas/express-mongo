import express from 'express';
import { name } from '../../package.json';
const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: About the service
 *     tags:
 *       - About
 *     responses:
 *       200:
 *         description: Returns a welcome message.
 */
router.get('/', async function (req, res) {
  res.reply({ data: { about: `${name} service is working fine` } });
});

module.exports = router;
