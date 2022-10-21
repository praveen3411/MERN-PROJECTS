const express = require("express");
const multer = require("multer");
const contactsroutes = require(`${__dirname}/../routers/contacts.js`);
const productroutes = require(`${__dirname}/../routers/products.js`);
const userroutes = require(`${__dirname}/../routers/users.js`);
const logger = require(`${__dirname}/../middleware/logger.js`);
let app = express();
app.use(express.json());
app.use(logger);
app.use("/contacts", contactsroutes);
app.use("/products", productroutes);
app.use("/users", userroutes);

// Fils uploading
let storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, `${__dirname}/../uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
let upload = multer({ storage: storage });
app.post("/files", upload.single("avatar"), (req, res) => {
  res.send("Images Send successfully");
});
// End files uploading
app.listen(8030, () => {
  console.log(`Server is running on port number localhost://8030`);
});
