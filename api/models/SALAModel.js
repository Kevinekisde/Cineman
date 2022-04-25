var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SALASchema = new Schema({
  name: String,
  seats: [],
});

module.exports = mongoose.model("SALA", SALASchema);
