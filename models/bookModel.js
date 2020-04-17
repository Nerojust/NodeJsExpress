const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    adult: { type: Boolean },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Book", bookModel);
