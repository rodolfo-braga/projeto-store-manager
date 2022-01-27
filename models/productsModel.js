const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [result] = await connection.execute(query, [name, quantity]);

  return { id: result.insertId, name, quantity };
};

const getProductByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [product] = await connection.execute(query, [name]);

  return product;
};

module.exports = {
  createProduct,
  getProductByName,
};
