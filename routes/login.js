var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var router = express.Router();

const supersecret = process.env.SUPERSECRET;

const db = require("../model/helper");

router.post("/", async (req, res) => {
  const { email, username, password } = req.body;

  const identifierStr = email
    ? `email = '${email}'`
    : `username = '${username}'`;

  try {
    const results = await db(`SELECT * FROM users WHERE ${identifierStr};`);
    const user = results.data[0];

    if (user) {
      const id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      const token = jwt.sign({ userId: id }, supersecret);

      res.send({
        token,
        user: {
          id: user.id,
          firstName: user.firstname,
          email: user.email,
          username: user.username,
        },
      });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
