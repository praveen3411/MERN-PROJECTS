const { Router } = require("express");
const Productstore = require("./products.model");
let productsroute = Router();
productsroute.get("/", async (req, res) => {
  let one = await Productstore.find();
  res.send(one);
});
module.exports = productsroute;
