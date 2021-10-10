const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
// const queryHandler = require('../repositories/queries/query_handler');
// const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');

const addCash = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.addCash);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.addCash(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  addCash
};
