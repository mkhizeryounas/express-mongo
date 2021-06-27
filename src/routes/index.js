import express from 'express';
import { name } from '../../package.json';
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    About:
 *      type: object
 *      properties:
 *        about:
 *          type: string
 *          description: Information about the service
 */

/**
 * @swagger
 * tags:
 *   name: About
 *   description: Information about the service
 */

/**
 * @swagger
 * /:
 *  get:
 *    description: About the service
 *    tags: [About]
 *    responses:
 *      200:
 *        description: Returns a welcome message.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/About'
 */
router.get('/', async function (req, res) {
  res.reply({ data: { about: `${name} service is working fine` } });
});

module.exports = router;
