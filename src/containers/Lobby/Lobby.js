import React from 'react'
import { connect } from 'react-redux'
import LobbyItem from '../../components/Lobby/LobbyItem'
import Spinner from '../../components/common/Spinner'
import { fetchUtil } from '../../helpers/utils'
import { clearCurrentLottery } from '../../redux/actions/index'

class LotteryLobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lobbyList: [],
      delay: 0
    }
    this.getLobbyList = this.getLobbyList.bind(this)
  }

  componentDidMount() {
    this.getLobbyList()
    this.props.clearCurrentLottery()
  }

  getLobbyList() {
    let startTime = new Date().getTime()
    fetchUtil({act: 207})
    .then((res) => {
      if (res) {
        let endTime = new Date().getTime()
        let timeDifference = endTime - res[0].now_time * 1000
        this.setState({
          lobbyList: res,
          delay: endTime - startTime,
          timeDifference
        })
      }
    })
  }

  render() {
    let lobbyList = this.state.lobbyList
    if (lobbyList && lobbyList.length > 0) {
      lobbyList = lobbyList.concat('', '', '', '', '')
    }

    return (
      <div className="lottery-lobby">
      {
        lobbyList && Array.isArray(lobbyList) && lobbyList.length > 0 ?
        lobbyList.map((item, index) =>{
          if (item) {
            return (
              <LobbyItem
                key={index}
                data={item}
                delay={this.state.delay}
                timeDifference={this.state.timeDifference}/>
            )
          } else {
            return <div key={index} className="lobby-item-placeholder"></div>
          }
        }) : ( <Spinner /> )
      }
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentLottery: () => {
      dispatch(clearCurrentLottery())
    }
  }
}

export default connect(null, mapDispatchToProps)(LotteryLobby)
