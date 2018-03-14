import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Immutable from 'immutable'
import { fetchUtil } from '../../helpers/utils'


export default class LobbyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingTime: '00:00:00',
      data: props.data,
      delay: props.delay
    }
    this.isSpollingTick = false
    this.isSpollingLR = false
    this.firstGetTime = true
    this.incrementTime = 5000
    this.timeoutLobbyItem = -1
  }

  componentWillMount() {
    const { data } = this.props
    if (data.end_time) {
      this.tick.bind(this)
      this.intervalTick = setInterval(this.tick.bind(this), 1000)
      this.isSpollingTick = true
    }

    if (!data.last_prize_num) {
      this.isSpollingLR = true
      this.intervalLotteryRecord = setInterval(this.getLobbyItem.bind(this, data.lottery_id), 15000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalTick)
    clearInterval(this.intervalLotteryRecord)
    clearTimeout(this.timeoutLobbyItem)
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.isSpollingTick && (nextState.data && !Immutable.is(nextState.data, this.state.data))) {
      clearInterval(this.intervalTick)
      this.intervalTick = setInterval(this.tick.bind(this), 1000)
      this.isSpollingTick = true
    }

    if (!this.isSpollingLR && (nextState.data &&!nextState.data.last_prize_num)) {
      this.isSpollingLR = true
      this.intervalLotteryRecord = setInterval(this.getLobbyItem.bind(this, nextState.data.lottery_id), 15000)
    }

    if (nextState.data && nextState.data.last_prize_num) {
      this.isSpollingLR = false
      clearInterval(this.intervalLotteryRecord)
    }

  }

  getLobbyItem(lotteryId) {
    let startTime = new Date().getTime()
    fetchUtil({act: 207, lottery_id: lotteryId})
    .then((res) => {
      if (res) {
        let endTime = new Date().getTime()
        let delay = endTime - startTime
        let timeDifference = endTime - res.now_time * 1000
        this.setState({
          data: res,
          delay,
          timeDifference
        })
      }
    })
  }

  tick() {
    let data = this.state.data || this.props.data
    let delay = this.state.delay || this.props.delay
    let timeDifference = this.state.timeDifference || this.props.timeDifference
    let currentTime = new Date().getTime() - timeDifference
    let closeTime = data.end_time * 1000 - delay
    if (currentTime < closeTime) {
      this.firstGetTime = true
      this.incrementTime = 5000
      let second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24
      let distance = closeTime - currentTime
      let days = Math.floor(distance / day)
      let hours = Math.floor((distance % day) / hour)
      let minutes = Math.floor((distance % hour) / minute)
      let seconds = Math.floor((distance % minute) / second)

      hours = days * 24 + hours
      if(hours < 10) {
        hours = '0' + hours
      }

      if(minutes < 10) {
        minutes = '0' + minutes
      }

      if(seconds < 10) {
        seconds = '0' + seconds
      }

      this.setState({
        remainingTime: `${hours}:${minutes}:${seconds}`
      })
    } else {
      this.isSpollingLR = false
      clearInterval(this.intervalLotteryRecord)
      this.isSpollingTick = false
      clearInterval(this.intervalTick)
      if (this.firstGetTime) {
        this.firstGetTime = false
        this.getLobbyItem(data.lottery_id)
      } else {
        let delay = this.incrementTime + Math.random() * 3000
        this.timeoutLobbyItem = setTimeout(() => {
          this.incrementTime += 5000
          this.getLobbyItem(data.lottery_id)
        }, delay)
      }

      this.setState({
        remainingTime: '00:00:00'
      })
      return false
    }

  }

/*eslint-disable */
  render() {
    let data = this.state.data || this.props.data

    return(
      <div className="lobby-item">
        <div className="detal">
          <div className="info">
            <img src={data.lottery_image} alt="logo"/>
            <div className="ct">
              <div className="lottery-name">
                {data.lottery_name}
              </div>
              <div className="issue-cd">
                <div className="">
                {`第${data.curr_issue_no}期`}
                </div>
                <div>
                {this.state.remainingTime}
                </div>
              </div>
            </div>
          </div>
          <div className="results">
            <span>上期开奖</span>
            {
              data.last_prize_num ? data.last_prize_num.split(',').map((num, index) => {
                let numClass = "ball"
                if (data.last_prize_num.split(',').length > 5) {
                  numClass = "sBall"
                }
                return (
                  <div key={index} className={numClass}>{num}</div>
                )
              }) : <div className="inLottery">正在开奖</div>
            }
          </div>
        </div>
        <div className="bottom">
          <a className="fun" href="javascript: void(0)" onClick={() => {
              // window.open(`/Charts/lottery/id/${data.lottery_id}.html`, 'home', null, true).focus()
            window.open(`/#chartsLottery?lottery_id=${data.lottery_id}`, 'home', null, true).focus()
            }}>
            <i className="iconfont" style={{color: '#F84D4D', fontSize: '20px'}}>&#xe6f8;</i>
            <span>号码走势</span>
          </a>
          <a className="fun" href="javascript: void(0)" onClick={() => {
              window.open(`/#playMethod?lottery_id=${data.lottery_id}`, 'home', null, true).focus()
            }}>
            <i className="iconfont" style={{color: '#60C78C', fontSize: '20px'}}>&#xe64d;</i>
            <span>玩法规则</span>
          </a>
          <Link
            className="bet-btn"
            to={`/Lottery/index/bet/${data.lottery_id}`}>
            立即投注
          </Link>
        </div>

      </div>
    )
  }
/*eslint-disable */
}
