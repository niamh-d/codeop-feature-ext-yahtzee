var express = require("express");
const bcrypt = require("bcrypt");

var router = express.Router();

const db = require("../model/helper");

const BCRYPT_WORK_FACTOR = 12;

router.post("/", async function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPW = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    await db(`INSERT INTO users(firstName, lastName, email, password)
    VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPW}');`);

    const results = await db(`SELECT * FROM users ORDER BY id DESC LIMIT 1;`);

    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
