import Immutable from 'immutable'

const lhcBetData = (state = [], action) =>{
  switch (action.type) {
    case 'SET_BETDATA':
      return Immutable.fromJS(state).merge({
        betData: action.betData
      }).toJS()
    default:
      return state
  }
}

export default lhcBetData
