const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const moment = require('moment-timezone')
moment.tz('Asia/Jakarta')

class Product {
  async addProduct (payload) {
    payload.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    payload.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    let insertOneProduct = await command.insertOneProduct(payload);
    if (insertOneProduct.err) {
      return wrapper.error('err', insertOneProduct.message, insertOneProduct.code);
    }
    return wrapper.data('', 'Success Input', 201);
  }

  async deleteProduct (payload) {
    let deleteProduct = await command.deleteProduct(payload);
    if (deleteProduct.err) {
      return wrapper.error('err', deleteProduct.message, deleteProduct.code);
    }
    return wrapper.data('', 'Success Delete', 201);
  }

  async updateProduct (payload) {
    payload.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    let updateProduct = await command.updateProduct(payload);
    if (updateProduct.err) {
      return wrapper.error('err', updateProduct.message, updateProduct.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }
}

module.exports = Product;
