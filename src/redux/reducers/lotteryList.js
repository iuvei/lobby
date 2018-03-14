const lotteryList = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOTTERY_LIST':
      return [ ...action.lotteryList ]
    default:
      return state;
  }

}


export default lotteryList;
