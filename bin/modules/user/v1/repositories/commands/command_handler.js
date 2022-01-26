const User = require('./domain');

const addUser = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.addUser(payload);
  return postCommand(payload);
};

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

const updateUser = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.updateUser(payload);
  return postCommand(payload);
};

const deleteUser = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.deleteUser(payload);
  return postCommand(payload);
};

module.exports = {
  authenticate,
  register,
  updateUser,
  deleteUser
};
