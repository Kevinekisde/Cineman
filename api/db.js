const mongoose = require("mongoose");

module.exports = mongoose
  .connect(
    "mongodb+srv://cineman:cineman123@cluster0.ouxpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("database Conected"))
  .catch((err) => console.error(err));
