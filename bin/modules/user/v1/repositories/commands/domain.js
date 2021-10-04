const wrapper = require('../../../../../helpers/utils/wrapper');
const bcrypt = require('bcrypt');
const queryHandler = require('../queries/query');
const jwtAuth = require('../../../../../auth/jwt_auth_helper');
const { expiredToken } = require('../../utils/constants');
class User {
  async authenticate (payload) {
    let findUser = await queryHandler.findUser(payload);
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
}

module.exports = User;
