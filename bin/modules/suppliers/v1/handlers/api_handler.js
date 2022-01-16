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

const addSupplier = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = { ...req.body, userId: userId.id };
  const validatePayload = validator.isValidPayload(payload, commandModel.addSupplier);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.addSupplier(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const listSupplier = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, queryModel.listSupplier);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.listSupplier(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteSupplier = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.deleteSupplier);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.deleteSupplier(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const updateSupplier = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = {
    ...req.params,
    ...req.body,
    userId: userId.id
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateSupplier);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateSupplier(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  addSupplier,
  listSupplier,
  deleteSupplier,
  updateSupplier
};
