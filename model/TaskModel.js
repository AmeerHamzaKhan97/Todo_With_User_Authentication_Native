const mongoose = require("./connectionObject");
// const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },

  userId: { type: String, required: true },

  created_at: { type: Date, default: Date.now },
});

const taskModel = new mongoose.model("Task", taskSchema);

module.exports = taskModel;
