const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return Object.assign({}, state, {
        userName: action.userInfo.user_name,
        realName: action.userInfo.realname,
        accountBalance: action.userInfo.account_balance
      })
    case 'CLEAR_USER_INFO':
      return {}
    default:
      return state;
  }

}


export default userInfo;
