require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const productsRouter = require('./productsRouter');
const salesRouter = require('./salesRouter');

const errorMiddleware = require('./middlewares/error');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
