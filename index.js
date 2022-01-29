require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const errorMiddleware = require('./middlewares/error');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

app.use('/sales', salesController);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
