const http = require("http");
const fs = require("fs");

let take = fs.readFileSync("./one.html", { encoding: "utf-8" });
let make = fs.readFileSync("./db.json", { encoding: "utf-8" });
let bell = JSON.parse(make);
let broone = (filename, pathing) => {
  fs.writeFileSync(filename, pathing);
};
let brotwo = (filename, pathing) => [fs.writeFileSync(filename, pathing)];
let servers = http.createServer((req, res) => {
  res.write(take);
  if (req.url === "/") {
    if (req.url === "GET") {
      return res.end(JSON.stringify(bell));
    }
  } else if (req.url.startsWith === "/products") {
    if (req.method === "GET") {
      return res.end(JSON.stringify(bell.products));
    } else if (req.method === "DELETE") {
      let id = req.url.replace("/products/", "");
      let updated = bell.products.filter((item) => item.id !== id);
      broone("./db.json", updated);
      return res.end(JSON.stringify(updated));
    }
  } else if (req.url.startsWith === "/movies") {
    if (req.method === "GET") {
      return res.end(JSON.stringify(bell.movies));
    } else if (req.method === "DELETE") {
      let idone = req.url.replace("/movies/", "");
      let updae = bell.movies.filter((item) => item.idone !== idone);
      brotwo("./db.json", updae);
      return res.end(JSON.stringify(updae));
    }
  }

  res.end();
});
servers.listen(5000, () => {
  console.log("your server will be starting at 5000 port");
});
