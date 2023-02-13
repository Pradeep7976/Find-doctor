const mongoose = require("mongoose");

const newDocSchema = mongoose.Schema({
  
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  specialization: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: String, required: true },
  rating: { type: String, required: true },
});
module.exports = mongoose.model("Docrecep", newDocSchema);
