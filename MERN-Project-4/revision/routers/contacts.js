const { Router } = require("express");
const fs = require("fs");
const auth = require(`${__dirname}/../middleware/auth.js`);
let contactsroutes = Router();
contactsroutes.use(auth);
let dbfile = fs.readFileSync(`${__dirname}/../db.json`, { encoding: "utf-8" });
let updated = (updatingfile) => {
  fs.writeFileSync(`${__dirname}/../db.json`, JSON.stringify(updatingfile), {
    encoding: "utf-8",
  });
};
let db = JSON.parse(dbfile);
let contacts = db.contacts;
contactsroutes.get("/", (req, res) => {
  res.send(contacts);
});

contactsroutes.get("/:id", (req, res) => {
  let { id } = req.params;
  let boom = contacts.find((item) => item.id === Number(id));
  if (!boom) {
    res.status(400).send(`your item is not found ${id}`);
  }
  res.send(boom);
});

contactsroutes.delete("/:id", (req, res) => {
  let { id } = req.params;
  let boomone = contacts.findIndex((item) => item.id === Number(id));
  contacts.splice(boomone, 1);
  updated({ ...db, contacts });
  res.send(contacts);
});

contactsroutes.post("/", (req, res) => {
  contacts = [
    ...contacts,
    {
      ...req.body,
      id: contacts.length + 1,
    },
  ];
  updated({ ...db, contacts });
  res.send(contacts);
});

contactsroutes.patch("/:id", (req, res) => {
  let { id } = req.params;
  contacts = contacts.map((item) => {
    if (item.id === Number(id)) {
      return {
        ...item,
        ...req.body,
      };
    } else {
      return item;
    }
  });
  updated({ ...db, contacts });
  res.send(contacts);
});

module.exports = contactsroutes;
