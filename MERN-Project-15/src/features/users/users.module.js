const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: Number, required: true, min: 0 },
  age: { type: Number, required: true, min: 18, max: 80 },
});

let UserStore = mongoose.model("user", UserSchema);
module.exports=UserStore;
