var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FuntionSchema = new Schema({
  movie: { type: Schema.Types.ObjectId, ref: "Pelicula" },
  // movie: String,
  sala: { type: Schema.Types.ObjectId, ref: "SALA" },
  // sala: String, //que este sea nombre de la sala pa que salga en el ticket (p.e. Sala B)
  occupied_seats: Array,
  time: String,
  date: String,
});

module.exports = mongoose.model("Function", FuntionSchema);
