const Product = require('./domain');

const listProduct = async (payload) => {
  const product = new Product();
  const postCommand = async payload => product.listProduct(payload);
  return postCommand(payload);
};

module.exports = {
  listProduct
};
