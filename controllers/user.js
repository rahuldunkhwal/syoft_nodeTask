const bcrypt = require('bcryptjs')

const pool = require("../database")
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


exports.postRegister = async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await pool.query(
        "INSERT INTO users(username,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
        [username, email, hashedPassword, role]
      );
      res.status(201).send({ message: "User Created", user: result.rows[0] });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };


exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rows === 0) return res.status(400).send("User not found");
      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).send("Password not match");
  
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "10d",
      });
      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };  