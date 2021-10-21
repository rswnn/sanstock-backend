const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const queryProduct = require('../../../../products/v1/repositories/queries/query');
const querySale = require('../../../../sales/v1/repositories/queries/query');
const wrapper = require('../../../../../helpers/utils/wrapper');
class Report {
  async generateReport (payload, res) {
    let {startDate, endDate, sku, skuInduk, data } = payload;
    let datas = [], nameFile, additional;

    if(data === 'inventory'){
      if(startDate && endDate){
        startDate = moment(startDate).startOf('day').format("YYYY-MM-DD");
        endDate = moment(endDate).startOf('day').format("YYYY-MM-DD");
        let findProductByDate = await queryProduct.findProductByDate({startDate, endDate})
        if (findProductByDate.err) {
          // return wrapper.error('err', findProductByDate.message, findProductByDate.code);
        } else if (findProductByDate.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findProductByDate = findProductByDate.data.map(v => Object.assign({}, v));
        datas = findProductByDate;
      }else if(sku){
        let findProductBySKU = await queryProduct.findProductBySKU(sku)
        if (findProductBySKU.err) {
          // return wrapper.error('err', findProductBySKU.message, findProductBySKU.code);
        } else if (findProductBySKU.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findProductBySKU = findProductBySKU.data.map(v => Object.assign({}, v));
        datas = findProductBySKU;
      }else if(skuInduk){
        let findProductBySKUInduk = await queryProduct.findProductBySKUInduk(skuInduk)
        if (findProductBySKUInduk.err) {
          // return wrapper.error('err', findProductBySKU.message, findProductBySKU.code);
        } else if (findProductBySKUInduk.data.length === 0) {
          // return wrapper.data([], 'Data Not Found', 404);
        }
        findProductBySKUInduk = findProductBySKUInduk.data.map(v => Object.assign({}, v));
        datas = findProductBySKUInduk;
      }
      for (let [i, value] of datas.entries()){
        let countSalesBySKU = await querySale.countSalesBySKU(value.sku);
        if (!countSalesBySKU.err) {
          countSalesBySKU = countSalesBySKU.data.map(v => Object.assign({}, v));
          datas[i].out = countSalesBySKU[0]['COUNT(*)'];
        }else{
          datas[i].out = 0;
        }
        datas[i].in = value.qty;
        datas[i].end_stock = datas[i].in - datas[i].out;
        datas[i].nilai_produk = datas[i].harga_modal * datas[i].end_stock;
      }
  
      additional = {
        in: datas.reduce(function (accumulator, current) {
          return accumulator + current.qty;
        }, 0),
        out: datas.reduce(function (accumulator, current) {
          return accumulator + current.out;
        }, 0),
        end_stock: datas.reduce(function (accumulator, current) {
          return accumulator + current.end_stock;
        }, 0),
        harga_modal: datas.reduce(function (accumulator, current) {
          return accumulator + current.harga_modal;
        }, 0),
        nilai_produk: datas.reduce(function (accumulator, current) {
          return accumulator + current.nilai_produk;
        }, 0),
        filter: "Filter"
      }
      nameFile = 'inventoryReport.ejs';
    }

    ejs.renderFile(path.join(__dirname, '../../../../../../files', nameFile), {datas: {datas, ...additional}}, (err, data) => {
      if (err) {
        res.send(err);
      } else {
          let options = {
              "height": "794px",
              "width": "1122px",
              "header": {
                "height": "20mm"
              },
              "footer": {
                "height": "20mm",
              },
          };
  
          // pdf.create(data, options).toFile('./asd.pdf', function(err, res) {
          //   if (err) return console.log(err);
          //   console.log(res); // { filename: '/app/businesscard.pdf' }
          // });
          pdf.create(data, options).toStream(function(err, stream) {
            stream.pipe(res);
          });
      }
    });
  }
}

module.exports = Report;
