const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productsService');

const productMock = {
  id: 1,
  name: "produto_1",
  quantity: 10,
};

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
  })
});

/*
Referências para testar a chamada da função next:
https://stackoverflow.com/questions/41636201/correct-way-to-unit-test-express-middleware
https://sinonjs.org/releases/latest/spies/
*/
