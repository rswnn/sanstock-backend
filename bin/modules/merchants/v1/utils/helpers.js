const query = require('../repositories/queries/query');
const common = require('../../../../helpers/utils/common');
const wrapper = require('../../../../helpers/utils/wrapper');

const autoCodeGeneration = async () => {
  const getMaxCode = await query.getMaxCode();
  if (getMaxCode.err) {
    return wrapper.error('err', getMaxCode.message, getMaxCode.code);
  }
  const mappingMysqlToJson = common.mappingMysqlToJson(getMaxCode);
  const maxCode = mappingMysqlToJson[0].kodeTerbesar;
  if (maxCode === null) {
    return wrapper.data('MRC01', '');
  }
  let urutan = parseInt(maxCode.substring(3, 5));
  urutan++;
  urutan = '' + urutan;
  const prefix = 'MRC';
  const pad = '00';
  const kode = prefix + pad.substring(0, pad.length - urutan.length) + urutan;
  return wrapper.data(kode, '');
};

module.exports = {
  autoCodeGeneration
};
