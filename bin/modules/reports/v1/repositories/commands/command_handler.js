const Report = require('./domain');

const generateReport = async (payload, res) => {
  const report = new Report();
  const postCommand = async payload => report.generateReport(payload, res);
  return postCommand(payload);
};

module.exports = {
  generateReport
};
