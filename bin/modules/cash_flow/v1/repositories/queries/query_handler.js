const CashFlow = require('./domain');

const getBalance = async () => {
  const balance = new CashFlow();
  const postCommand = async () => balance.getBalance();
  return postCommand();
};

const getCashByDate = async () => {
  const balance = new CashFlow();
  const postCommand = async () => balance.getCashByDate();
  return postCommand();
};

module.exports = {
  getBalance,
  getCashByDate
};
