const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const queryProduct = require('../../../../products/v1/repositories/queries/query');
const querySale = require('../../../../sales/v1/repositories/queries/query');

class Report {
  async generateReport (payload, res) {
    let {startDate, endDate } = payload;
    let datas, nameFile;
    if(startDate && endDate){
      startDate = moment(startDate).startOf('day').format("YYYY-MM-DD");
      endDate = moment(endDate).startOf('day').format("YYYY-MM-DD");
      let findProductByDate = await queryProduct.findProductByDate({startDate, endDate})
      if (findProductByDate.err) {
        return wrapper.error('err', findProductByDate.message, findProductByDate.code);
      } else if (findProductByDate.data.length === 0) {
        return wrapper.data([], 'Data Not Found', 404);
      }
      findProductByDate = findProductByDate.data.map(v => Object.assign({}, v));
      for (let [i, value] of findProductByDate.entries()){
        let countSalesBySKU = await querySale.countSalesBySKU(value.sku);
        if (!countSalesBySKU.err) {
          countSalesBySKU = countSalesBySKU.data.map(v => Object.assign({}, v));
          findProductByDate[i].out = countSalesBySKU[0]['COUNT(*)'];
        }
      }
      datas = findProductByDate;
      nameFile = 'inventoryReport.ejs';
    }

    ejs.renderFile(path.join(__dirname, '../../../../../../files', nameFile), {datas: datas}, (err, data) => {
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
  
          // pdf.create(data, options).toStream(function(err, stream) {
          //   stream.pipe(res);
          // });
          pdf.create(data, options).toFile('./asd.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
          });
      }
    });
  }
}

module.exports = Report;
