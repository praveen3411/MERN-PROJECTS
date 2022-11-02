const mongoose = require("mongoose");

let ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

let ProductStore = mongoose.model("product", ProductSchema);

module.exports = ProductStore;
