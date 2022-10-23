const mongoose = require("mongoose");
let connect = () => {
  return mongoose.connect(
    `mongodb+srv://praveenkumar:1praveen341@cluster0.tp82yj4.mongodb.net/userdetails`
  );
};

module.exports = connect;
