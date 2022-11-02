const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
const UserRoute = require("./features/users/users.routes");
const ProductsPage = require("./features/products/products.routes");
let app = express();
app.use(cors());
app.use(express.json());
app.use("/users", UserRoute);
app.use("/products", ProductsPage);
app.get("/", (req, res) => {
  res.send(`Your server is running successful`);
});
app.listen(8030, async (req, res) => {
  await connect();
  console.log(`app is running on port number localhost:8030`);
});
