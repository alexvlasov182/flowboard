import { Router } from 'express';
import { createPage, getUserPages, getPages, updatePage, deletePage } from './page.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: Page management endpoints
 */

/**
 * @swagger
 * /api/pages:
 *   get:
 *     summary: Get all pages
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: List of all pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Page'
 */
router.get('/', getPages);

/**
 * @swagger
 * /api/pages/user/{userId}:
 *   get:
 *     summary: Get pages by user
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of user's pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Page'
 */
router.get('/user/:userId', getUserPages);

/**
 * @swagger
 * /api/pages:
 *   post:
 *     summary: Create a new page
 *     tags: [Pages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PageInput'
 *     responses:
 *       201:
 *         description: Page created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 */
router.post('/', createPage);

/**
 * @swagger
 * /api/pages/{id}:
 *   put:
 *     summary: Update an existing page
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PageInput'
 *     responses:
 *       200:
 *         description: Page updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       404:
 *         description: Page not found
 */
router.put('/:id', updatePage);

/**
 * @swagger
 * /api/pages/{id}:
 *   delete:
 *     summary: Delete a page
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the page
 *     responses:
 *       204:
 *         description: Page deleted successfully
 *       404:
 *         description: Page not found
 */
router.delete('/:id', deletePage);

export default router;
