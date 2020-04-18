const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);
const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const db = mongoose.connect(
  "mongodb://localhost:27017/bookAPI",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(`the error is ${err}`);
    }
  }
);

app.use("/api", bookRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
