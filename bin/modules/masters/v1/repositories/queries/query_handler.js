const Master = require('./domain');

const listMaster = async (payload) => {
  const master = new Master();
  const postCommand = async payload => master.listMaster(payload);
  return postCommand(payload);
};

module.exports = {
  listMaster
};
