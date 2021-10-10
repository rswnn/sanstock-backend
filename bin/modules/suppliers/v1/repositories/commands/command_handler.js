const Supplier = require('./domain');

const addSupplier = async (payload) => {
  const supplier = new Supplier();
  const postCommand = async payload => supplier.addSupplier(payload);
  return postCommand(payload);
};

const deleteSupplier = async (payload) => {
  const supplier = new Supplier();
  const postCommand = async payload => supplier.deleteSupplier(payload);
  return postCommand(payload);
};

const updateSupplier = async (payload) => {
  const supplier = new Supplier();
  const postCommand = async payload => supplier.updateSupplier(payload);
  return postCommand(payload);
};

module.exports = {
  addSupplier,
  deleteSupplier,
  updateSupplier
};
