const { Router } = require("express");
const auth = require(`${__dirname}/../middleware/auth.js`);
const fs = require("fs");
let productroutes = Router();
productroutes.use(auth);
let dbfile = fs.readFileSync(`${__dirname}/../db.json`, { encoding: "utf-8" });
let updated = (updatingfile) => {
  fs.writeFileSync(`${__dirname}/../db.json`, JSON.stringify(updatingfile), {
    encoding: "utf-8",
  });
};
let db = JSON.parse(dbfile);
let products = db.products;
productroutes.get("/", (req, res) => {
  res.send(products);
});

productroutes.get("/:id", (req, res) => {
  let { id } = req.params;
  let boom = products.find((item) => item.id === Number(id));
  if (!boom) {
    res.status(400).send(`your item is not found ${id}`);
  }
  res.send(boom);
});

productroutes.delete("/:id", (req, res) => {
  let { id } = req.params;
  let boomone = products.findIndex((item) => item.id === Number(id));
  products.splice(boomone, 1);
  updated({ ...db, products });
  res.send(products);
});

productroutes.post("/", (req, res) => {
  products = [
    ...products,
    {
      ...req.body,
      id: products.length + 1,
    },
  ];
  updated({ ...db, products });
  res.send(products);
});

productroutes.patch("/:id", (req, res) => {
  let { id } = req.params;
  products = products.map((item) => {
    if (item.id === Number(id)) {
      return {
        ...item,
        ...req.body,
      };
    } else {
      return item;
    }
  });
  updated({ ...db, products });
  res.send(products);
});

module.exports = productroutes;
