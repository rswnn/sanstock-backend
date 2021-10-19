const Report = require('./domain');

const generateReport = async (payload) => {
  const report = new Report();
  const postCommand = async payload => report.generateReport(payload);
  return postCommand(payload);
};

module.exports = {
    generateReport
};
