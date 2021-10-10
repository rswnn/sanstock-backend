const Merchant = require('./domain');

const addMerchant = async (payload) => {
  const merchant = new Merchant();
  const postCommand = async payload => merchant.addMerchant(payload);
  return postCommand(payload);
};

const deleteMerchant = async (payload) => {
  const merchant = new Merchant();
  const postCommand = async payload => merchant.deleteMerchant(payload);
  return postCommand(payload);
};

const updateMerchant = async (payload) => {
  const merchant = new Merchant();
  const postCommand = async payload => merchant.updateMerchant(payload);
  return postCommand(payload);
};

module.exports = {
  addMerchant,
  deleteMerchant,
  updateMerchant
};
