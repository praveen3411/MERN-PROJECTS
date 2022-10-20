const express = require("express");
const fs = require("fs");
let app = express();
let dbfile = fs.readFileSync(`${__dirname}/../db.json`, { encoding: "utf-8" });
let updated = (updating) => {
  fs.writeFileSync(`${__dirname}/../db.json`, JSON.stringify(updating), {
    encoding: "utf-8",
  });
};
let db = JSON.parse(dbfile);
let contacts = db.todos;
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<center><h2>You have successfully created express node server</h2></center>"
  );
});

app.get("/contacts", (req, res) => {
  res.send(contacts);
});

// app.get //by parms

app.get("/contacts/:id", (req, res) => {
  let { id } = req.params;
  let takeit = contacts.find((item) => item.id === Number(id));
  if (!takeit) {
    res.status(400).send(`we cannot find with this ${id}`);
  }
  res.send(takeit);
});

// app.delete
app.delete("/contacts/:id", (req, res) => {
  let { id } = req.params;
  let makeit = contacts.findIndex((item) => item.id === Number(id));
  contacts.splice(makeit, 1);
  updated({ ...db, contacts });
  res.send(contacts);
});

// App.post

app.post("/contacts", (req, res) => {
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

// App.patch

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
  updated({ ...db, contacts });
  res.send(contacts);
});

app.listen(8030, () => {
  console.log("Server is running on localhost://8030");
});




