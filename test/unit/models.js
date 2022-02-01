const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const connection = require('../../models/connection');

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
    })
  })
});
