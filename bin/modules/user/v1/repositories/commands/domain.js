const wrapper = require('../../../../../helpers/utils/wrapper');
const bcrypt = require('bcrypt');
const query = require('../queries/query');
const jwtAuth = require('../../../../../auth/jwt_auth_helper');
const { expiredToken } = require('../../utils/constants');
const command = require('../../../../user/v1/repositories/commands/command');
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

  async register (payload) {
    const findUser = await query.findUser(payload);
    const { username, password, role } = payload;

    const user = {
      username,
      role
    };

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    const insertOneUser = await command.insertOneUser(user);
    user.id = insertOneUser.data.insertId;
    if (insertOneUser.err) {
      return wrapper.error('err', insertOneUser.message, findUser.code);
    }
    return wrapper.data(user, 'Success', 201);
  }

  async updateUser (payload) {
    const { id, username, password, role } = payload;

    const user = {
      id,
      username,
      role
    };

    if (password) {
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
    }
    const updateUser = await command.updateUser(user);
    if (updateUser.err) {
      return wrapper.error('err', updateUser.message, updateUser.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }

  async deleteUser (payload) {
    const deleteUser = await command.deleteUser(payload);
    if (deleteUser.err) {
      return wrapper.error('err', deleteUser.message, deleteUser.code);
    }
    return wrapper.data('', 'Success Delete', 201);
  }
}

module.exports = User;
