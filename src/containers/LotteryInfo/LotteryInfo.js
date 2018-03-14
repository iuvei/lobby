import React from 'react'
import LotteryRecord from '../LotteryRecord/LotteryRecord'
import { fetchUtil } from '../../helpers/utils'

export default class LotteryInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issue: '00000000',
      remainingHours: '00',
      remainingMinutes: '00',
      remainingSeconds: '00',
      timeReminder: '未开盘：',
      refreshLotteryRecord: false,
      lastIssueNo: ''
    }
    this.issue = '00000000'
    this.endTime = ''

    this.isSpollingTick = false

    this.getBetTime = this.getBetTime.bind(this)
    this.unmount = false
    this.tick = this.tick.bind(this)
    this.timeoutTick = null
    this.fetchDelayTime = 0
  }

  componentDidMount() {
    this.getBetTime(this.props.lotteryId)
  }

  componentWillUnmount() {
    this.unmount = true
    clearInterval(this.intervalTick)
    !!this.timeoutTick && clearTimeout(this.timeoutTick)

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentLottery.lotteryId !== this.props.currentLottery.lotteryId) {
      clearInterval(this.intervalTick)
      this.getBetTime(nextProps.currentLottery.lotteryId)
    }
  }

  getBetTime(lotteryId) {
    !!this.intervalTick && clearInterval(this.intervalTick)
    !!this.timeoutTick && clearTimeout(this.timeoutTick)

    let startTime = new Date().getTime()
    fetchUtil({act: 206, lottery_id: lotteryId})
    .then((res) => {
      if (this.unmount) {
        clearInterval(this.intervalTick)
        return false
      }
      if (res) {
        if (this.issue !== res.issue_no || this.endTime !== res.end_time * 1000) {
          this.props.setCurrntIssue(res.issue_no)
          this.issue = res.issue_no
          this.endTime = res.end_time * 1000
          let endTime = new Date().getTime()
          let delay = endTime - startTime
          let timeDifference = endTime - res.now_time * 1000
          // this.tick(res.end_time * 1000 - delay, timeDifference)
          this.intervalTick = setInterval(this.tick.bind(this, res.end_time * 1000 - delay, timeDifference), 1000)
        } else {
          this.timeoutTick = setTimeout(this.getBetTime.bind(this, lotteryId), 15000)
        }
      }
    }).catch((err) => {
      this.timeoutTick = setTimeout(this.getBetTime.bind(this, lotteryId), 15000)
      console.log(err)
    })
  }

  tick(closeTime, timeDifference) {
    if (this.unmount) {
      clearInterval(this.intervalTick)
      return false
    }
    let currentTime = new Date().getTime() - timeDifference
    if (currentTime < closeTime) {
      this.fetchDelayTime = 0
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
      if (this.state) {
        this.setState({
          remainingHours: hours,
          remainingMinutes: minutes,
          remainingSeconds: seconds,
          timeReminder: '已开盘，欢迎投注。距离关盘还有：'
        })
      }

    } else {
      clearInterval(this.intervalTick)
      clearTimeout(this.timeoutTick)
      this.timeoutTick = setTimeout(this.getBetTime.bind(this, this.props.lotteryId), this.fetchDelayTime)
      this.fetchDelayTime += 2000
      // this.getBetTime(this.props.lotteryId)
      this.setState({
        remainingHours: '00',
        remainingMinutes: '00',
        remainingSeconds: '00',
        timeReminder: '未开盘：',
        lastIssueNo: this.issue
      })
      const { resetIssueList, clearBetInfo, setPopupInfo } = this.props
      resetIssueList()
      if (clearBetInfo) {
        let info = {
          type: 'WARN',
          title: '温馨提示',
          content: '当前期已结束，是否要清除已投注内容？',
          autoShutDown: '取消',
          action: {
            '确定': 'clearBetInfo',
            '取消': 'cancel',
          }
        }
        setPopupInfo(info)
      }
      return false
    }
  }

  render() {
    const { lotteryId, lotteryName, lotteryImg, categoryId, newAnimals, shengXiao } = this.props.currentLottery
    const { lastIssueNo } = this.state
    return (
      <div className="announcement">
        <div className="currentLottery animated fadeInLeftBig" >
          <div className="lottery_logo">
            <img src={lotteryImg} alt="logo"/>
          </div>
          <div className="lottery_info">
            <div className="lottery_name">{lotteryName}</div>
            <div className="issue">第 <span>{this.issue}</span> 期</div>
            <div className="btn">
              <button>
                <i className="iconfont">&#xe6f8;</i>
                {/*<a href={`/charts/lottery/lid/${lotteryId}.html`} target="_blank">*/}
                <a href={`/#chartsLottery?lottery_id=${lotteryId}`} target="_blank">
                  号码走势
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="lottery-time animated fadeInDownBig">
          <div className="prompt">{this.state.timeReminder}</div>
          <div className="timer">
            <div className="board">{this.state.remainingHours}</div>
            <div className="splice">
              <img src={require('../../styles/img/cd_splice.png')} alt=":"/>
            </div>
            <div className="board">{this.state.remainingMinutes}</div>
            <div className="splice">
              <img src={require('../../styles/img/cd_splice.png')} alt=":"/>
            </div>
            <div className="board">{this.state.remainingSeconds}</div>
          </div>
        </div>
        <LotteryRecord
          lastIssueNo={lastIssueNo}
          shengXiao={newAnimals || shengXiao}
          lotteryId={lotteryId}
          categoryId={categoryId}/>
      </div>
    )
  }
}
