var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ProductoSchema = new Schema({
    id:Number,
    title: String,
    unit_price: Number,
    image: String,
    stock: {type:Number, default:50}
})


module.exports = mongoose.model("Producto", ProductoSchema);