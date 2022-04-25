var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PeliculasSchema = new Schema({
  name: String,
  id: Number,
  sinopsis: String,
  rating: String,
  image: String,
  date: String,
  comments: Array,
  genres: Array,
  cat: String,
  dub: Boolean,
  comingsoon: Boolean,
  duration: Number,
});

module.exports = mongoose.model("Pelicula", PeliculasSchema);
