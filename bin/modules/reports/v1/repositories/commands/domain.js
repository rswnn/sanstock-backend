const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const queryProduct = require('../../../../products/v1/repositories/queries/query');
const querySales = require('../../../../sales/v1/repositories/queries/query');
const queryMechant = require('../../../../merchants/v1/repositories/queries/query');
const querySupplier = require('../../../../suppliers/v1/repositories/queries/query');
const queryCashFlow = require('../../../../cash_flow/v1/repositories/queries/query');
const wrapper = require('../../../../../helpers/utils/wrapper');

class Report {
  async generateReport (payload, res) {
    let { startDate, endDate, sku, skuInduk, userId, supplierId, merchantId, productId, data, typeCash, transactionType } = payload;
    let datas = []; let nameFile; let additional;

    if (data === 'inventory') {
      if (startDate && endDate) {
        startDate = moment(startDate).startOf('day').format('YYYY-MM-DD');
        endDate = moment(endDate).startOf('day').format('YYYY-MM-DD');
        let findProductByDate = await queryProduct.findProductByDate({ startDate, endDate });
        if (findProductByDate.err) {
          // return wrapper.error('err', findProductByDate.message, findProductByDate.code);
        } else if (findProductByDate.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findProductByDate = findProductByDate.data.map(v => Object.assign({}, v));
        datas = findProductByDate;
      } else if (sku) {
        let findProductBySKU = await queryProduct.findProductBySKU(sku);
        if (findProductBySKU.err) {
          // return wrapper.error('err', findProductBySKU.message, findProductBySKU.code);
        } else if (findProductBySKU.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findProductBySKU = findProductBySKU.data.map(v => Object.assign({}, v));
        datas = findProductBySKU;
      } else if (skuInduk) {
        let findProductBySKUInduk = await queryProduct.findProductBySKUInduk(skuInduk);
        if (findProductBySKUInduk.err) {
          // return wrapper.error('err', findProductBySKU.message, findProductBySKU.code);
        } else if (findProductBySKUInduk.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findProductBySKUInduk = findProductBySKUInduk.data.map(v => Object.assign({}, v));
        datas = findProductBySKUInduk;
      } else if (userId) {
        let findProductByUserId = await queryProduct.findProductByUserId(userId);
        if (findProductByUserId) {
          // return wrapper.error('err', findProductByUserId.message, findProductByUserId.code);
        } else if (findProductByUserId.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findProductByUserId = findProductByUserId.data.map(v => Object.assign({}, v));
        datas = findProductByUserId;
      } else if (supplierId) {
        let findByProductBySupplierId = await queryProduct.findProductBySupplierId(supplierId);
        if (findByProductBySupplierId) {
          // return wrapper.error('err', findByProductBySupplierId.message, findByProductBySupplierId.code);
        } else if (findByProductBySupplierId.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findByProductBySupplierId = findByProductBySupplierId.data.map(v => Object.assign({}, v));
        datas = findByProductBySupplierId;
      }
      for (const [i, value] of datas.entries()) {
        let countSalesBySKU = await querySales.countSalesBySKU(value.sku);
        if (!countSalesBySKU.err) {
          countSalesBySKU = countSalesBySKU.data.map(v => Object.assign({}, v));
          datas[i].out = countSalesBySKU[0]['COUNT(*)'];
        } else {
          datas[i].out = 0;
        }
        datas[i].in = value.qty;
        datas[i].end_stock = datas[i].in - datas[i].out;
        datas[i].nilai_produk = datas[i].harga_modal * datas[i].end_stock;
      }

      additional = {
        in: datas.reduce((accumulator, current) => {
          return accumulator + current.qty;
        }, 0),
        out: datas.reduce((accumulator, current) => {
          return accumulator + current.out;
        }, 0),
        end_stock: datas.reduce((accumulator, current) => {
          return accumulator + current.end_stock;
        }, 0),
        harga_modal: datas.reduce((accumulator, current) => {
          return accumulator + current.harga_modal;
        }, 0),
        nilai_produk: datas.reduce((accumulator, current) => {
          return accumulator + current.nilai_produk;
        }, 0),
        filter: 'Filter'
      };
      nameFile = 'inventoryReport.ejs';
    };
    if (data === 'sales') {
      if (startDate && endDate) {
        startDate = moment(startDate).startOf('day').format('YYYY-MM-DD');
        endDate = moment(endDate).startOf('day').format('YYYY-MM-DD');
        let findSalesByDate = await querySales.findSalesByDate({ startDate, endDate, transactionType });
        if (findSalesByDate) {
          // return wrapper.error('err', findSalesByDate.message, findSalesByDate.code);
        } else if (findSalesByDate.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findSalesByDate = findSalesByDate.data.map(v => Object.assign({}, v));
        datas = findSalesByDate;
      } else if (sku) {
        let findSalesBySKU = await querySales.findSalesBySKU(sku, transactionType);
        if (findSalesBySKU) {
          // return wrapper.error('err', findSalesBySKU.message, findSalesBySKU.code);
        } else if (findSalesBySKU.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findSalesBySKU = findSalesBySKU.data.map(v => Object.assign({}, v));
        datas = findSalesBySKU;
      } else if (userId) {
        let findSalesByUserId = await querySales.findSalesByUserId(userId, transactionType);
        if (findSalesByUserId) {
          // return wrapper.error('err', findSalesByUserId.message, findSalesByUserId.code);
        } else if (findSalesByUserId.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findSalesByUserId = findSalesByUserId.data.map(v => Object.assign({}, v));
        datas = findSalesByUserId;
      } else if (productId) {
        let findSalesByProductId = await querySales.findSalesByProductId(productId, transactionType);
        if (findSalesByProductId) {
          // return wrapper.error('err', findSalesByProductId.message, findSalesByProductId.code);
        } else if (findSalesByProductId.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findSalesByProductId = findSalesByProductId.data.map(v => Object.assign({}, v));
        datas = findSalesByProductId;
      } else if (merchantId) {
        let findSalesByMerchantId = await querySales.findSalesByMerchantId(merchantId, transactionType);
        if (findSalesByMerchantId) {
          // return wrapper.error('err', findSalesByMerchantId.message, findSalesByMerchantId.code);
        } else if (findSalesByMerchantId.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findSalesByMerchantId = findSalesByMerchantId.data.map(v => Object.assign({}, v));
        datas = findSalesByMerchantId;
      }
      for (const [i, value] of datas.entries()) {
        let countSalesBySKU = await querySales.countSalesBySKU(value.sku);
        if (!countSalesBySKU.err) {
          countSalesBySKU = countSalesBySKU.data.map(v => Object.assign({}, v));
          datas[i].out = countSalesBySKU[0]['COUNT(*)'];
        } else {
          datas[i].out = 0;
        }
        datas[i].in = value.qty;
        datas[i].end_stock = datas[i].in - datas[i].out;
        datas[i].nilai_produk = datas[i].harga_modal * datas[i].end_stock;
      }

      additional = {
        in: datas.reduce((accumulator, current) => {
          return accumulator + current.qty;
        }, 0),
        out: datas.reduce((accumulator, current) => {
          return accumulator + current.out;
        }, 0),
        end_stock: datas.reduce((accumulator, current) => {
          return accumulator + current.end_stock;
        }, 0),
        harga_modal: datas.reduce((accumulator, current) => {
          return accumulator + current.harga_modal;
        }, 0),
        nilai_produk: datas.reduce((accumulator, current) => {
          return accumulator + current.nilai_produk;
        }, 0),
        filter: 'Filter'
      };
      if (transactionType === 'in') {
        datas = datas.map(res => {
          if (res.transaction_type) {
            res.profit = Number(res.harga_jual) - Number(res.hargaProduct) - Number(res.pajak) - Number(res.ongkir) - Number(res.biaya_lain) - Number(res.merchant_fee);
          }
          return res;
        });
      }
      nameFile = 'inventoryReport.ejs';
    };
    if (data === 'merchant') {
      let findMerchant = await queryMechant.listMerchant();

      if (findMerchant.err) {
        return wrapper.error('err', findMerchant.message, findMerchant.code);
      }
      findMerchant = findMerchant.data.map(v => Object.assign({}, v));
      datas = findMerchant;
      nameFile = 'inventoryReport.ejs';
    }
    if (data === 'supplier') {
      let findSupplier = await querySupplier.listSupplier();

      if (findSupplier.err) {
        return wrapper.error('err', findSupplier.message, findSupplier.code);
      }
      findSupplier = findSupplier.data.map(v => Object.assign({}, v));
      datas = findSupplier;
      nameFile = 'inventoryReport.ejs';
    }

    if (data === 'cash') {
      if (startDate && endDate) {
        startDate = moment(startDate).startOf('day').format('YYYY-MM-DD');
        endDate = moment(endDate).startOf('day').format('YYYY-MM-DD');
        let findCashByDate = await queryCashFlow.getCashByDate({ startDate, endDate });
        if (findCashByDate.err) {
          // return wrapper.error('err', findCashByDate.message, findCashByDate.code);
        } else if (findCashByDate.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findCashByDate = findCashByDate.data.map(v => Object.assign({}, v));
        datas = typeCash === 'in' ? findCashByDate.filter(res => res.cash_in > 0) : findCashByDate.filter(res => res.cash_out > 0);
        nameFile = 'inventoryReport.ejs';
      }
    }

    ejs.renderFile(path.join(__dirname, '../../../../../../files', nameFile), { datas: { datas, ...additional } }, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        const options = {
          height: '794px',
          width: '1122px',
          header: {
            height: '20mm'
          },
          footer: {
            height: '20mm'
          }
        };

        // pdf.create(data, options).toFile('./asd.pdf', function(err, res) {
        //   if (err) return console.log(err);
        //   console.log(res); // { filename: '/app/businesscard.pdf' }
        // });
        pdf.create(data, options).toStream((err, stream) => {
          stream.pipe(res);
        });
      }
    });
  }
}

module.exports = Report;
