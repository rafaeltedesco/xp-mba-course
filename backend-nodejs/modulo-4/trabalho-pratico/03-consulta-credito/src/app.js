const express = require('express');

const app = express();

const { check, validationResult } = require('express-validator');

const consultaCliente = require('./consulta-cliente');
const consultaProduto = require('./consulta.produto');

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!');
});

app.post(
  '/consulta-credito',

  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
  check('parcelas', 'O número de parcelas deve ser um número inteiro').notEmpty().isInt(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas,
      );
      return res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  },
);

app.get('/cliente', async (req, res) => {
  const clientes = await consultaCliente.listarTodos();
  res.status(200).json(clientes);
});

app.get('/produto', async (req, res) => {
  const produtos = await consultaProduto.consultarProdutos();
  return res.status(200).json(produtos);
});

const productValidations = [check('codigo', 'codigo deve ser informado').notEmpty(),
  check('codigo', 'codigo deve ser uma string').isString(),
  check('descricao', 'descricao deve ser informada').notEmpty(),
  check('descricao', 'descricao deve ser uma string').isString(),
  check('preco', 'preco deve ser informado').notEmpty(),
  check('preco', 'preco deve ser um número').isFloat()];

app.post(
  '/produto',
  ...productValidations,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        erro: errors.array(),
      });
    }
    const { codigo, descricao, preco } = req.body;
    try {
      const result = await consultaProduto
        .incluirProduto({ codigo, descricao, preco });
      return res.status(result.statusCode).json(result.data);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
);

app.put(
  '/produto/:codigo',
  ...productValidations.slice(2),
  async (req, res) => {
    const {
      params: { codigo },
      body: { descricao, preco },
    } = req;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const result = await consultaProduto
      .atualizarProduto(codigo, { descricao, preco });
    return res.status(result.statusCode).json(result.data);
  },
);

app.delete('/produto/:codigo', async (req, res) => {
  const { params: { codigo } } = req;
  const result = await consultaProduto.deletaProduto(codigo);
  return res.status(result.statusCode).json(result.data);
});

module.exports = app;
