import { randomOrder, getSelectContent, fetchUtil } from '../../helpers/utils'
import Immutable from 'immutable'
import { NUMS } from '../../helpers/utils'
import history from '../../helpers/history'

export const SetBetData = (betData) => {
  return {
    type: 'SET_BETDATA',
    betData
  }
}

export const SetPlayWay = (playWay) => {
  return {
    type: 'SET_PLAYWAY',
    playWay
  }
}

export const SetGridData = (gridData) => {
  return {
    type: 'SET_GRIDDATA',
    gridData
  }
}

export const SetOrderConfirm = (OrderConfirm) => {
  return {
    type: 'SET_ORDERCONFIRM',
    OrderConfirm
  }
}

export const SetShowBetConfirm = (ShowBetConfirm) => {
  return {
    type: 'SET_SHOWBETCONFIRM',
    ShowBetConfirm
  }
}

export const setWinStop = (WinStop) => {
  return {
    type: 'SET_WINSTOP',
    WinStop
  }
}

export const SetquickMoney = (quickMoney) => {
  return {
    type: 'SET_QUICKMONEY',
    quickMoney
  }
}

export const SetTabIndex = (tabIndex) => (dispatch, getState) => {
  const id = getState().lhcBetData.playWay.id
  let size = 2
  switch (id) {
    case '49':
      if (tabIndex === 0) { //二连肖
        size = 2
      } else if (tabIndex === 1) { // 三
        size = 3
      } else if (tabIndex === 2) { // 四
        size = 4
      } else if (tabIndex === 3) { // 五
        size = 5
      } else if (tabIndex === 4) { // 二连尾
        size = 2
      } else if (tabIndex === 5) {
        size = 3
      } else if (tabIndex === 6) {
        size = 4
      } else if (tabIndex === 7) {
        size = 5
      }
      break;
    case '50':
      if (tabIndex === 0) { // 五选不中
        size = 5
      } else if (tabIndex === 1) {
        size = 6
      } else if (tabIndex === 2) {
        size = 7
      } else if (tabIndex === 3) {
        size = 8
      } else if (tabIndex === 4) {
        size = 9
      } else if (tabIndex === 5) {
        size = 10
      } else if (tabIndex === 6) {
        size = 11
      } else if (tabIndex === 7) {
        size = 12
      }
      break;
    case '56':
      if (tabIndex === 0) { // 五中一
        size = 5
      } else if (tabIndex === 1) {
        size = 6
      } else if (tabIndex === 2) {
        size = 7
      } else if (tabIndex === 3) {
        size = 8
      } else if (tabIndex === 4) {
        size = 9
      } else if (tabIndex === 5) {
        size = 10
      } else if (tabIndex === 6) {
        size = 11
      }
      break;
    case '48':
      if (tabIndex === 0) { // 连码
        size = 4
      } else if (tabIndex === 1 || tabIndex === 2) {
        size = 3
      } else if (tabIndex === 3 || tabIndex === 4 || tabIndex === 5) {
        size = 2
      }
      break;
    default:
      size = 2
  }
  dispatch(dispatchTab(tabIndex, size))
}

const dispatchTab = (tabIndex, size) => {
  return {
    type: 'SET_TABINDEX',
    tabIndex,
    size
  }
}

export const SetSubTabIndex = (subTabIndex) => {
  return {
    type: 'SET_SUBTABINDEX',
    subTabIndex
  }
}

export const SetXCShengxiao = (XCShengxiao) => {
  return {
    type: 'SET_XCSHENGXIAO',
    XCShengxiao
  }
}

export const SetXCWeishu = (XCWeishu) => {
  return {
    type: 'SET_XCWEISHU',
    XCWeishu
  }
}

export const SetMultiple = (lhcMultiple) => {
  return {
    type: 'SET_LHCMULTIPLE',
    lhcMultiple
  }
}

export const SetSliderValue = (SliderValue) => {
  return {
    type: 'SET_SLIDERVALUE',
    SliderValue
  }
}

export const SetOrderMoney = (OrderMoney) => {
  return {
    type: 'SET_ORDERMONEY',
    OrderMoney
  }
}

export const SetTotalCost = (totalCost) => {
  return {
    type: 'SET_TOTALCOST',
    totalCost
  }
}

export const SetChaseState = (chaseState) => (dispatch, getState) => {
  if (!chaseState) {
    dispatch(setIssueList([]))
    dispatch(setPlanList([]))
  }
  dispatch(setChaseStateTo(chaseState))
}

const setChaseStateTo = (chaseState) => {
  return {
    type: 'SET_CHASESTATE',
    chaseState
  }
}

export const SetCurrentBetData = (currentBetData) => {
  return {
    type: 'SET_CBETDATA',
    currentBetData,
  }
}

export const SetShowBetData = (showBetData) => {
  return {
    type: 'SET_SHOWBETDATA',
    showBetData
  }
}

export const register = (data, callBack) => (dispatch, getState) => {
  return fetchUtil({
    act: 211,
    reg_code: data.invitationcode,
    user_name: data.userName,
    password: data.pwd,
    re_password: data.confirmPwd,
    verify_code: data.verfyCode,
    user_email: data.email,
    user_mobile: data.phoneNum,
    auto_login: 1
  })
  .then((res) => {
    let info = {}
    if (res.status === 0) {
      info = {
        type: 'SUCCESS',
        title: '温馨提示',
        content: res.message,
        cancel: 'registerSuccess',
        action: {
          '确定': 'registerSuccess'
        }
      }
      dispatch(setUserInfo({
        user_name: res.user_name,
        realname: res.realname,
        account_balance: res.account_balance
      }))

    } else {
      info = {
        type: 'WARN',
        title: '温馨提示',
        content: res.message,
        action: {
          '确定': 'cancel'
        }
      }
      callBack()
    }

    dispatch(setPopupInfo(info))
  })
}


export const registerFreeTrial = (userName, pwd, confirmPwd, verfyCode, callBack) => (dispatch, getState) => {
  return fetchUtil({
    act: 213,
    user_name: userName,
    password: pwd,
    re_password: confirmPwd,
    verify_code: verfyCode,
    auto_login: 1
  })
  .then((res) => {
    let info = {}
    if (res.status === 0) {
      info = {
        type: 'SUCCESS',
        title: '温馨提示',
        content: res.message,
        cancel: 'registerSuccess',
        action: {
          '确定': 'registerSuccess'
        }
      }
      dispatch(setUserInfo({
        user_name: userName,
        realname: res.realname,
        account_balance: res.account_balance
      }))

    } else {
      info = {
        type: 'WARN',
        title: '温馨提示',
        content: res.message,
        action: {
          '确定': 'cancel'
        }
      }
      callBack()
    }

    dispatch(setPopupInfo(info))
  })
}

export const getUserInfo = () => (dispatch, getState) => {
  return fetchUtil({act: 209})
  .then((res) => {
    if (!res.status || !res.status === 9000003) {
      dispatch(setUserInfo(res))
    }
  })
}

export const logout = () => (dispatch, getState) => {
  dispatch(loading(true))
  return fetchUtil({act: 210})
  .then((res) => {
    if (res && res.status === 0) {
      dispatch(clearUserInfo())
      if (history.location.pathname.indexOf('/Lottery/index/bet') !== -1) {
        dispatch(initPlayWays(String(getState().currentLottery.lotteryId)))
      } else {
        dispatch(loading(false))
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}

export const userLogin = (userName, pwd, verfyCode, callBack) => (dispatch, getState) => {
  dispatch(loading(true))
  fetchUtil({
    act: 208,
    user_name: userName,
    password: pwd,
    verify_code: verfyCode
  })
  .then((res) => {
    if (res.status && res.status !== 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: res.message,
        action: {
          '确定': 'cancel'
        }
      }
      dispatch(loading(false))
      dispatch(setPopupInfo(info))
      if (callBack) {
        callBack(res.status)
      }

    } else {
      dispatch(setUserInfo(res))
      if (history.location.pathname.indexOf('/Lottery/index/bet') !== -1) {
        dispatch(initPlayWays(String(getState().currentLottery.lotteryId)))
        dispatch(SetBetData([]))
      } else {
        dispatch(loading(false))
      }

    }
  })
}

const setUserInfo = (userInfo) => {
  return {
    type: 'SET_USER_INFO',
    userInfo
  }
}

const clearUserInfo = () => {
  return {
    type: 'CLEAR_USER_INFO'
  }
}

export const initLotteryCategory = () => (dispatch, getState) => {
  return fetchUtil({act: 201})
  .then((res) => {
    if (res) {
      dispatch(setLotteryCategory(res))
    }
  })

}

export const initLobbyList = () => (dispatch, getState) => {
  return fetchUtil({act: 207})
  .then((res) => {
    if (res) {
      dispatch(setLobbyList(res))
    }
  })
}

const setLobbyList = (lobbyList) => {
  return {
    type: 'SET_LOBBY_LIST',
    lobbyList
  }
}


const setLotteryCategory = (lotteryList) => {
  return {
    type: 'SET_LOTTERY_LIST',
    lotteryList
  }
}

export const switchPlay = (index) => {
  return (dispatch, getState) => {
    let layout = Immutable.fromJS(getState().currentLottery.layout).toJS()
    layout.filter(n => n.selected)[0].selected = false
    layout[index].selected = true
    dispatch(setLayout(layout))
  }
}

export const setLayout = (layout) => {
  return {
    type: 'SET_LAYOUT',
    layout
  }
}

export const SetSubLayout = (subLayout) => {
  return {
    type: 'SET_SUBLAYOUT',
    subLayout
  }
}

export const oddSet = (odd) => {
  return {
    type: 'ODD_SET',
    odd
  }
}

export const layoutSet = (layout) => {
  return {
    type: 'LAYOUT_SET',
    layout
  }
}

export const setAnimals = (animals) => {
  let newAnimals = {}, wuxing = {}
  animals.sx.map((item, index) =>
    item.nums.map((subItem, index) =>
    newAnimals[`${subItem}`] = item.label)
  )
  animals.wx.map((item, index) =>
    item.nums.map((subItem, index) =>
    wuxing[`${subItem}`] = item.label)
  )
  let xiaobo = [
    [
      {label: '鼠', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '鼠')},
      {label: '牛', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '牛')},
      {label: '虎', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '虎')},
      {label: '兔', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '兔')},
      {label: '龙', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '龙')},
      {label: '蛇', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '蛇')},
      {label: '马', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '马')},
      {label: '羊', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '羊')},
      {label: '猴', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '猴')},
      {label: '鸡', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '鸡')}
    ],
    [
      {label: '狗', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '狗')},
      {label: '猪', nums: Object.keys(newAnimals).filter(n => newAnimals[n] === '猪')},
      {label: '红波', nums: NUMS['hongbo']},
      {label: '绿波', nums: NUMS['lvbo']},
      {label: '蓝波', nums: NUMS['lanbo']},
      {label: '', nums: []},
      {label: '', nums: []},
      {label: '', nums: []},
      {label: '', nums: []},
      {label: '', nums: []}
    ]
  ]
  return {
    type: 'SET_ANIMALS',
    animals,
    newAnimals,
    wuxing,
    xiaobo
  }
}

export const resetOrder = (name, realName, playId, categoryId, lotteryId, amount, total, selected, betNum) => {
    return {
      type: 'RESET_ORDER',
      name,
      realName,
      playId,
      categoryId,
      lotteryId,
      amount,
      total,
      selected,
      betNum
    }
}

export const initPlayWays = (lotteryId) => (dispatch, getState) => {
  dispatch(loading(true))
  if (getState().issueList.length > 0) {
    dispatch(setIssueList([]))
  }
  if (lotteryId === '27' || lotteryId === '28' || lotteryId === '21' || lotteryId === '22') {
    return fetchUtil({act: 306, lottery_id: Number(lotteryId)})
    .then((res) => {
      if (res) {
        Object.assign(res.data, { lotteryId: lotteryId })
        dispatch(clearAllContent())
        dispatch(setNewCurrentLotteryInfo(res))
        dispatch(SetPlayWay(res.data.playInfo[1]))
        dispatch(SetRebate(res.data.rebatePoint))
        dispatch(SetBetData([]))
        dispatch(SetShowBetData({}))
        dispatch(SetCurrentBetData([]))
      }
      dispatch(loading(false))
    })
  } else {
    return fetchUtil({act: 202, lottery_id: Number(lotteryId)})
    .then((res) => {
      if (res) {
        dispatch(clearAllContent())
        // if (playId) {
        //   let layout = res.layout
        //   let playIndex = -1
        //   for (let i = 0; i < layout.length; i++) {
        //     let play = layout[i]
        //     for (let j = 0; j < play.detail.length; j++) {
        //       let methodGroup = play.detail[j]
        //       for (let m = 0; m < methodGroup.method.length; m++) {
        //         let method = methodGroup.method[m]
        //         if (method.play_id === playId) {
        //           playIndex = i
        //           break
        //         }
        //       }
        //     }
        //   }
        //   layout.filter(n => n.selected)[0].selected = false
        //   layout[playIndex].selected = true
        // }
        let selected = res.layout.filter(n => n.selected === true)
        if (selected.length < 1) {
          res.layout[0].selected = true
        }
        dispatch(setCurrentLotteryInfo(res))
      }
      dispatch(loading(false))
    })
  }
}

export const setOrderInfoFromIndex = (orderInfo) => {
  return {
    type: 'SET_ORDER_FROM_INDEX',
    orderInfo
  }
}

const loading = (showLoading) => {
  return {
    type: 'SHOW_LOADING',
    showLoading
  }
}

const setCurrentLotteryInfo = (currentLottery) => {
  return {
    type: 'SET_LOTTERY_INFO',
    currentLottery
  }
}

const SetRebate = (reBate) => {
  return {
    type: 'SET_REBATE',
    reBate
  }
}

const setNewCurrentLotteryInfo = (currentLottery) => {
  return {
    type: 'SET_NEWLOTTERY_INFO',
    currentLottery
  }
}

export const clearCurrentLottery = (currentLottery) => {
  return {
    type: 'CLEAR_CURRENT_LOTTERY'
  }
}

export const selectBet = (order) => {
  return {
    type: 'SELECT_BET',
    order
  }
}

export const inputBet = (order) => {
  return {
    type: 'INPUT_BET',
    order
  }
}

export const betAmount = (amount) => {
  return {
    type: 'BET_AMOUNT',
    amount
  }
}

export const monetaryUnit = (unit) => {
  return {
    type: 'MONETARY_UNIT',
    unit
  }
}

export const checkbookBet = (order) => {
  return {
    type: 'CHECKBOX_BET',
    order
  }
}

export const addOrder = () => {
  return (dispatch, getState) => {
    const orderInfo = getState().orderInfo
    if (orderInfo.total !== 0 && orderInfo.betNum !== 0) {
      dispatch(OrderAdd(orderInfo))
      dispatch(resetOrder())
    } else {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '您还没有选择号码或所选号码不全！',
        action: {
          '确定': 'cancel'
        }
      }
      dispatch(setPopupInfo(info))
    }

  }
}

const OrderAdd = (orderInfo) => {
  return {
    type: 'ADD_ORDER',
    orderInfo
  };
}

export const delOrder = (index) => {
  return {
    type: 'DEL_ORDER',
    index
  }
}

export const modifyAmount = (index, amount) => {
  return {
    type: 'MODIFY_AMOUNT',
    index,
    amount
  }
}

export const modifyUnit = (index, unit) => {
  return {
    type: 'MODIFY_UNIT',
    index,
    unit
  }
}

export const removeAllOrders = () => {
  return {
    type: 'REMOVE_ALL'
  }
}

export const resetIssueList = () => (dispatch, getState) => {
  if (getState().issueList.length > 0) {
    return fetchUtil({
      act: 204,
      lottery_id: getState().currentLottery.lotteryId
    })
    .then((res) => {
      if (res) {
        dispatch(setIssueList(res))
      }
    })
  }
}

export const GetIssueList = () => (dispatch, getState) => {
  return fetchUtil({
    act: 204,
    lottery_id: getState().currentLottery.lotteryId
  })
  .then((res) => {
    if (res) {
      dispatch(setIssueList(res))
    }
  })
}

export const initPlan = (issueCount, multiple) => {
  return (dispatch, getState) => {
    if (!getState().orderList || getState().orderList.length === 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '请先添加投注内容',
        action: {
          '确定': 'cancel'
        }
      }
      return dispatch(setPopupInfo(info))
    }

    let issueList = Immutable.fromJS(getState().issueList).toJS()
    if (issueList.length > 0) {
      dispatch(setPlanList(issueList.slice(0, issueCount), multiple))
    } else {
      return fetchUtil({
        act: 204,
        lottery_id: getState().currentLottery.lotteryId
      })
      .then((res) => {
        if (res) {
          dispatch(setIssueList(res))
          dispatch(setPlanList(res.slice(0, issueCount), multiple))
        }
      })
    }
  }
}

export const initLhcPlan = (issueCount, multiple) => {
  return (dispatch, getState) => {
    if (!getState().lhcBetData.betData || getState().lhcBetData.betData.length === 0) {

      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '请先添加投注内容',
        action: {
          '确定': 'cancel'
        }
      }

      return dispatch(setPopupInfo(info))
    }

    let issueList = Immutable.fromJS(getState().issueList).toJS()
    if (issueList.length > 0) {
      dispatch(setPlanList(issueList.slice(0, issueCount), multiple))
    } else {
      return fetchUtil({
        act: 204,
        lottery_id: getState().currentLottery.lotteryId
      })
      .then((res) => {
        if (res) {
          dispatch(setIssueList(res))
          dispatch(setPlanList(res.slice(0, issueCount), multiple))
        }
      })
    }
  }
}

const setIssueList = (issueList) => {
  return {
    type: 'SET_ISSUE_LIST',
    issueList
  }
}

const setPlanList = (issueList, multiple) => {
  return {
    type: 'INIT_PLAN',
    issueList,
    multiple
  }
}

export const handlePlanChecked = (index, checked) => {
  return {
    type: 'MODIFY_CHECKED',
    index,
    checked
  }
}

export const modifyPlanMultiple = (index, multiple) => {
  return {
    type: 'MODIFY_MULTIPLE',
    index,
    multiple
  }
}

export const initAdvancedPlanOne = (startIssue, issueCount, startMultiple, interval, intervalMultiple) => {
  return (dispatch, getState) => {
    let issueList = Immutable.fromJS(getState().issueList).toJS()
    if (issueList.length > 0) {
      dispatch(setAdvancedPlanListOne(issueList.slice(startIssue,
        parseInt(issueCount, 10) + parseInt(startIssue, 10)), startMultiple, interval, intervalMultiple))
    } else {
      return fetchUtil({
        act: 204,
        lottery_id: getState().currentLottery.lotteryId
      })
      .then((res) => {
        if (res) {
          dispatch(setAdvancedPlanListOne(res.slice(startIssue,
            parseInt(issueCount, 10) + parseInt(startIssue, 10)), startMultiple, interval, intervalMultiple))
        }
      })
    }
  }
}

const setAdvancedPlanListOne = (issueList, startMultiple, interval, intervalMultiple) => {
  return {
    type: 'INIT_ADVANCED_PLAN_ONE',
    issueList,
    startMultiple,
    interval,
    intervalMultiple
  }
}

export const initAdvancedPlanTwo = (startIssue, issueCount, startMultiple, beforeChase, afterMultiple) => {
  return (dispatch, getState) => {
    let issueList = Immutable.fromJS(getState().issueList).toJS()
    if (issueList.length > 0) {
      dispatch(setAdvancedPlanListTwo(issueList.slice(startIssue,
        parseInt(issueCount, 10) + parseInt(startIssue, 10)), startMultiple, beforeChase, afterMultiple))
    } else {
      return fetchUtil({
        act: 204,
        lottery_id: getState().currentLottery.lotteryId
      })
      .then((res) => {
        if (res) {
          dispatch(setAdvancedPlanListTwo(res.slice(startIssue,
            parseInt(issueCount, 10) + parseInt(startIssue, 10)), startMultiple, beforeChase, afterMultiple))
        }
      })
    }
  }
}



const setAdvancedPlanListTwo = (issueList, startMultiple, beforeChase, afterMultiple) => {
  return {
    type: 'INIT_ADVANCED_PLAN_TWO',
    issueList,
    startMultiple,
    beforeChase,
    afterMultiple
  }
}

export const betting = (winStop, callBack) => {
  return (dispatch, getState) => {
    let orderList = getState().orderList
    if (!orderList || orderList.length === 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '请先添加投注内容',
        action: {
          '确定': 'cancel'
        }
      }
      if (callBack) {
        callBack()
      }
      return dispatch(setPopupInfo(info))
    }

    let order_list = [], newOrder = {}
    for (let order of orderList) {
      newOrder = {}
      newOrder.play_id = order.playId
      newOrder.method_name = order.name
      if (order.checked.length > 0) {
        newOrder.position = order.checked.join(",")
      }
      if (order.inputData.length > 0) {
        newOrder.content = order.inputData.join(",")
      } else if (Object.keys(order.selected).length > 0) {
        newOrder.content = getSelectContent(order.playId, order.selected)
      }
      if (order.unit === 'yuan') {
        newOrder.mode = 1
      } else if (order.unit === 'jiao') {
        newOrder.mode = 2
      } else if (order.unit === 'fen') {
        newOrder.mode = 3
      }
      newOrder.point = order.rebate
      newOrder.nums = order.betNum
      newOrder.price = order.amount
      newOrder.money = order.total

      order_list.push(newOrder)
    }

    let planList = getState().planList.filter(n => n.multiple !== 0 && n.checked !== false)
    let plan_list = [], newPlan = {}
    for (let plan of planList) {
      newPlan = {}
      newPlan.issue_no = plan.issue_no
      newPlan.multiple = plan.multiple
      plan_list.push(newPlan)
    }

    return fetchUtil({
      act: 203,
      lottery_id: getState().currentLottery.lotteryId,
      issue_no: getState().currentLottery.currentIssue,
      order_list,
      plan_list,
      win_stop: winStop
    })
    .then((res) => {
      if (res) {
        if (res.status === 0) {
          let info = {
            type: 'SUCCESS',
            title: '温馨提示',
            cancel: 'resetOrderList',
            content: res.message,
            autoShutDown: '确定',
            action: {
              '确定': 'resetOrderList'
            }
          }
          dispatch(getUserInfo())
          dispatch(setPopupInfo(info))
        } else {
          let info = {
            type: 'ERROR',
            title: '温馨提示',
            content: res.message,
            action: {
              '确定': 'cancel'
            }
          }
          dispatch(setPopupInfo(info))
        }
      }
      if (callBack) {
        callBack()
      }
    })
  }
}

export const modifyOddsRebate = (currentOdds, rebate) => {
  return {
    type: 'MODIFY_ODDS_REBATE',
    currentOdds,
    rebate
  }
}

export const randomGenerationBet = (betNum, currentMethod) => {
  return (dispatch, getState) => {
    const { orderInfo } = getState()
    let orderList = []
    for (let i = 0; i < betNum; i++) {
      let random = Object.assign({}, orderInfo, randomOrder(currentMethod, orderInfo))

      orderList.push(random)
    }
    return dispatch(addRandomOrder(orderList))
  }
}

const addRandomOrder = (orderList) => {
  return {
    type: 'ADD_RANDOM_ORDER',
    orderList
  }
}

export const setPopupInfo = (info, callBack) => {
  return {
    type: 'SET_POPUP_INFO',
    info,
    callBack
  }
}

export const popupAction = (action, callBack) => (dispatch, getState) => {
  if (action === 'resetOrderList') {
    dispatch(removeAllOrders())
    if (getState().planList.length > 0) {
      dispatch(resetPlanList())
    }
  } else if (action === 'clearBetInfo') {
    dispatch(clearAllContent())
  } else if (action === 'registerSuccess') {
    if (history.location.pathname.indexOf('/Lottery/index/bet') !== -1) {
      dispatch(initPlayWays(String(getState().currentLottery.lotteryId)))
    }
  } else if (action === 'callBack') {
    callBack()
  }

  dispatch(popupCancel()) //cancel

  if (getState().sysInfo.showLoading) {
    dispatch(loading(false))
  }

}

const clearAllContent = () => (dispatch, getState) => {
  dispatch(resetOrder())
  if (getState().orderList.length > 0) {
    dispatch(removeAllOrders())
  }
  if (getState().planList.length > 0) {
    dispatch(resetPlanList())
  }
}

const popupCancel = () => {
  return {
    type: 'POPUP_CANCEL'
  }
}

export const resetPlanList = () => {
  return {
    type: 'RESET_PLAN_LIST'
  }
}

export const setCurrntIssue = (issue) => {
  return {
    type: 'SET_CURRENT_ISSUE',
    issue
  }
}
