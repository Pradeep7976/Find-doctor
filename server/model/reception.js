const mongoose = require("mongoose");

const newSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Recep", newSchema);
