const CashFlow = require('./domain');

const addCash = async (payload) => {
  const cash = new CashFlow();
  const postCommand = async payload => cash.addCash(payload);
  return postCommand(payload);
};

module.exports = {
  addCash
};
