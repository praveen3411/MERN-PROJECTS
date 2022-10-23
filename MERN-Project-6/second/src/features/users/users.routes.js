const { Router } = require("express");
const details = require("./users.schema");
let userRoute = Router();
userRoute.get("/", async (req, res) => {
  let { page = 1, limit = 20, orderBy = "id", order = "asc" } = req.query;
  let output   = await details
    .find()
    .sort({ [orderBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(output);
});
// userRoute.get("/:id", async (req, res) => {
//   let { _id } = req.params;
//   try {
//     let data = await details.findById(_id);
//     res.send(data);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });
userRoute.post("/", async (req, res) => {
  let one = req.body;
  try {
    let data = await details.create(one);
    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = userRoute;
