const express = require("express");
const jwt = require("jsonwebtoken");

// Database
const db = require("./config/database");

// test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: ", err));

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//following socket docs
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connect", (socket) => {
  console.log("a user connected");
});

app.use(express.json());

// Tower routes
app.use("/towers", require("./routes/towers"));
app.use("/offices", require("./routes/offices"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

http.listen(PORT, console.log(`Server started on port ${PORT}`));
