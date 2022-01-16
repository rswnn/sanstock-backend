const User = require('./domain');

const getUsers = async (payload) => {
    const user = new User();
    const postCommand = async payload => user.getUsers(payload);
    return postCommand(payload);
};
  
module.exports = {
    getUsers
};