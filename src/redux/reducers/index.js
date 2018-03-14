import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import currentLottery from './currentLottery'
import orderInfo from './orderInfo'
import orderList from './orderList'
import issueList from './issueList'
import planList from './planList'
import lotteryList from './lotteryList'
import popupInfo from './popupInfo'
import lobbyList from './lobbyList'
import layout from './layout'
import lhcBetData from './lhcBetData'
import userInfo from './userInfo'
import sysInfo from './sysInfo'

const rootReducer = combineReducers({
  currentLottery,
  orderInfo,
  orderList,
  issueList,
  planList,
  lotteryList,
  layout,
  lhcBetData,
  popupInfo,
  lobbyList,
  userInfo,
  sysInfo,
  routing: routerReducer
})


export default rootReducer
