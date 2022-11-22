const mongoose = require("./connectionObject");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  userId: { type: String, required: true },

  received: { type: Boolean, required: true },

  read: { type: Boolean, required: true },

  created_at: { type: Date, default: Date.now },
});

const ticketModel = new mongoose.model("ticket", ticketSchema);

module.exports = ticketModel;
