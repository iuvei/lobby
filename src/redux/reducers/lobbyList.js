const lobbyList = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOBBY_LIST':
      return [ ...action.lobbyList ]
    default:
      return state
  }

}

export default lobbyList
