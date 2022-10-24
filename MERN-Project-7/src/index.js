const express = require("express");
const cors = require("cors");
const connectd = require("./config/db");
const productsroute = require("./features/products/products.router");
const cartroute = require("./features/cartitems/cartitems.router");
const userroute = require("./features/users/users.router");
let PORT = 8030;
let app = express();
app.use(cors());
app.use(express.json());
app.use("/products", productsroute);
app.use("/cart", cartroute);
app.use("/users", userroute);
app.get("/", async (req, res) => {
  await res.send("Running successfull");
});
app.listen(PORT, async () => {
  await connectd();
  console.log(`App is running on host at localhost:${PORT}`);
});
