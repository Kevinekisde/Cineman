var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  //token: String,
  image: String,
  email:String,
  id: String,
  birthday: String,
  favoriteGenre: String,
  phone: String,
  subcription: String,
  commentary:[],
  history: [{ type: Schema.Types.ObjectId, ref: "Function " }],
});

module.exports = mongoose.model("User", UserSchema);
