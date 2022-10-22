const express = require("express");
const mongoose = require("mongoose");
let app = express();
let userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  ip_address: Number,
  age: Number,
});
let packing = mongoose.model("users", userSchema);
app.get("/", async (req, res) => {  
  const { page = 1, limit = 20, orderBy = "id", order = "asc" } = req.query;
  let one = await packing
    .find({}, { _id: 0, id: 1, first_name: 1, last_name: 1, gender: 1 })
    .sort({ [orderBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(one);
});

app.listen(8030, async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017/pro`);
  console.log(`Server is running on http://localhost:8030`);
});
