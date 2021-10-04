const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_modal');
const validator = require('../utils/validator');

const authenticate = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.authenticate);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.authenticate(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  authenticate
};
