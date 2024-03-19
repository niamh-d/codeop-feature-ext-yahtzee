var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var router = express.Router();

const supersecret = process.env.SUPERSECRET;

const db = require("../model/helper");

const BCRYPT_WORK_FACTOR = 12;

router.post("/", async function (req, res, next) {
  try {
    const authHeading = req.headers.authorization;

    if (authHeading) {
      const token = authHeading.substring(7);
      console.log(token);
      const decoded = jwt.verify(token, supersecret);
      const id = decoded.userId;

      const results = await db(
        `SELECT id, firstname, username FROM users WHERE id = ${id};`
      );

      res.send(results.data[0]);
    } else {
      const { firstName, lastName, email, username, password } = req.body;

      const hashedPW = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

      await db(`INSERT INTO users(firstName, lastName, email, username , password)
    VALUES ('${firstName}', '${lastName}', '${email}', '${username}', '${hashedPW}');`);

      const results = await db(
        `SELECT id, firstname, username FROM users ORDER BY id DESC LIMIT 1;`
      );

      res.send(results.data[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
