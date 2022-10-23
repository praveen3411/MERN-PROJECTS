const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const userRoute = require("./features/users/users.routes");
let app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.get("/", async (req, res) => {
  res.send("hello");
});

app.listen(8030, async (req, res) => {
  await connect();
  console.log("server is running");
});
