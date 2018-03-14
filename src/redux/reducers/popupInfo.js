const popupInfo = (state = {}, action) => {
  switch (action.type) {
    case 'POPUP_CANCEL':
      return {}
    case 'SET_POPUP_INFO':
      return Object.assign({}, {
        type: action.info.type,
        title: action.info.title,
        content: action.info.content,
        autoShutDown: action.info.autoShutDown,
        action: action.info.action,
        cancel: action.info.cancel,
        callBack: action.callBack
      })
    default:
      return state;
  }
}

export default popupInfo;
