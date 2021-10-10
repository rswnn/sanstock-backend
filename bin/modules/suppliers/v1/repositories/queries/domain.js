const wrapper = require('../../../../../helpers/utils/wrapper');
const query = require('../queries/query');

class Supplier {
  async listSupplier () {
    let listSupplier = await query.listSupplier();
    if (listSupplier.err) {
      return wrapper.error('err', listSupplier.message, listSupplier.code);
    } else if (listSupplier.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    listSupplier = listSupplier.data.map(v => Object.assign({}, v));
    return wrapper.data(listSupplier, 'Success', 200);
  }
}

module.exports = Supplier;
