const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const auth = require(`${__dirname}/../middleware/auth.js`);
const fs = require("fs");
let userroutes = Router();
userroutes.use(auth);
let dbfile = fs.readFileSync(`${__dirname}/../db.json`, { encoding: "utf-8" });
let updated = (updatingfile) => {
  fs.writeFileSync(`${__dirname}/../db.json`, JSON.stringify(updatingfile), {
    encoding: "utf-8",
  });
};
let db = JSON.parse(dbfile);
let users = db.users;
userroutes.get("/", (req, res) => {
  res.send(users);
});

userroutes.get("/:id", (req, res) => {
  let { id } = req.params;
  let boom = users.find((item) => item.id === Number(id));
  if (!boom) {
    res.status(400).send(`your item is not found ${id}`);
  }
  res.send(boom);
});

userroutes.delete("/:id", (req, res) => {
  let { id } = req.params;
  let boomone = users.findIndex((item) => item.id === Number(id));
  users.splice(boomone, 1);
  updated({ ...db, users });
  res.send(users);
});

userroutes.post(
  "/",
  body("name").isAlpha(),
  body("email").isEmail(),
  body("password").isAlphanumeric().isLength({ min: 7, max: 10 }),
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
    }
    users = [
      ...users,
      {
        ...req.body,
        id: users.length + 1,
      },
    ];
    updated({ ...db, users });
    res.send(users);
  }
);

userroutes.patch("/:id", (req, res) => {
  let { id } = req.params;
  users = users.map((item) => {
    if (item.id === Number(id)) {
      return {
        ...item,
        ...req.body,
      };
    } else {
      return item;
    }
  });
  updated({ ...db, users });
  res.send(users);
});

module.exports = userroutes;
