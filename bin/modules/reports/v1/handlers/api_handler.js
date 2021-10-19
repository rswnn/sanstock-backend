const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const validator = require('../utils/validator');

const generateReport = async (req, res) => {
  const payload = req.query;
  const validatePayload = validator.isValidPayload(payload, commandModel.generateReport);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.generateReport(result.data, res);
  };
  const sendResponse = async (result) => {
    return result
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  generateReport
};
