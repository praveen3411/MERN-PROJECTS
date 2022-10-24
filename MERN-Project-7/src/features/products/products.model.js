const mongoose = require("mongoose");

let Productdetails = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, min: 0, max: 400 },
  quantity: { type: Number, min: 0, max: 100 },
});
let Productstore = mongoose.model("product", Productdetails);
module.exports = Productstore;
