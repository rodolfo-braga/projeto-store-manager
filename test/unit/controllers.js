const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productsService');

const salesController = require('../../controllers/salesController');
const salesService = require('../../services/salesService');

const productMock = {
  id: 1,
  name: "produto_1",
  quantity: 10,
};
const emptyArray = [];
const arrayOfProducts = [productMock];
const saleMock = {
  "id": 1,
  "itemsSold": [
    {
      "product_id": 1,
      "quantity": 3
    }
  ]
}

describe('Testando a manipulação de produtos (controllers/productsController)', () => {
  describe('Ao cadastrar um produto (productsController.createProduct)', () => {
    describe('Se o payload informado não é válido', () => {
      const request = { body: {} };
      const response = {};
      const nextSpy = sinon.spy();

      it('é chamada a função next', async () => {
        await productsController.createProduct(request, response, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      });
    });

    describe('Se o payload informado é válido', () => {
      const request = {};
      const response = {};

      before(() => {
        request.body = {
          name: "produto_1",
          quantity: 10,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'createProduct').resolves(productMock);
      });

      after(() => {
        productsService.createProduct.restore();
      });

      it('é chamado o status() com o código 201', async () => {
        await productsController.createProduct(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });

      it('é chamado o json() com o produto criado', async () => {
        await productsController.createProduct(request, response);
        expect(response.json.calledWith(productMock)).to.be.true;
      });
    });
  });

  describe('Ao buscar um produto pelo "id" (productsController.getProductById)', () => {
    describe('Se o produto não estiver cadastrado', () => {
      const request = {};
      const response = {};
      const nextSpy = sinon.spy();

      before(() => {
        request.params = { id: 1 };

        sinon.stub(productsService, 'getProductById').resolves({ error: true });
      });

      after(() => {
        productsService.getProductById.restore();
      });

      it('é chamada a função next', async () => {
        await productsController.getProductById(request, response, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      });
    });

    describe('Se o produto estiver cadastrado', () => {
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 1 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getProductById').resolves(productMock);
      });

      after(() => {
        productsService.getProductById.restore();
      });

      it('é chamado o status() com o código 200', async () => {
        await productsController.getProductById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('é chamado o json() com o produto buscado', async () => {
        await productsController.getProductById(request, response);
        expect(response.json.calledWith(productMock)).to.be.true;
      });
    });
  });

  describe('Ao buscar todos os produtos (productsController.getProducts)', () => {
    describe('Se não existir nenhum produto cadastrado', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getProducts').resolves(emptyArray);
      });

      after(() => {
        productsService.getProducts.restore();
      });

      it('é chamado o status() com o código 200', async () => {
        await productsController.getProducts(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('é chamado o json() com um array vazio', async () => {
        await productsController.getProducts(request, response);
        expect(response.json.calledWith(emptyArray)).to.be.true;
      });
    });

    describe('Se existir pelo menos um produto cadastrado', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getProducts').resolves(arrayOfProducts);
      });

      after(() => {
        productsService.getProducts.restore();
      });

      it('é chamado o status() com o código 200', async () => {
        await productsController.getProducts(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });

      it('é chamado o json() com um array de produtos', async () => {
        await productsController.getProducts(request, response);
        expect(response.json.calledWith(arrayOfProducts)).to.be.true;
      });
    });
  });
});

describe('Testando a manipulação de vendas (controllers/calesController)', () => {
  describe('Ao cadastrar uma venda (salesController.registerSale)', () => {
    describe('Se o payload informado não é válido', () => {
      const request = { body: [{}] };
      const response = {};
      const nextSpy = sinon.spy();

      it('é chamada a função next', async () => {
        await salesController.registerSale(request, response, nextSpy);
        expect(nextSpy.calledOnce).to.be.true;
      });
    });

    describe('Se o payload informado é válido', () => {
      const request = {};
      const response = {};

      before(() => {
        request.body = [{ product_id: 1, quantity: 10 }];
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesService, 'registerSale').resolves(saleMock);
      });

      after(() => {
        salesService.registerSale.restore();
      });

      it('é chamado o status() com o código 201', async () => {
        await salesController.registerSale(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });

      it('é chamado o json() com a venda cadastrada', async () => {
        await salesController.registerSale(request, response);
        expect(response.json.calledWith(saleMock)).to.be.true;
      });
    });
  });
});

/*
Referências para testar a chamada da função next:
https://stackoverflow.com/questions/41636201/correct-way-to-unit-test-express-middleware
https://sinonjs.org/releases/latest/spies/
*/
