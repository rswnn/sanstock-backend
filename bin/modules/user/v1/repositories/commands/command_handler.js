const User = require('./domain');

const authenticate = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.authenticate(payload);
  return postCommand(payload);
};

module.exports = {
  authenticate
};
