const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartID: { type: String, required: true, unique: true },
  productModel: { type: String, ref: 'ProductModel', required: true },
  customerID: { type: String, required: true },
  cartStatus: { type: String, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);

// AMOGUSSSS