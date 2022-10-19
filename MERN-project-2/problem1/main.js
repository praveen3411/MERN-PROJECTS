const http = require("http");
const fs = require("fs");

let reading = fs.readFileSync("./index.html", { encoding: "utf-8" });

let servers = http.createServer((req, res) => {
  res.write(reading);
  if (req.url === "/") {
    return res.end("<h1>HOME PAGE</h1>");
  }
  if (req.url === "/products") {
    return res.end("<h1>PRODCT-PAGE</h1>");
  }
  if (req.url === "/products/one") {
    return res.end("<h1>Products Inside page</h1>");
  }
  if (req.url === "/movies") {
    return res.end("<h1>This is movie page</h1>");
  }
  res.end();
});
servers.listen(4000, () => {
  console.log("Server is Stared at 4000");
});
