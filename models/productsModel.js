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

const getProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');

  return products;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);

  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  return connection.execute(query, [id]);
};

module.exports = {
  createProduct,
  getProductByName,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
