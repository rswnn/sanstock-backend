const wrapper = require('../../../../../helpers/utils/wrapper');
const queryMerchant = require('../../../../merchants/v1/repositories/queries/query');
const querySupplier = require('../../../../suppliers/v1/repositories/queries/query');
const queryProduct = require('../../../../products/v1/repositories/queries/query');

class Master {
  async listMaster () {
    let data = [];
    const listMerchant = await queryMerchant.listMerchant();
    if (listMerchant.err) {
      return wrapper.error('err', listMerchant.message, listMerchant.code);
    }

    if (listMerchant.data.length > 0) {
      data.push(...listMerchant.data.map(v => Object.assign({}, { ...v, type: 'merchant' })));
    }
    const listSupplier = await querySupplier.listSupplier();
    if (listSupplier.err) {
      return wrapper.error('err', listSupplier.message, listSupplier.code);
    }
    if (listSupplier.data.length > 0) {
      data.push(...listSupplier.data.map(v => Object.assign({}, { ...v, type: 'supplier' })));
    }

    const listProduct = await queryProduct.listProduct();
    if (listProduct.err) {
      return wrapper.error('err', listProduct.message, listProduct.code);
    }

    if (listProduct.data.length) {
      data.push(...listProduct.data.map(v => Object.assign({}, { ...v, type: 'product' })));
    }
    data = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return wrapper.data(data, 'Success', 200);
  }
}

module.exports = Master;
