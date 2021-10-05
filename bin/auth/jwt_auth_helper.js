
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../infrastructure/configs/global_config');
const userQuery = require('../modules/user/v1/repositories/queries/query');
const wrapper = require('../helpers/utils/wrapper');
const { ERROR } = require('../helpers/http-error/custom_error');

const getKey = keyPath => fs.readFileSync(keyPath, 'utf8');

const generateToken = async (payload) => {
  const privateKey = getKey(config.get('/privateKey'));
  const verifyOptions = {
    algorithm: 'RS256',
    audience: '97b331dh93-4hil3ff-4e83358-9848124-b3aAsd9b9f72c34',
    issuer: 'sanstock',
    expiresIn: '7d'
  };
  const token = jwt.sign(payload, privateKey, verifyOptions);
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    data: null
  };
  const publicKey = fs.readFileSync(config.get('/publicKey'), 'utf8');
  const verifyOptions = {
    algorithm: 'RS256',
    audience: '97b331dh93-4hil3ff-4e83358-9848124-b3aAsd9b9f72c34',
    issuer: 'sanstock'
  };

  const token = getToken(req.headers);
  if (!token) {
    return wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.FORBIDDEN);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, publicKey, verifyOptions);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return wrapper.response(res, 'fail', result, 'Access token expired!', ERROR.UNAUTHORIZED);
    }
    return wrapper.response(res, 'fail', result, 'Token is not valid!', ERROR.UNAUTHORIZED);
  }
  const username = decodedToken.sub;
  const findUser = await userQuery.findUser({username});
  if (findUser.err) {
    return wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.FORBIDDEN);
  } else if (findUser.data.length === 0) {
    return wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.FORBIDDEN);
  }
  next();
};

module.exports = {
  generateToken,
  verifyToken
};
