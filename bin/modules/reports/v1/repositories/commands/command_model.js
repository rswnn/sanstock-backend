const joi = require('joi');

const generateReport = joi.object({
    data: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required()
});

module.exports = {
    generateReport
};
