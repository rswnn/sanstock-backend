const query = require('../repositories/queries/query');
const common = require('../../../../helpers/utils/common')
const wrapper = require('../../../../helpers/utils/wrapper');

const autoCodeGeneration = async (name) => {
    const getMaxCode = await query.getMaxCode();
    if(getMaxCode.err){
        return wrapper.error('err', getMaxCode.message, getMaxCode.code);
    }
    let mappingMysqlToJson = common.mappingMysqlToJson(getMaxCode)
    let maxCode = mappingMysqlToJson[0].kodeTerbesar;
    if(maxCode === null){
        return wrapper.data('MRC01', '');
    }else{
        let urutan = parseInt(maxCode.substring(3, 5));
        urutan++;
        urutan = "" + urutan;
        const prefix = "MRC";
        const pad = "00";
        let kode = prefix + pad.substring(0, pad.length - urutan.length) + urutan
        return wrapper.data(kode, '');
    }
};

module.exports = {
    autoCodeGeneration
};
  