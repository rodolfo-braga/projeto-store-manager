const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const connection = require('../../models/connection');

const salesModel = require('../../models/salesModel');

const saleMock = [
  {
    product_id: 1,
    quantity: 10,
  }
];

describe('Testando a manipulação de produtos (models/productsModel)', () => {
  describe('Ao cadastrar um produto (productsModel.createProduct)', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsModel.createProduct();
      expect(result).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
      const result = await productsModel.createProduct();
      expect(result).to.have.all.keys(["id", "name", "quantity"]);
    });
  });

  describe('Ao buscar um produto pelo nome (productsModel.getProductByName)', () => {
    describe('Se o produto não estiver cadastrado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const product = await productsModel.getProductByName();
        expect(product).to.be.an('array');
      });

      it('o array está vazio', async () => {
        const product = await productsModel.getProductByName();
        expect(product).to.be.empty;
      });
    });

    describe('Se o produto já estiver cadastrado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[
          {
            id: 1,
            name: 'produto_1',
            quantity: 10,
          }
        ]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const product = await productsModel.getProductByName();
        expect(product).to.be.an('array');
      });

      it('o array contém um objeto', async () => {
        const product = await productsModel.getProductByName();
        expect(product[0]).to.be.an('object');
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const product = await productsModel.getProductByName();
        expect(product[0]).to.have.all.keys(["id", "name", "quantity"]);
      });
    });
  })

  describe('Ao buscar todos os produtos (productsModel.getProducts)', () => {
    describe('Se não existir nenhum produto cadastrado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const products = await productsModel.getProducts();
        expect(products).to.be.an('array');
      });

      it('o array está vazio', async () => {
        const products = await productsModel.getProducts();
        expect(products).to.be.empty;
      });
    });

    describe('Se existir pelo menos um produto cadastrado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[
          {
            id: 1,
            name: 'produto_1',
            quantity: 10,
          }
        ]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const products = await productsModel.getProducts();
        expect(products).to.be.an('array');
      });

      it('o array não está vazio', async () => {
        const products = await productsModel.getProducts();
        expect(products).not.to.be.empty;
      });

      it('todos os itens do array são do tipo "objeto"', async () => {
        const products = await productsModel.getProducts();
        products.map((item) => {
          expect(item).to.be.an('object');
        });
      });

      it('os itens possuem as propriedades "id", "name", "quantity"', async () => {
        const products = await productsModel.getProducts();
        products.map((item) => {
          expect(item).to.have.all.keys(["id", "name", "quantity"]);
        })
      });
    });
  });
});

describe('Testando a manipulação de vendas (models/salesModel)', () => {
  describe('Ao cadastrar uma venda (salesModel.registerSale)', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      sinon.stub(connection, 'query').resolves();
    });

    after(() => {
      connection.execute.restore();
      connection.query.restore();
    });

    it('retorna um objeto', async () => {
      const result = await salesModel.registerSale(saleMock);
      expect(result).to.be.an('object');
    });

    it('o objeto possui as propriedades "id" e "itemsSold"', async () => {
      const result = await salesModel.registerSale(saleMock);
      expect(result).to.have.all.keys(["id", "itemsSold"]);
    });

    it('"itemsSold" é um array de itens', async () => {
      const result = await salesModel.registerSale(saleMock);
      expect(result.itemsSold).to.be.an('array');
    });

    it('os itens do array são do tipo objeto', async () => {
      const result = await salesModel.registerSale(saleMock);
      const [item] = result.itemsSold;
      expect(item).to.be.an('object');
    });

    it('os itens possuem as propriedades "product_id" e "quantity"', async () => {
      const result = await salesModel.registerSale(saleMock);
      const [item] = result.itemsSold;
      expect(item).to.have.all.keys(["product_id", "quantity"]);
    });
  });
});
