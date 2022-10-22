const express = require("express");
const mongoose = require("mongoose");
let app = express();

let userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  ip_address: String,
  age: Number,
});

let package = mongoose.model("users", userSchema);
app.get("/", async (req, res) => {
  let { page = 1, limit = 20, orderBy = "id", order = "asc" } = req.query;
  let updates = await package
    .find({}, { _id: 0, id: 1, first_name: 1, gender: 1 })
    .sort({ [orderBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(updates);
});

app.listen(8030, async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017/pro`);
  console.log(`port is running successfuly on http://localhost:8030`);
});
