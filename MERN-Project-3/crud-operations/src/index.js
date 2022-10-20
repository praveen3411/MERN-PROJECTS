const express = require("express");
const fs = require("fs");
let dbfile = fs.readFileSync(`${__dirname}/../db.json`, { encoding: "utf-8" });
let updating = (boom) => {
  fs.writeFileSync(`${__dirname}/../db.json`, JSON.stringify(boom), {
    encoding: "utf-8",
  });
};
let db = JSON.parse(dbfile);
let contacts = db.contacts;
let app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<center><h2>Welcome to server</h2></center>");
});
//ALL Contacts

app.get("/contacts", (req, res) => {
  res.send(contacts);
});
// Get With Products
app.get("/contacts/:id", (req, res) => {
  let { id } = req.params;
  let updated = contacts.find((item) => item.id === Number(id));
  if (!updated) {
    res.status(400).send(`your file wont be process ${id}`);
  }
  res.send(updated);
});
// App is deleted
app.delete("/contacts/:id", (req, res) => {
  let { id } = req.params;
  let indexing = contacts.findIndex((item) => item.id === Number(id));
  contacts.splice(indexing, 1);
  updating({ ...db, contacts });
  res.send(contacts);
});
// App to post;

app.post("/contacts", (req, res) => {
  contacts = [...contacts, { ...req.body, id: contacts.length + 1 }];
  updating({ ...db, contacts });
  res.send(contacts);
});

app.patch("/contacts/:id", (req, res) => {
  let { id } = req.params;
  contacts = contacts.map((item) => {
    if (item.id === Number(id)) {
      return {
        ...id,
        ...req.body,
      };
    } else {
      return item;
    }
  });
  updating({ ...db, contacts });
  res.send(contacts);
});
// App is statrted;
app.listen(8030, () => {
  console.log("server is started at port localhost://8030");
});
