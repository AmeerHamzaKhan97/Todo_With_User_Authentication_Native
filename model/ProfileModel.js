const mongoose = require("./connectionObject");

const profileSchema = new mongoose.Schema({
  profile_picture_path: { type: String, required: true },
  user_id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },

  created_at: { type: Date, default: Date.now },
});

const profileModel = new mongoose.model("Profile", profileSchema);

module.exports = profileModel;
