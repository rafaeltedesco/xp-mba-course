const db = require('./db');

const consultarProdutos = async () => db.produto.findAll();

const produtoExiste = async (codigo) => db.produto.findOne({ where: { codigo } });

const incluirProduto = async ({ codigo, descricao, preco }) => {
  if ((await produtoExiste(codigo))) {
    await db.produto
      .update({ descricao, preco }, { where: { codigo } });
    return { statusCode: 200, data: { codigo, descricao, preco } };
  }
  await db.produto
    .create({ codigo, descricao, preco });
  return { statusCode: 201, data: { codigo, descricao, preco } };
};

const atualizarProduto = async (codigo, { descricao, preco }) => {
  if (!(await produtoExiste(codigo))) {
    return { statusCode: 405, data: { error: 'produto com código não encontrado' } };
  }
  await db.produto
    .update({ descricao, preco }, { where: { codigo } });
  return { statusCode: 200, data: { codigo, descricao, preco } };
};

const deletaProduto = async (codigo) => {
  if (!(await produtoExiste(codigo))) {
    return { statusCode: 405, data: { error: 'produto com código não encontrado' } };
  }
  await db.produto.destroy({ where: { codigo } });
  return { statusCode: 200, data: { message: 'apagado com sucesso' } };
};

module.exports = {
  consultarProdutos,
  incluirProduto,
  atualizarProduto,
  deletaProduto,
};
