const wrapper = require('../../../../../helpers/utils/wrapper');
const queryProduct = require('../../../../products/v1/repositories/queries/query');
const querySale = require('../../../../sales/v1/repositories/queries/query');

class Transaction {
  async listHistory () {
    const data = [];

    const listSale = await querySale.listSale();
    if (listSale.err) {
      return wrapper.error('err', listSale.message, listSale.code);
    } else if (listSale.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    data.push(...listSale.data.map(v => Object.assign({}, { ...v })));

    return wrapper.data(data, 'Success', 200);
  }
}

module.exports = Transaction;
