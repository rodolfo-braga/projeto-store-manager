const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

const productMock = {
  id: 1,
  name: "produto_1",
  quantity: 10,
};

const saleMock = [
  {
    product_id: 1,
    quantity: 10,
  }
];

const saleRegisteredMock = {
  "id": 1,
  "itemsSold": [
    {
      "product_id": 1,
      "quantity": 10,
    }
  ]
};

describe('Testando a manipulação de produtos (services/productsService)', () => {
  describe('Ao cadastrar um produto (productsService.createProduct)', () => {
    describe('Se o produto já estiver cadastrado', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductByName').resolves([{}]);
      });

      after(() => {
        productsModel.getProductByName.restore();
      });

      it('retorna um objeto com a chave "error"', async () => {
        const result = await productsService.createProduct();
        expect(result).to.have.key('error');
      });

      it('o valor dessa chave é um objeto com as propriedades "code" e "message"', async () => {
        const result = await productsService.createProduct();
        expect(result.error).to.have.all.keys(['code', 'message']);
      });

      it('o valor da chave "code" é "conflict"', async () => {
        const result = await productsService.createProduct();
        expect(result.error.code).to.equal('conflict');
      });

      it('o valor da chave "message" é "Product already exists"', async () => {
        const result = await productsService.createProduct();
        expect(result.error.message).to.equal('Product already exists');
      });
    });

    describe('Se o produto não estiver cadastrado', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductByName').resolves([]);
        sinon.stub(productsModel, 'createProduct').resolves(productMock);
      });

      after(() => {
        productsModel.getProductByName.restore();
        productsModel.createProduct.restore();
      });

      it('retorna um objeto', async () => {
        const result = await productsService.createProduct();
        expect(result).to.be.an('object');
      });

      it('o objeto possui as propriedades "id", "name" e "quantity"', async () => {
        const result = await productsService.createProduct();
        expect(result).to.have.all.keys(['id', 'name', 'quantity']);
      });
    });
  });

  describe('Ao buscar todos os produtos (productsService.getProducts)', () => {
    describe('Se não existir nenhum produto cadastrado', () => {
      before(() => {
        sinon.stub(productsModel, 'getProducts').resolves([]);
      });

      after(() => {
        productsModel.getProducts.restore();
      });

      it('retorna um array', async () => {
        const result = await productsService.getProducts();
        expect(result).to.be.an('array');
      });

      it('o array está vazio', async () => {
        const result = await productsService.getProducts();
        expect(result).to.be.empty;
      });
    });

    describe('Se existir pelo menos um produto cadastrado', () => {
      before(() => {
        sinon.stub(productsModel, 'getProducts').resolves([productMock]);
      });

      after(() => {
        productsModel.getProducts.restore();
      });

      it('retorna um array', async () => {
        const result = await productsService.getProducts();
        expect(result).to.be.an('array');
      });

      it('o array não está vazio', async () => {
        const result = await productsService.getProducts();
        expect(result).not.to.be.empty;
      });

      it('o array possui itens do tipo "objeto"', async () => {
        const [ item ] = await productsService.getProducts();
        expect(item).to.be.an('object');
      });

      it('os itens possuem as propriedades "id", "name" e "quantity"', async () => {
        const [ item ] = await productsService.getProducts();
        expect(item).to.have.all.keys(['id', 'name', 'quantity']);
      });
    });
  });

  describe('Ao buscar um produto pelo "id" (productsService.getProductById)', () => {
    describe('Se o produto não estiver cadastrado', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductById').resolves([]);
      });

      after(() => {
        productsModel.getProductById.restore();
      });

      it('retorna um objeto com a chave "error"', async () => {
        const result = await productsService.getProductById();
        expect(result).to.have.key('error');
      });

      it('o valor dessa chave é um objeto com as propriedades "code" e "message"', async () => {
        const result = await productsService.getProductById();
        expect(result.error).to.have.all.keys(['code', 'message']);
      });

      it('o valor da chave "code" é "notFound"', async () => {
        const result = await productsService.getProductById();
        expect(result.error.code).to.equal('notFound');
      });

      it('o valor da chave "message" é "Product not found"', async () => {
        const result = await productsService.getProductById();
        expect(result.error.message).to.equal('Product not found');
      });
    });

    describe('Se o produto estiver cadastrado', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductById').resolves([productMock]);
      });

      after(() => {
        productsModel.getProductById.restore();
      });

      it('retorna um objeto', async () => {
        const result = await productsService.getProductById();
        expect(result).to.be.an('object');
      });

      it('o objeto possui as propriedades "id", "name" e "quantity"', async () => {
        const result = await productsService.getProductById();
        expect(result).to.have.all.keys(['id', 'name', 'quantity']);
      });
    });
  });
});

describe('Testando a manipulação de vendas (services/salesService)', () => {
  describe('Ao cadastrar uma venda (salesService.registerSale)', () => {
    describe('Se algum produto contido na venda não estiver cadastrado', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductById').resolves([]);
      });

      after(() => {
        productsModel.getProductById.restore();
      });

      it('retorna um objeto com a chave "error"', async () => {
        const result = await salesService.registerSale(saleMock);
        expect(result).to.have.key('error');
      });

      it('o valor dessa chave é um objeto com as propriedades "code" e "message"', async () => {
        const result = await salesService.registerSale(saleMock);
        expect(result.error).to.have.all.keys(['code', 'message']);
      });

      it('o valor da chave "code" é "notFound"', async () => {
        const result = await salesService.registerSale(saleMock);
        expect(result.error.code).to.equal('notFound');
      });

      it('o valor da chave "message" é "Product not found"', async () => {
        const result = await salesService.registerSale(saleMock);
        expect(result.error.message).to.equal('Product not found');
      });
    });

    describe('Se a venda for cadastrada corretamente', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductById').resolves([productMock]);
        sinon.stub(salesModel, 'registerSale').resolves(saleRegisteredMock);
      });

      after(() => {
        productsModel.getProductById.restore();
        salesModel.registerSale.restore();
      });

      it('retorna um objeto', async () => {
        const result = await salesService.registerSale(saleMock);
        expect(result).to.be.an('object');
      });

      it('o objeto possui as propriedades "id" e "itemsSold"', async () => {
        const result = await salesService.registerSale(saleMock);
        expect(result).to.have.all.keys(['id', 'itemsSold']);
      });
    });
  });
});
