const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Database
const db = require("./config/database");

// test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: ", err));

const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("INDEX"));

// Tower routes
app.use("/towers", require("./routes/towers"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
