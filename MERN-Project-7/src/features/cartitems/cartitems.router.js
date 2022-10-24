const { Router } = require("express");
const Userstore = require("../users/users.model");
const Cartstore = require("./cartitems.model");
let authmiddleware = async (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    let [id, email, password] = token.split(":");
    // console.log(id, email, password);
    let user = await Userstore.findById(id);
    if (user.email === email && user.password === password) {
      req.userId = id;
      next();
    } else {
      res.status(401).send(`not found`);
    }
  } else {
    res.status(401).send(`cannot perform operations missing operations`);
  }
};
let cartroute = Router();
cartroute.use(authmiddleware);
cartroute.get("/", async (req, res) => {
  try {
    let cartone = await Cartstore.find({
      userId: req.userId,
    }).populate("userId");
    res.send(cartone);
  } catch (error) {
    res.status.apply(500).send(error.message);
  }
});
cartroute.post("/", async (req, res) => {
  try {
    let exists = await Cartstore.findOne({
      userId: req.userId,
      productId: req.body.productId,
    });
    if (exists) {
      let carttwo = await Cart.updateOne(
        {
          userId: req.userId,
          productId: req.body.productId,
        },
        {
          $set: {
            quantity: req.body.quantity,
          },
        }
      );
    } else {
      let carttwo = await Cartstore.create({
        ...req.body,
        userId: req.userId,
      });
    }
    res.send(carttwo);
  } catch (error) {
    res.status.apply(500).send(error.message);
  }
});
module.exports = cartroute;
