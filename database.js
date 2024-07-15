const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
  password: "8952909977",
  host: "localhost",
  port: 5432,
  database: "productdb"
})

module.exports = pool;
