const mongoose = require("mongoose");

let Cartdetails = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});
let Cartstore = mongoose.model("cart", Cartdetails);
module.exports = Cartstore;
