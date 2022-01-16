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

const updateUser = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.updateUser(payload);
  return postCommand(payload);
};

const loginUser = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.loginUser(payload);
  return postCommand(payload);
};

const listUser = async (payload) => {
  const user = new User();
  const postCommand = async payload => user.listUser(payload);
  return postCommand(payload);
};

module.exports = {
  authenticate,
  addUser,
  updateUser,
  loginUser,
  listUser
};
