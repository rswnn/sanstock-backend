const CashFlow = require('./domain');

const getBalance = async () => {
  const balance = new CashFlow();
  const postCommand = async () => balance.getBalance();
  return postCommand();
};

module.exports = {
  getBalance
};
