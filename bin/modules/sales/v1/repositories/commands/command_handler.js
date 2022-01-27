const Sale = require('./domain');

const addSale = async (payload) => {
  const sale = new Sale();
  const postCommand = async payload => sale.addSale(payload);
  return postCommand(payload);
};

const deleteSale = async (payload) => {
  const sale = new Sale();
  const postCommand = async payload => sale.deleteSale(payload);
  return postCommand(payload);
};

const updateSale = async (payload) => {
  const sale = new Sale();
  const postCommand = async payload => sale.updateSale(payload);
  return postCommand(payload);
};

const addStock = async (payload) => {
  const sale = new Sale();
  const postCommand = async payload => sale.addStock(payload);
  return postCommand(payload);
};

module.exports = {
  addSale,
  deleteSale,
  updateSale,
  addStock
};
