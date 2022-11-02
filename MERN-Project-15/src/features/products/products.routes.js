const { Router } = require("express");
const ProductStore = require("./products.module");
let ProductsPage = Router();
ProductsPage.get("/", async (req, res) => {
  let { page = 1, limit = 50, orderBy = "name", order = "asc" } = req.query;
  let take = await ProductStore.find()
    .sort({ [orderBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.send(take);
});

ProductsPage.post("/", async (req, res) => {
  let take = req.body;
  try {
    let make = await ProductStore.create(take);
    res.send(make);
  } catch (error) {
    res.status(400).send(`data passed`);
  }
});

module.exports = ProductsPage;
