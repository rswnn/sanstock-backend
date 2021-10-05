const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const helpers = require('../../utils/helpers');
const moment = require('moment-timezone')
moment.tz('Asia/Jakarta')

class Merchant {
  async addMerchant (payload) {
    let autoCodeGeneration = await helpers.autoCodeGeneration();
    if(autoCodeGeneration.err){
      return wrapper.error('err', autoCodeGeneration.message, autoCodeGeneration.code);
    }
    payload.kode = autoCodeGeneration.data;
    payload.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    payload.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    let insertMerchant = await command.insertMerchant(payload);
    if(insertMerchant.err){
      return wrapper.error('err', insertMerchant.message, insertMerchant.code);
    }
    return wrapper.data('', 'Success Input', 201);
  }

  async deleteMerchant (payload) {
    let deleteMerchant = await command.deleteMerchant(payload);
    if (deleteMerchant.err) {
      return wrapper.error('err', deleteMerchant.message, deleteMerchant.code);
    }
    return wrapper.data('', 'Success Delete', 201);
  }

  async updateMerchant (payload) {
    payload.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    let updateMerchant = await command.updateMerchant(payload);
    if (updateMerchant.err) {
      return wrapper.error('err', updateMerchant.message, updateMerchant.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }
}

module.exports = Merchant;
