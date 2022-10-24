const mongoose = require("mongoose");

let Userdetails = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, uniqure: true },
  password: { type: Number, required: true },
  age: { type: Number, required: true, min: 18, max: 80 },
});
let Userstore = mongoose.model("user", Userdetails);
module.exports = Userstore;
