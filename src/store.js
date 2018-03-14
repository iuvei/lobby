import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './redux/reducers/index'

const defaultState = {
  orderInfo: {
    inputData: [],
    selected: {},
    checked: [],
    betNum: 0,
    amount: 2,
    unit: 'yuan',
    total: 0
  },
  orderList: [],
  issueList: [],
  planList: [],
  currentLottery: {},
  popupInfo: {}
}
const enhancers = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
const store = createStore(rootReducer, defaultState, enhancers)

export default store
