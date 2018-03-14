import Immutable from 'immutable'

const layout = (state = {}, action) =>{
  switch (action.type) {
    case 'LAYOUT_SET':
      return Immutable.fromJS(state).merge({
        ...action.layout
      }).toJS()
    case 'SET_SUBLAYOUT':
      return Immutable.fromJS(state).merge({
        subLayout: action.subLayout
      }).toJS()
    default:
      return state
  }
}

export default layout
