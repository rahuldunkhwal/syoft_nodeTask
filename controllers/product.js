const pool = require('../database')

exports.postProduct =  async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).send("Access denied");
    const { title, description, inventory_count } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO products (title,description,inventory_count) VALUES ($1,$2,$3) RETURNING *",
        [title, description, inventory_count]
      );
      res
        .status(201)
        .send({ message: "Product created", product: result.rows[0] });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

exports.getProduct = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "manager")
    return res.status(403).send("Access denied");
  try {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.putProduct =async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "manager")
    return res.status(403).send("Access denied");
  const { id } = req.params;
  const { title, description, inventory_count } = req.body;
  try {
    const result = await pool.query(
      "UPDATE products SET title=$1, description=$2, inventory_count=$3 WHERE id=$4 RETURNING *",
      [title, description, inventory_count, id]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Product not found");
    res
      .status(200)
      .send({ message: "Product updated", product: result.rows[0] });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete Product

exports.deleteProduct =  async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).send("Access denied");
  
    const { id } = req.params;
  
    try {
      const result = await pool.query("DELETE FROM products WHERE id=$1 RETURNING *", [id]);
      if (result.rowCount === 0) return res.status(404).send("Product not found");
      
      res.status(200).send({ message: "Product deleted", product: result.rows[0] });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };