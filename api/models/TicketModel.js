var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
  id_pago: String,
  qr: String,
  items: Array,
  status: String,
  info_pago: Object,
  // user: { type: Schema.Types.ObjectId, ref: "User" },
  // function: { type: Schema.Types.ObjectId, ref: "Function" },
  seats: Array,
});

module.exports = mongoose.model("Ticket", TicketSchema);
