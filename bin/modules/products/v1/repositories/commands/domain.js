const wrapper = require('../../../../../helpers/utils/wrapper');
const command = require('../commands/command');

class Product {
  async addProduct (payload) {
    let insertOneProduct = await command.insertOneProduct(payload);
    if (insertOneProduct.err) {
      return wrapper.error('err', insertOneProduct.message, insertOneProduct.code);
    }
    return wrapper.data('', 'Success', 201);
  }

  async deleteProduct (payload) {
    let deleteProduct = await command.deleteProduct(payload);
    if (deleteProduct.err) {
      return wrapper.error('err', deleteProduct.message, deleteProduct.code);
    }
    return wrapper.data('', 'Success Delete', 201);
  }

  async updateProduct (payload) {
    let updateProduct = await command.updateProduct(payload);
    if (updateProduct.err) {
      return wrapper.error('err', updateProduct.message, updateProduct.code);
    }
    return wrapper.data('', 'Success Update', 201);
  }
}

module.exports = Product;
