# Store Manager

Projeto desenvolvido durante o módulo de Backend do curso de Desenvolvimento Web
da Trybe.
Trata-se de uma API de gerenciamento de vendas, onde é possível criar, visualizar, deletar e atualizar produtos e vendas.

---

## Tecnologias utilizadas

A API foi desenvolvida em NodeJs com o framework Express, banco de dados MySQL, e as bibliotecas: Joi para as validações, express-rescue para lidar com os erros e Mocha para os testes unitários.

---

## Para rodar a aplicação

1. Clone o repositório

2. Instale as dependências

- `npm install`

3. Crie e conecte-se à um banco

A estrutura do banco que precisa ser criado está presente no arquivo `StoreManager.sql` localizado na raiz do projeto.
**Renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

4. Execute a aplicação

- `npm start`


---

### Tabelas

O banco possui três tabelas: `products`, `sales` e `sales_products`.

A tabela `products` tem o seguinte formato:

![Tabela Produtos](./public/tableproducts.png)

A tabela `sales` tem o seguinte formato:

![Tabela Vendas](./public/tablesales.png)

A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato:

![Tabela Vendas-Produtos](./public/tablesalesproducts.png)

---

## Funcionameto

### 1 - Para cadastrar produtos

- Faça uma requisição do tipo POST para o endpoint (`/products`) com a seguinte estrutura:

```json
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

---

### 2 - Para listar os produtos

- Faça uma requisição do tipo GET para o endpoint (`/products`) ou (`/products/:id`);

- Através do caminho `/products`, todos os produtos são retornados;

- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL é retornado;

---

### 3 - Para atualizar um produto

- Faça uma requisição do tipo PUT para o endpoint (`/products/:id`) com a seguinte estrutura:

```json
{
  "name": "new_product_name",
  "quantity": "new_product_quantity"
}
```

---

### 4 - Para deletar um produto

- Faça uma requisição do tipo DELETE para o endpoint (`/products/:id`) com o `id` do produto a ser deletado;

---

### 5 - Para cadastrar vendas

- Faã uma requisição do tipo POST para o endpoint (`/sales`) com a seguinte estrutura:

```json
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

---

### 6 - Para listar as vendas

- Faça uma requisição do tipo GET para o endpoint (`/sales`) ou (`/sales/:id`);

- Através do caminho `/sales`, todas as vendas são retornadas;

- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL é retornada;

---

### 7 - Para atualizar uma venda

- Faça uma requisição do tipo PUT para o endpoint (`/sales/:id`) com a seguinte estrutura:

```json
[
  {
    "product_id": "id_change",
    "quantity": "new_quantity"
  }
]
```

---

### 8 - Para deletar uma venda

- Faça uma requisição do tipo DELETE para o endpoint (`/sales/:id`) com o `id` da venda a ser deletada;
