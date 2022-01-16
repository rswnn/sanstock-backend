const User = require('./domain');

const authenticate = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.authenticate(payload);
  return postCommand(payload);
};

const register = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.register(payload);
  return postCommand(payload);
};

module.exports = {
  authenticate,
  register
};
