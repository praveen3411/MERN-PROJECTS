const mongoose = require("mongoose");

let NewDetails = new mongoose.Schema({
  id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, require: true },
  email: { type: String, required: false, default: "Male" },
  ip_address: Number,
  age: { type: Number, min: 18, max: 60, required: true },
});
let details = mongoose.model("store", NewDetails);
module.exports = details;
