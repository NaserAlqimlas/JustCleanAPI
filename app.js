const express = require("express");
const jwt = require("jsonwebtoken");

// Database
const db = require("./config/database");

// test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: ", err));

const app = express();

app.use(express.json());

// Tower routes
app.use("/towers", require("./routes/towers"));
app.use("/offices", require("./routes/offices"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
