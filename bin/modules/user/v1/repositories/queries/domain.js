const query = require('./query');
const wrapper = require('../../../../../helpers/utils/wrapper');

class User {
  async getUsers (payload) {
    let getUsers = await query.getUsers();
    if (getUsers.err) {
      return wrapper.error('err', getUsers.message, getUsers.code);
    } else if (getUsers.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    getUsers = getUsers.data.map(v => Object.assign({}, v));
    return wrapper.data(getUsers, 'Success', 200);
  }
}

module.exports = User;
