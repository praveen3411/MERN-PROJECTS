const express = require("express");
const fs = require("fs");
let dbfile = fs.readFileSync(`${__dirname}/../db.json`, { encoding: "utf-8" });
let db = JSON.parse(dbfile);
let todos = db.todos;
let boom = (updatedfiles) => {
  fs.writeFileSync(`${__dirname}/../db.json`, JSON.stringify(updatedfiles), {
    encoding: "utf-8",
  });
};
let app = express();
app.use(express.json());

// Get access to website
app.get("/", (req, res) => {
  res.send("WELCOME TO EXPRESS");
});

//GET whole products
app.get("/todos", (req, res) => {
  res.send(todos);
});

//GET Method
app.get("/todos/:id", (req, res) => {
  let { id } = req.params;
  let updated = todos.find((item) => item.id === Number(id));
  if (!updated) {
    res.status(400).send(`we cannot access ${id}`);
  }
  res.send(updated);
});

//Delete Method
app.delete("/todos/:id", (req, res) => {
  let { id } = req.params;
  let updated = todos.findIndex((item) => item.id === Number(id));
  todos.splice(updated, 1);
  boom({ ...db, todos });
  res.send(todos);
});

// POST-Methods
app.post("/todos", (req, res) => {
  todos = [...todos, { ...req.body, id: todos.length + 1 }];
  boom({ ...db, todos });
  res.send(todos);
});

// Patch Method
app.patch("/todos/:id", (req, res) => {
  let { id } = req.params;
  todos = todos.map((item) => {
    if (item.id === Number(id)) {
      return {
        ...id,
        ...req.body,
      };
    } else {
      return item;
    }
  });
  boom({ ...db, todos });
  res.send(todos);
});

app.listen(8030, () => {
  console.log("port is starting at localhost://8030 ");
});
