const getTotalPrice = (orders) => orders.reduce(
  (acc, nextOrder) => ({
    valor: acc.valor + nextOrder.valor,
  }),
  { valor: 0 },
);

module.exports = {
  getTotalPrice,
};
