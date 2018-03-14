const planList = (state = [], action) => {
  switch (action.type) {
    case 'INIT_PLAN':
      let issueList = action.issueList
      for (let plan of issueList) {
        plan.multiple = action.multiple
      }
      return [
        ...issueList
      ]
    case 'MODIFY_MULTIPLE':
      return [
        ...state.slice(0, action.index),
        {...state[action.index], multiple: action.multiple},
        ...state.slice(action.index + 1)
      ]
    case 'MODIFY_CHECKED':
      return [
        ...state.slice(0, action.index),
        {...state[action.index], checked: action.checked},
        ...state.slice(action.index + 1)
      ]
    case 'INIT_ADVANCED_PLAN_ONE':
      issueList = action.issueList
      let startMultiple = action.startMultiple
      let interval = action.interval
      let intervalMultiple = action.intervalMultiple
      let multiple = startMultiple
      for (let i = 0; i < issueList.length; i++) {
        if (i !== 0 && (i % interval) === 0) {
          multiple = multiple * intervalMultiple
        }
        issueList[i].multiple = multiple
      }
      return [
        ...issueList
      ]
    case 'INIT_ADVANCED_PLAN_TWO':
      issueList = action.issueList
      startMultiple = action.startMultiple
      let beforeChase = action.beforeChase
      let afterMultiple = action.afterMultiple
      for (let i = 0; i < issueList.length; i++) {
        if (i < beforeChase) {
          issueList[i].multiple = startMultiple
        } else {
          issueList[i].multiple = afterMultiple
        }
      }
      return [
        ...issueList
      ]
    case 'RESET_PLAN_LIST':
        return []
    default:
      return state
  }

}


export default planList
