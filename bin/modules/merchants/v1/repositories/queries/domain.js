const wrapper = require('../../../../../helpers/utils/wrapper');
const query = require('../queries/query');

class Product {
  async listMerchant () {
    
    let listMerchant = await query.listMerchant();
    if (listMerchant.err) {
      return wrapper.error('err', listMerchant.message, listMerchant.code);
    }else if (listMerchant.data.length === 0) {
        return wrapper.data('', 'Data Not Found', 404);
    }
    listMerchant = listMerchant.data.map(v => Object.assign({}, v));
    return wrapper.data(listMerchant, 'Success', 200);
  }
}

module.exports = Product;
