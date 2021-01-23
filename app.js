const express = require("express");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
