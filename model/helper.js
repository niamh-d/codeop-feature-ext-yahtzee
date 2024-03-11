require("dotenv").config();
const mysql = require("mysql");

module.exports = async function db(query, values = []) {
  const results = {
    data: [],
    error: null,
  };

  let promise = await new Promise((resolve, reject) => {
    const DB_HOST = process.env.DB_HOST;
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    const DB_NAME = process.env.DB_NAME;

    const con = mysql.createConnection({
      host: DB_HOST || "127.0.0.1",
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME || "dice",
      multipleStatements: true,
    });

    con.connect(function (err) {
      if (err) {
        results.error = err;
        console.log("Error connecting to database:", err);
        reject(err);
        return;
      }

      console.log("Connected to database!");

      con.query(query, values, function (err, result) {
        if (err) {
          results.error = err;
          console.log("Error executing query:", err);
          reject(err);
          con.end();
          return;
        }

        if (!result.length) {
          if (result.affectedRows === 0) {
            results.error = "Action not complete";
            console.log("Action not complete:", err);
            reject(err);
            con.end();
            return;
          }
        } else if (result[0].constructor.name == "RowDataPacket") {
          result.forEach((row) => results.data.push(row));
        } else if (result[0].constructor.name == "OkPacket") {
          results.data.push(result[0]);
        }

        console.log("Query executed successfully:", result);
        con.end();
        resolve(results);
      });
    });
  });

  return promise;
};
