const Product = require('./domain');

const addProduct = async (payload) => {
  const product = new Product();
  const postCommand = async payload => product.addProduct(payload);
  return postCommand(payload);
};

const deleteProduct = async (payload) => {
  const product = new Product();
  const postCommand = async payload => product.deleteProduct(payload);
  return postCommand(payload);
};

const updateProduct = async (payload) => {
  const product = new Product();
  const postCommand = async payload => product.updateProduct(payload);
  return postCommand(payload);
};

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct
};
