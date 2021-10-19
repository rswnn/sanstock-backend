const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");

class Report {
  async generateReport (payload) {
    let students = [
        {name: "Joy",
         email: "joy@example.com",
         city: "New York",
         country: "USA"},
        {name: "John",
         email: "John@example.com",
         city: "San Francisco",
         country: "USA"},
        {name: "Clark",
         email: "Clark@example.com",
         city: "Seattle",
         country: "USA"},
        {name: "Watson",
         email: "Watson@example.com",
         city: "Boston",
         country: "USA"},
        {name: "Tony",
         email: "Tony@example.com",
         city: "Los Angels",
         country: "USA"
      }];
    
      ejs.renderFile(path.join(__dirname, '../../files', "report.ejs"), {students: students}, (err, data) => {
        if (err) {
          res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                  "height": "20mm"
                },
                "footer": {
                  "height": "20mm",
                },
            };
    
            pdf.create(data, options).toStream(function(err, stream) {
              stream.pipe(res);
            });
        }
      });
  }
}

module.exports = Report;
