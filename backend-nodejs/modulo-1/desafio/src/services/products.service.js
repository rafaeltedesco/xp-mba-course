const { orderCalculator, orderFilter } = require('../helpers');
const { ordersRepository } = require('../repository');

const getTotalPriceByOrderedProduct = async (product) => {
  const deliveredOrders = await orderFilter.getDeliveredItemsBy(
    'produto',
    product,
  );
  return orderCalculator.getTotalPrice(deliveredOrders);
};

/* Crie um endpoint para retornar os produtos mais vendidos e a quantidade
de vezes em que estes foram pedidos. O endpoint não deve receber
parâmetros. O endpoint deve calcular os produtos que mais possuem
pedidos e retorná-los em ordem decrescente, seguidos pela sua quantidade.
exemplo: [“Pizza A - 30”, “Pizza B – 27”, “Pizza C – 25”, “Pizza D – 23”, “Pizza
E – 21”, “Pizza F – 19”, “Pizza G – 17”]. O endpoint deve considerar somente
os pedidos já entregues.
*/

const getTopSellingProducts = async () => {
  const orders = (await ordersRepository.getOrders()).pedidos;
  const deliveredOrders = orders.filter(({ entregue }) => entregue);
  const salesCounterByProduct = deliveredOrders.reduce((acc, order) => {
    if (order.produto in acc) {
      acc[order.produto] += 1;
      return acc;
    }
    return { ...acc, [order.produto]: 1 };
  }, {});
  const salesOrderedByTopSelling = Object.entries(salesCounterByProduct).sort(
    ([pizza1, qtdd1], [pizza2, qtdd2]) => {
      const orderResolution = qtdd2 - qtdd1 === 0 ? pizza1.localeCompare(pizza2) : qtdd2 - qtdd1;
      return orderResolution;
    },
  );
  return salesOrderedByTopSelling.map(([pizza, qtdd]) => `${pizza} - ${qtdd}`);
};

module.exports = {
  getTotalPriceByOrderedProduct,
  getTopSellingProducts,
};
