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
// const CashFlow = require('../../../../cash_flow/v1/repositories/queries/domain');
const wrapper = require('../../../../../helpers/utils/wrapper');

class Report {
  async generateReport (payload, res) {
    let { startDate, endDate, sku, skuInduk, userId, supplierId, merchantId, productId, data, transactionType } = payload;
    let datas = []; let nameFile; let additional;
    let lastDate = '';

    // console.log(data);

    if (data === 'inventory') {
      if (startDate && endDate) {
        startDate = moment(startDate).startOf('day').format('YYYY-MM-DD');
        endDate = moment(endDate).add(5, 'minutes').startOf('day').format('YYYY-MM-DD');
        lastDate = endDate;
        if (moment(startDate).isSame(endDate)) {
          endDate = moment(endDate).add(1, 'day').startOf('day').format('YYYY-MM-DD');
          lastDate = '';
        }
        let findProductByDate = await queryProduct.findProductByDate({ startDate, endDate, sku, skuInduk });
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
        let countSalesBySKU = await querySales.countSalesOut(value.id);
        if (!countSalesBySKU.err) {
          countSalesBySKU = countSalesBySKU.data.map(v => Object.assign({}, v)).reduce((accumulator, current) => {
            return accumulator + Number(current.qty);
          }, 0);
          datas[i].out = countSalesBySKU;
        } else {
          datas[i].out = 0;
        }
        datas[i].in = value.qty;
        datas[i].end_stock = value.qty;
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
        startDate,
        lastDate,
        filter: 'Filter'
      };
      nameFile = 'inventoryReport.ejs';
    };
    if (data === 'sales') {
      let listProductData = [];
      if (startDate && endDate) {
        startDate = moment(startDate).startOf('day').format('YYYY-MM-DD');
        endDate = moment(endDate).add(5, 'minutes').startOf('day').format('YYYY-MM-DD');
        lastDate = endDate;
        if (moment(startDate).isSame(endDate)) {
          endDate = moment(endDate).add(1, 'day').startOf('day').format('YYYY-MM-DD');
          lastDate = '';
        }
        let findSalesByDate = await querySales.findSalesByDate({ startDate, endDate, transactionType, sku, skuInduk });
        if (transactionType === 'outcome') {
          const tempListProduct = await queryProduct.listProduct();
          listProductData = tempListProduct.data.map(v => Object.assign({}, v));
        }
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
        if (transactionType === 'income') {
          const otherPrice = Number(datas[i].pajak) + Number(datas[i].merchant_fee) + Number(datas[i].ongkir) + Number(datas[i].biaya_lain);
          const received = Number(datas[i].harga_jual) - otherPrice;
          const profit = Number(datas[i].harga_jual) - Number(datas[i].hargaProduct) - Number(datas[i].pajak) - Number(datas[i].ongkir) - Number(datas[i].biaya_lain) - Number(datas[i].merchant_fee);
          datas[i].otherPrice = otherPrice;
          datas[i].received = received;
          datas[i].profit = profit;
        } else {
          const totalAllBuy = Number(datas[i].hargaProduct) * Number(datas[i].qty);
          datas[i].totalAllBuy = totalAllBuy;
          datas[i].supplierName = listProductData.find(res => res.id === datas[i].product_id).supplierName;
        }
      }

      if (transactionType === 'income') {
        additional = {
          allQty: datas.reduce((accumulator, current) => {
            return accumulator + Number(current.qty);
          }, 0),
          priceSale: datas.reduce((accumulator, current) => {
            return accumulator + Number(current.harga_jual);
          }, 0),
          otherPrice: datas.reduce((accumulator, current) => {
            const otherPrice = Number(current.pajak) + Number(current.merchant_fee) + Number(current.ongkir) + Number(current.biaya_lain);
            return accumulator + otherPrice;
          }, 0),
          startingPrice: datas.reduce((accumulator, current) => {
            return accumulator + current.hargaProduct;
          }, 0),
          allProfit: datas.reduce((accumulator, current) => {
            return accumulator + current.profit;
          }, 0),
          allReceived: datas.reduce((accumulator, current) => {
            return accumulator + current.received;
          }, 0),
          startDate,
          lastDate

        };
      } else {
        additional = {
          allQty: datas.reduce((accumulator, current) => {
            return accumulator + Number(current.qty);
          }, 0),
          totalAllBuy: datas.reduce((accumulator, current) => {
            return accumulator + current.totalAllBuy;
          }, 0),
          startDate,
          lastDate
        };
      }
      nameFile = transactionType === 'income' ? 'sales.ejs' : 'outcome.ejs';
    };
    if (data === 'merchant') {
      let findMerchant = await queryMechant.listMerchant();

      if (findMerchant.err) {
        return wrapper.error('err', findMerchant.message, findMerchant.code);
      }
      findMerchant = findMerchant.data.map(v => Object.assign({}, v));
      datas = findMerchant;
      nameFile = 'merchant.ejs';
    }
    if (data === 'supplier') {
      let findSupplier = await querySupplier.listSupplier();

      if (findSupplier.err) {
        return wrapper.error('err', findSupplier.message, findSupplier.code);
      }
      findSupplier = findSupplier.data.map(v => Object.assign({}, v));
      datas = findSupplier;
      nameFile = 'supplier.ejs';
    }

    if (data === 'cash') {
      if (startDate && endDate) {
        startDate = moment(startDate).startOf('day').format('YYYY-MM-DD');
        endDate = moment(endDate).add(5, 'minutes').startOf('day').format('YYYY-MM-DD');
        lastDate = endDate;
        if (moment(startDate).isSame(endDate)) {
          endDate = moment(endDate).add(1, 'day').startOf('day').format('YYYY-MM-DD');
          lastDate = '';
        }
        let findCashByDate = await queryCashFlow.getCashByDate({ startDate, endDate });
        if (findCashByDate.err) {
          // return wrapper.error('err', findCashByDate.message, findCashByDate.code);
        } else if (findCashByDate.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findCashByDate = findCashByDate.data.map(v => Object.assign({}, v));
        datas = transactionType === 'income' ? findCashByDate.filter(res => res.cash_in > 0) : findCashByDate.filter(res => res.cash_out > 0);

        additional = {
          transactionType,
          totalCash: datas.reduce((accumulator, current) => {
            return transactionType === 'income' ? accumulator + current.cash_in : accumulator + current.cash_out;
          }, 0),
          startDate,
          lastDate
        };
        nameFile = 'cash.ejs';
        console.log(datas, additional);
      }
    }
    if (data === 'summary') {
      if (startDate && endDate) {
        startDate = moment(startDate).startOf('day').format('YYYY-MM-DD');
        endDate = moment(endDate).add(5, 'minutes').startOf('day').format('YYYY-MM-DD');
        lastDate = endDate;
        if (moment(startDate).isSame(endDate)) {
          endDate = moment(endDate).add(1, 'day').startOf('day').format('YYYY-MM-DD');
          lastDate = '';
        }
        const findSalesIncome = await querySales.findAllTransaction({ startDate, endDate, transactionType: 'income' });
        const findSalesOutcome = await querySales.findAllTransaction({ startDate, endDate, transactionType: 'outcome' });
        const findSalesProduct = await queryProduct.listProduct({});
        const getBalance = await queryCashFlow.getBalance();
        const getListMerchant = await queryMechant.listMerchant();
        if (findSalesIncome.err || findSalesOutcome.err) {
          return '[Error]';
        }

        const getSalesByMerchant = getListMerchant.data.map(res => {
          res.total = findSalesIncome.data.filter((sales) => sales.merchant_id === res.id).reduce((acc, curr) => {
            return acc + Number(curr.harga_jual);
          }, 0);
          return res;
        });

        additional = {
          omset: findSalesIncome.data.reduce((acc, curr) => {
            return acc + (Number(curr.harga_jual) * Number(curr.qty));
          }, 0),
          profit: findSalesIncome.data.reduce((acc, curr) => {
            return acc + ((Number(curr.harga_jual) * Number(curr.qty)) - (Number(curr.hargaModal) * Number(curr.qty)) - Number(curr.pajak) - Number(curr.ongkir) - Number(curr.biaya_lain) - Number(curr.merchant_fee));
          }, 0),
          totalOutStock: findSalesOutcome.data.reduce((acc, curr) => {
            return acc + Number(curr.harga_jual);
          }, 0),
          jumlahNilaiProduk: findSalesProduct.data.reduce((acc, curr) => {
            return acc + (Number(curr.harga_modal) * Number(curr.qty));
          }, 0),
          stokProduk: findSalesProduct.data.filter((res) => res.qty > 0).reduce((acc, curr) => {
            return acc + Number(curr.qty);
          }, 0),
          jumlahPajak: findSalesIncome.data.reduce((acc, curr) => {
            return acc + Number(curr.pajak);
          }, 0),
          merchantFee: findSalesIncome.data.reduce((acc, curr) => {
            return acc + Number(curr.merchant_fee);
          }, 0),
          biayaLain: findSalesIncome.data.reduce((acc, curr) => {
            return acc + Number(curr.biaya_lain);
          }, 0),
          biayaOngkir: findSalesIncome.data.reduce((acc, curr) => {
            return acc + Number(curr.ongkir);
          }, 0),
          resultCashIn: getBalance.resultCashIn.data[0].allCashIn,
          resultCashOut: getBalance.resultCashOut.data[0].allCashOut,
          total: getBalance.resultCashIn.data[0].allCashIn - getBalance.resultCashOut.data[0].allCashOut,
          getSalesByMerchant,
          startDate,
          lastDate
        };
        console.log(additional);
        nameFile = 'summary.ejs';
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
        pdf.create(data, options).toStream((_, stream) => {
          stream.pipe(res);
        });
      }
    });
  }
}

module.exports = Report;
