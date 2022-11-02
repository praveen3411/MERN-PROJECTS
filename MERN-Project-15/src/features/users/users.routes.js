const { Router } = require("express");
const UserStore = require("./users.module");
let UserRoute = Router();

UserRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let take = await UserStore.findOne({ email, password });
    if (!take) {
      return res.status(500).send(`User details is wrong`);
    }
    res.send({
      token: `${take.id}:${take.email}:${take.password}`,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
UserRoute.post("/signup", async (req, res) => {
  let { email } = req.body;
  try {
    let take = await UserStore.findOne({ email });
    if (take) {
      return res
        .status(500)
        .send(`Please give unique email because user already exists`);
    }
    let newuser = await UserStore.create(req.body);
    res.send({
      token: `${newuser.id}:${newuser.email}:${newuser.password}`,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
UserRoute.get("/userdetails", async (req, res) => {
  let take = await UserStore.find();
  res.send(take);
});
module.exports = UserRoute;
