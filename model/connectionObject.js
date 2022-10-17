const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// set up mongoose
mongoose
  .connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successful");
  })
  .catch(console.log);

module.exports = mongoose;
