const mongoose = require("./connectionObject");

const userLoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },

  created_at: { type: Date, default: Date.now },
});

const userLoginModel = new mongoose.model("User_Login", userLoginSchema);

module.exports = userLoginModel;
