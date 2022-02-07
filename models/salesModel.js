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

const getSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
      sa.id AS saleId, sa.date, sp.product_id, sp.quantity
    FROM
      StoreManager.sales AS sa
          INNER JOIN
      StoreManager.sales_products AS sp ON sa.id = sp.sale_id`,
  );

  return sales;
};

const getSaleById = async (id) => {
  const query = `
  SELECT
    sa.date, sp.product_id, sp.quantity
  FROM
    StoreManager.sales AS sa
        INNER JOIN
    StoreManager.sales_products AS sp ON sa.id = sp.sale_id
  WHERE id = ?`;

  const [sale] = await connection.execute(query, [id]);

  return sale;
};

const updateSale = async (saleId, saleInfo) => {
  const { product_id: productId, quantity: newQuantity } = saleInfo[0];
  const query = `
    UPDATE
      StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?`;

  await connection.execute(query, [productId, newQuantity, saleId]);

  return {
    saleId,
    itemUpdated: saleInfo,
  };
};

const deleteSale = async (id) => {
  const deletedSale = await getSaleById(id);

  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  
  await connection.execute(query, [id]);
  
  return deletedSale;
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};
