const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - cartID
 *         - productModel
 *         - customerID
 *         - cartStatus
 *       properties:
 *         cartID:
 *           type: string
 *           description: Unique identifier for the cart
 *         productModel:
 *           type: string
 *           description: ID or reference to a product from another service
 *         customerID:
 *           type: string
 *           description: ID of the customer
 *         cartStatus:
 *           type: string
 *           description: Status of the cart (e.g. 'active', 'checked-out')

 * /api/carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Get all carts
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: A list of carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */
router.get('/', async (req, res) => {
  const carts = await Cart.find();
  res.json(carts);
});

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     responses:
 *       200:
 *         description: The cart data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 */
router.get('/:id', async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  cart ? res.json(cart) : res.status(404).send("Not found");
});

/**
 * @swagger
 * /api/carts/{id}:
 *   put:
 *     summary: Update a cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: The updated cart
 *       400:
 *         description: Invalid input
 */
router.put('/:id', async (req, res) => {
  const updated = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     summary: Delete a cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart ID
 *     responses:
 *       204:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 */
router.delete('/:id', async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
