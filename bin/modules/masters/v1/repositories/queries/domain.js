const wrapper = require('../../../../../helpers/utils/wrapper');
const queryMerchant = require('../../../../merchants/v1/repositories/queries/query');
const querySupplier = require('../../../../suppliers/v1/repositories/queries/query');
const queryProduct = require('../../../../products/v1/repositories/queries/query');

class Master {
  async listMaster () {
    const data = [];
    let listMerchant = await queryMerchant.listMerchant();
    if (listMerchant.err) {
      return wrapper.error('err', listMerchant.message, listMerchant.code);
    } else if (listMerchant.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }

    data.push(...listMerchant.data.map(v => Object.assign({}, {...v, type: 'merchant'})));
    let listSupplier = await querySupplier.listSupplier();
    if (listSupplier.err) {
      return wrapper.error('err', listSupplier.message, listSupplier.code);
    } else if (listSupplier.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    data.push(...listSupplier.data.map(v => Object.assign({}, {...v, type: 'supplier'})));
    
    let listProduct = await queryProduct.listProduct();
    if (listProduct.err) {
      return wrapper.error('err', listProduct.message, listProduct.code);
    } else if (listProduct.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    data.push(...listProduct.data.map(v => Object.assign({}, {...v, type: 'product'})));

    return wrapper.data(data, 'Success', 200);
  }
}

module.exports = Master;
