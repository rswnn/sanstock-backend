const Merchant = require('./domain');

const listMerchant = async (payload) => {
  const merchant = new Merchant();
  const postCommand = async payload => merchant.listMerchant(payload);
  return postCommand(payload);
};

module.exports = {
  listMerchant
};
