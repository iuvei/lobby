const sysInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_LOADING':
      return Object.assign({}, state, {
        showLoading: action.showLoading
      })
    default:
      return state;
  }

}


export default sysInfo;
