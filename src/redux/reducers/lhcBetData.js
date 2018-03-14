import Immutable from 'immutable'

const lhcBetData = (state = { betData: [],currentBetData: [], showBetData: {}, tabIndex: 0, gridData: null, WinStop: false, totalCost: 0, SliderValue: 0, OrderConfirm: false }, action) =>{
  switch (action.type) {
    case 'SET_BETDATA':
      return Immutable.fromJS(state).merge({
        betData: action.betData
      }).toJS()
    case 'SET_SHOWBETDATA':
      return Immutable.fromJS(state).merge({
        showBetData: action.showBetData
      }).toJS()
    case 'SET_CBETDATA':
      return Immutable.fromJS(state).merge({
        currentBetData: action.currentBetData,
      }).toJS()
    case 'SET_REBATE':
      return Immutable.fromJS(state).merge({
        reBate: action.reBate
      }).toJS()
    case 'SET_TABINDEX':
      return Immutable.fromJS(state).merge({
        tabIndex: action.tabIndex,
        size: action.size,
      }).toJS()
    case 'SET_SUBTABINDEX':
      return Immutable.fromJS(state).merge({
        subTabIndex: action.subTabIndex
      }).toJS()
    case 'SET_GRIDDATA':
      return Immutable.fromJS(state).merge({
        gridData: action.gridData
      }).toJS()
    case 'SET_PLAYWAY':
      return Immutable.fromJS(state).merge({
        playWay: action.playWay
      }).toJS()
    case 'SET_CHASESTATE':
      return Immutable.fromJS(state).merge({
        chaseState: action.chaseState
      }).toJS()
    case 'SET_TOTALCOST':
      return Immutable.fromJS(state).merge({
        totalCost: action.totalCost
      }).toJS()
    case 'SET_LHCMULTIPLE':
      return Immutable.fromJS(state).merge({
        lhcMultiple: action.lhcMultiple
      }).toJS()
    case 'SET_WINSTOP':
      return Immutable.fromJS(state).merge({
        WinStop: action.WinStop
      }).toJS()
    case 'SET_SLIDERVALUE':
      return Immutable.fromJS(state).merge({
        SliderValue: action.SliderValue
      }).toJS()
    case 'SET_ORDERMONEY':
      return Immutable.fromJS(state).merge({
        OrderMoney: action.OrderMoney
      }).toJS()
    case 'SET_XCSHENGXIAO':
      return Immutable.fromJS(state).merge({
        XCShengxiao: action.XCShengxiao
      }).toJS()
    case 'SET_XCWEISHU':
      return Immutable.fromJS(state).merge({
        XCWeishu: action.XCWeishu
      }).toJS()
    case 'SET_QUICKMONEY':
      return Immutable.fromJS(state).merge({
        quickMoney: action.quickMoney
      }).toJS()
    case 'SET_ORDERCONFIRM':
      return Immutable.fromJS(state).merge({
        OrderConfirm: action.OrderConfirm
      }).toJS()
    case 'SET_SHOWBETCONFIRM':
      return Immutable.fromJS(state).merge({
        ShowBetConfirm: action.ShowBetConfirm
      }).toJS()
    default:
      return state
  }
}

export default lhcBetData
