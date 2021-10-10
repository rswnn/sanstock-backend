const Supplier = require('./domain');

const listSupplier = async (payload) => {
  const supplier = new Supplier();
  const postCommand = async payload => supplier.listSupplier(payload);
  return postCommand(payload);
};

module.exports = {
  listSupplier
};
