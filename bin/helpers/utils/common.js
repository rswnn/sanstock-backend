
const mappingMysqlToJson = (result) => {
  return result.data.map(v => Object.assign({}, v));
};

module.exports = {
  mappingMysqlToJson
};
