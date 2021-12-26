const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const jwtAuth = require('../../../../auth/jwt_auth_helper');

const getUser = async (req, res) => {
  const user = await jwtAuth.getUser(req, res);
  return user;
};

const addSale = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = { ...req.body, userId: userId.id };
  const validatePayload = validator.isValidPayload(payload, commandModel.addSale);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.addSale(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const listProduct = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, queryModel.listProduct);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.listProduct(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteSale = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.deleteSale);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.deleteSale(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const updateSale = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = {
    ...req.params,
    ...req.body,
    userId: userId.id
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateSale);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateSale(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  addSale,
  listProduct,
  deleteSale,
  updateSale
};
