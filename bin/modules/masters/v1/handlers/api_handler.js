const wrapper = require('../../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');

const listMaster = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, queryModel.listMaster);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.listMaster(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  listMaster
};
