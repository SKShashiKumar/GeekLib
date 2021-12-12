const mongoose = require("mongoose");

const GeekSchema = new mongoose.Schema({
  sn: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genere: {
    type: String,
    required: true,
  },
  edition: {
    type: String,
    required: true,
  },
});

const Geek = mongoose.model("Geek", GeekSchema);

module.exports = Geek;
