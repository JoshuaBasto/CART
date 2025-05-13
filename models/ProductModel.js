const mongoose = require('mongoose');

const productModelSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('ProductModel', productModelSchema);
