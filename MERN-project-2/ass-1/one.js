const http = require("http");
const fs = require("fs");
let take = fs.readFileSync("./one.html", { encoding: "utf-8" });
let make = fs.readFileSync("./db.json", { encoding: "utf-8" });
let bake = JSON.parse(make);
let firstone = (filename, updateddata) => {
  fs.writeFileSync(filename, updateddata);
};
let secondone = (filename, updateddata) => {
  fs.writeFileSync(filename, updateddata);
};
let server = http.createServer((req, res) => {
  res.write(take);
  console.log(req.method, req.url, bake);
  // if (req.url === "/") {
  //   return res.end("<h2>HOME_PAGE</h2>");
  // }
  // if (req.url === "/firstpage") {
  //   return res.end("<h2>This is First Page</h2>");
  // }
  // if (req.url === "/secondpage") {
  //   return res.end("<h2>This is Second Page</h2>");
  // }
  // if (req.url === "/thirdpage") {
  //   return res.end("<h2>This is the Third Page</h2>");
  // }
  // if (req.url === "/products") {
  //   res.getHeader("content-type", "application/json");
  //   res.write(JSON.stringify(bake.products));
  // }
  // if(req.url==='/movies'){
  //   return res.end(JSON.stringify(bake.movies))
  // }
  // res.write("You have created Server");
  // res.write(" you moved one step ahead");
  // res.write("<h2>This is the ui part</h2>");
  // res.end("!");
  if (req.url === "/") {
    if (req.method === "GET") {
      return res.end(JSON.stringify(bake));
    }
  } else if ((req.url.startsWith = "/products")) {
    if (req.method === "GET") {
      return res.end(JSON.stringify(bake.products));
    } else if (req.method === "DELETE") {
      let id = req.url.replace("/products/", "");
      let updated = bake.products.filter((item) => item.id !== id);
      firstone("./db.json", updated);
      return res.end(JSON.stringify(updated));
    }
  } else if (req.url.startsWith === "/movies") {
    if (req.method === "GET") {
      return res.end(JSON.stringify(bake.movies));
    } else if (req.method === "DELETE") {
      id = req.url.replace("/movies/", "");
      let rama = bake.movies.filter((item) => item.idone !== idone);
      secondone("./db.json", rama);
      return res.end(JSON.stringify(rama));
    }
  }
  res.end();
});

server.listen(8001, () => {
  console.log("you port is running successfully on 8001");
});
