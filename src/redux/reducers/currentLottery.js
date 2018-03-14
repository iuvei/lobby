const currentLottery = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LOTTERY_INFO':
      return Object.assign({}, state, {
        lotteryId: action.currentLottery.lottery_id,
        lotteryName: action.currentLottery.lottery_name,
        lotteryImg: action.currentLottery.lottery_image,
        categoryId: action.currentLottery.category_id,
        layout: action.currentLottery.layout,
        shengXiao: action.currentLottery.sx_list,
        typeList: action.currentLottery.type_list,
        lotteryInfo: action.currentLottery.lottery_info
      })
    case 'SET_NEWLOTTERY_INFO':
      return Object.assign({}, state, {
        lotteryId: Number(action.currentLottery.data.lotteryId),
        lotteryName: action.currentLottery.data.lotteryName,
        lotteryImg: action.currentLottery.data.lotteryImage,
        categoryId: action.currentLottery.data.categoryId,
        typeList: action.currentLottery.data.playInfo,
      })
    case 'SET_ANIMALS':
      return Object.assign({}, state, {
        wuxing: action.wuxing,
        newAnimals: action.newAnimals,
        xiaobo: action.xiaobo
      })
    case 'SET_CURRENT_ISSUE':
      return Object.assign({}, state, {
        currentIssue: action.issue
      })
    case 'SET_LAYOUT':
      return Object.assign({}, state, {
        layout: action.layout
      })
    case 'ODD_SET':
      return Object.assign({}, state, {
        odds: action.odds
      })
    case 'CLEAR_CURRENT_LOTTERY':
      return {}
    default:
      return state
  }
}

export default currentLottery
