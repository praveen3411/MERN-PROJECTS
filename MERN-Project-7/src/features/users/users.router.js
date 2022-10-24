const { Router } = require("express");
const Userstore = require("./users.model");
let userroute = Router();
userroute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await Userstore.findOne({ email, password });
    if (!user) {
      return res.status(400).send(`credientals not match`);
    }
    res.send({
      token: `${user.id}:${user.email}:${user.password}`,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userroute.post("/signup", async (req, res) => {
  let { email } = req.body;
  try {
    let user = await Userstore.findOne({ email });
    if (user) {
      return res.status(400).send(`user already exists`);
    }
    let newuser = await Userstore.create(req.body);
    res.send({
      token: `${newuser.id}:${newuser.email}:${newuser.password}`,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
userroute.get("/", async (req, res) => {
  let take = await Userstore.find();
  res.send(take);
});
module.exports = userroute;
