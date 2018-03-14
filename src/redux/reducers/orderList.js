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

const orderList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return [
        action.orderInfo,
        ...state
      ]
    case 'DEL_ORDER':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    case 'MODIFY_AMOUNT':
      let amount = action.amount ? action.amount : 1;
      let total = calTotal(state[action.index].betNum, amount, state[action.index].unit)
      return [
        ...state.slice(0, action.index),
        {...state[action.index], amount, total},
        ...state.slice(action.index + 1)
      ]
    case 'MODIFY_UNIT':
      total = calTotal(state[action.index].betNum, state[action.index].amount, action.unit)
      return [
        ...state.slice(0, action.index),
        {...state[action.index], unit: action.unit, total},
        ...state.slice(action.index + 1)
      ]
    case 'REMOVE_ALL':
      return []
    case 'ADD_RANDOM_ORDER':
      return [
        ...action.orderList,
        ...state
      ]
    default:
      return state;
  }
}

export default orderList;
