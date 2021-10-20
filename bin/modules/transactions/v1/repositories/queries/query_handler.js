const Transaction = require('./domain');

const listHistory = async (payload) => {
  const transaction = new Transaction();
  const postCommand = async payload => transaction.listHistory(payload);
  return postCommand(payload);
};

module.exports = {
  listHistory
};
