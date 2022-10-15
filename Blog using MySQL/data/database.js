const mysql = require("mysql2/promise");

// create pool to manage lots of request
const pool = mysql.createPool({
    host: "localhost",
    database: "blog",
    user: "root",
    password: "Irfan1997"
});

module.exports = pool;