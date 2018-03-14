const issueList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ISSUE_LIST':

      return [ ...action.issueList ]
    default:
      return state;
  }

}


export default issueList;
