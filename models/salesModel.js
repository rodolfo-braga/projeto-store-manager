const connection = require('./connection');

const registerSale = async (sale) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (CURRENT_DATE())',
  );
  
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?';
  
  const values = sale.map((product) => [result.insertId, product.product_id, product.quantity]);

  await connection.query(query, [values]);

  return { 
    id: result.insertId,
    itemsSold: sale,
  };
};

module.exports = {
  registerSale,
};
