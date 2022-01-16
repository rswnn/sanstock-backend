const wrapper = require('../../../../../helpers/utils/wrapper');
const query = require('../queries/query');

class CashFlow {
  async getBalance () {
    let getBalance = await query.getBalance();
    if (getBalance.resultCashIn.err || getBalance.resultCashOut.err) {
      return wrapper.error('err', { err: { ...getBalance.resultCashIn.message, ...getBalance.resultCashOut.message } },
        { code: { ...getBalance.resultCashIn.code, ...getBalance.resultCashOut.code } });
    } else if (getBalance.resultCashOut.data.length === 0 || getBalance.resultCashIn.data.length === 0) {
      return wrapper.data([], 'Data Not Found', 404);
    }
    getBalance = {
      cashIn: getBalance.resultCashIn.data[0].allCashIn,
      cashOut: getBalance.resultCashOut.data[0].allCashOut,
      total: getBalance.resultCashIn.data[0].allCashIn - getBalance.resultCashOut.data[0].allCashOut,
      currentCashIn: getBalance.resultCurrentCashIn.data[0].currentCashIn,
      currentCashOut: getBalance.resultCurrentCashOut.data[0].currentCashOut
    };
    return wrapper.data(getBalance, 'Success', 200);
  }

  async getCashByDate () {
    const getCashByDate = await query.getBalance();

    if (getCashByDate.err) {
      return wrapper.data([], 'Data Not Found', 404);
    }

    return wrapper.data(getCashByDate, 'Success', 200);
  }
}

module.exports = CashFlow;
