const wrapper = require('../../../../../helpers/utils/wrapper');
const bcrypt = require('bcrypt');
const query = require('../queries/query');
const command = require('./command');
const jwtAuth = require('../../../../../auth/jwt_auth_helper');
const { expiredToken } = require('../../utils/constants');

class User {
  async authenticate (payload) {
    let findUser = await query.findUser(payload);
    if (findUser.err) {
      return wrapper.error('err', findUser.message, findUser.code);
    } else if (findUser.data.length === 0) {
      return wrapper.data('', 'User Not Found', 404);
    }
    findUser = findUser.data.map(v => Object.assign({}, v));

    const validPassword = await bcrypt.compare(payload.password, findUser[0].password);
    if (validPassword) {
      const dataResponse = {
        username: findUser[0].username,
        role: findUser[0].role,
        sub: findUser[0].username
      };
      const accessToken = await jwtAuth.generateToken(dataResponse, expiredToken.accessToken);
      dataResponse.accessToken = accessToken;
      return wrapper.data(dataResponse, 'Valid password', 200);
    }
    return wrapper.data('', 'Invalid Password', 400);
  }

  async addUser (payload) {
    const insertOneUser = await command.insertOneUser(payload);
    if (insertOneUser.err) {
      return wrapper.error('err', insertOneUser.message, insertOneUser.code);
    }
    return wrapper.data('', 'User Created', 201);
  }

  async loginUser (payload) {
    let loginUser = await query.loginUser(payload);
    if (loginUser.err) {
      return wrapper.error('err', loginUser.message, loginUser.code);
    } else if (loginUser.data.length === 0) {
      return wrapper.data('', 'User Not Found', 404);
    }
    loginUser = loginUser.data.map(v => Object.assign({}, v));

    const validPassword = await bcrypt.compare(payload.password, loginUser[0].password);
    if (validPassword) {
      const dataResponse = {
        username: loginUser[0].username,
        password: loginUser[0].password,
        // role: loginUser[0].role,
        sub: loginUser[0].username
      };
      const accessToken = await jwtAuth.generateToken(dataResponse, expiredToken.accessToken);
      dataResponse.accessToken = accessToken;
      return wrapper.data(dataResponse, 'Valid password', 200);
    }
    return wrapper.data('', 'Invalid Password', 400);
  }

  async updateUser (payload) {
    const updateUser = await command.updateUser(payload);
    if (updateUser.err) {
      return wrapper.error('err', updateUser.message, updateUser.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }
}

module.exports = User;
