const mongoose = require("mongoose");
let connectd = () => {
  return mongoose.connect(`mongodb://127.0.0.1:27017/psc`);
};
module.exports = connectd;