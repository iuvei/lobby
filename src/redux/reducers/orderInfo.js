import Immutable from 'immutable'

const calTotal = (betNum, amount, unit) => {
  let coefficient = 0
  if (unit === 'yuan') {
    coefficient = 0
  } else if (unit === 'jiao') {
    coefficient = 1
  } else if (unit === 'fen') {
    coefficient = 2
  }

  return betNum * amount / Math.pow(10, coefficient)
}

const orderInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ORDER_FROM_INDEX':
      return Immutable.fromJS(state).merge({
        betNum: action.orderInfo.betNum,
        amount: action.orderInfo.amount,
        total: action.orderInfo.total,
        selected: action.orderInfo.selected
      }).toJS()
    case 'ISSUENO_SET':
      return Immutable.fromJS(state).merge({issueNo:action.issueNo}).toJS()
    case 'SELECT_BET':
      const newSelected =  {
        selected: action.order.selected,
        betNum: action.order.betNum,
        total: calTotal(action.order.betNum, state.amount, state.unit)
      }
      return Immutable.fromJS(state).merge(newSelected).toJS()
    case 'INPUT_BET':
      const newInput = {
        inputRawData: action.order.inputRawData,
        inputData: action.order.input,
        betNum: action.order.betNum,
        total: calTotal(action.order.betNum, state.amount, state.unit)
      }
      return Immutable.fromJS(state).merge(newInput).toJS()
    case 'CHECKBOX_BET':
      const newChecked = {
        checked: action.order.checked,
        betNum: action.order.betNum,
        total: calTotal(action.order.betNum, state.amount, state.unit)
      }
      return Immutable.fromJS(state).merge(newChecked).toJS()
    case 'RESET_ORDER':
      return Object.assign({}, state, {
        playId: action.playId || state.playId,
        name: action.name || state.name,
        realName: action.realName || state.realName,
        categoryId: action.categoryId || state.categoryId,
        lotteryId: action.lotteryId || state.lotteryId,
        inputData: [],
        selected: action.selected || {},
        checked: [],
        inputRawData: '',
        betNum: action.betNum || 0,
        amount: action.amount || 2,
        unit: 'yuan',
        rebate: '0.0',
        currentOdds: null,
        total: action.total || 0
      })
    case 'BET_AMOUNT':
      return Object.assign({}, state, {
        amount: action.amount,
        total: calTotal(state.betNum, action.amount, state.unit)
      })
    case 'MONETARY_UNIT':
      return Object.assign({}, state, {
        unit: action.unit,
        total: calTotal(state.betNum, state.amount, action.unit)
      })
    case 'MODIFY_ODDS_REBATE':
      return Object.assign({}, state, {
        currentOdds: action.currentOdds,
        rebate: action.rebate
      })
    default:
      return state
  }
}

export default orderInfo
