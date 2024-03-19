var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var router = express.Router();

const db = require("../model/helper");

router.post("/", async (req, res) => {
  const { email, username, password } = req.body;

  console.log(req.body);

  const identifierStr = email
    ? `email = '${email}'`
    : `username = '${username}'`;

  try {
    const results = await db(`SELECT * FROM users WHERE ${identifierStr};`);
    const user = results.data[0];

    console.log(user);

    if (user) {
      const id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      const token = jwt.sign({ id }, "shhhhuhhhh");

      const userDetails = {
        firstName: user.firstname,
        id,
      };

      res.send({ token, userDetails });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
