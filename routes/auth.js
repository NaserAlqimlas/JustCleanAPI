const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

/*
 * ideally this would be a full fledged login service but to save time i've hard coded a lot of the logic.
 */
router.post("/login", (req, res) => {
  //Mock user -- to get access to create, update, delete
  const user = {
    id: 1,
    username: "admin",
    email: "admin@justclean.com"
  };

  jwt.sign({ user }, "supersecretkey", (err, token) => {
    res.json({
      token
    });
  });
});

module.exports = router;
