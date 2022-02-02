const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const helpers = require('../../utils/helpers');
const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');

class Supplier {
  async addSupplier (payload) {
    const autoCodeGeneration = await helpers.autoCodeGeneration();
    if (autoCodeGeneration.err) {
      return wrapper.error('err', autoCodeGeneration.message, autoCodeGeneration.code);
    }
    payload.kode = autoCodeGeneration.data;
    payload.createdAt = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const insertSupplier = await command.insertSupplier(payload);
    if (insertSupplier.err) {
      return wrapper.error('err', insertSupplier.message, insertSupplier.code);
    }
    return wrapper.data('', 'Success Input', 201);
  }

  async deleteSupplier (payload) {
    const deleteSupplier = await command.deleteSupplier(payload);
    if (deleteSupplier.err) {
      return wrapper.error('err', deleteSupplier.message, deleteSupplier.code);
    }
    return wrapper.data('', 'Success Delete', 201);
  }

  async updateSupplier (payload) {
    payload.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateSupplier = await command.updateSupplier(payload);
    if (updateSupplier.err) {
      return wrapper.error('err', updateSupplier.message, updateSupplier.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }
}

module.exports = Supplier;
