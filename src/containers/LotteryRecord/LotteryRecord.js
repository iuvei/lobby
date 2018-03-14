import React from 'react'
import Immutable from 'immutable'
import BallMagic from '../../components/LotteryRecord/BallMagic'
import { BALLS } from '../../components/common/Balls.jsx'
import { COLOR } from '../../components/PCDD/PCDDColor.js'
import { fetchUtil } from '../../helpers/utils'

export default class LotteryRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayIssue: 'one',
      lastIssue: null,
      recentlyIssue: null
    }
    this.getRecentRecord = this.getRecentRecord.bind(this)
    this.isSpollingRecentRecord = false
    this.unmount = false
  }


  componentWillMount() {
    this.getRecentRecord(this.props.lotteryId, this.props.lastIssueNo)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastIssueNo !== nextProps.lastIssueNo) {
      this.isSpollingRecentRecord = false
      clearInterval(this.spollingRR)
      this.getRecentRecord(nextProps.lotteryId, nextProps.lastIssueNo)
    }

    if (nextProps.lotteryId !== this.props.lotteryId) {
      clearInterval(this.spollingRR)
      this.setState({
        lastIssue: null,
        recentlyIssue: null
      })
      this.isSpollingRecentRecord = false
      this.getRecentRecord(nextProps.lotteryId, nextProps.lastIssueNo)
    }
  }

  componentWillUnmount() {
    this.unmount = true
    clearInterval(this.spollingRR)
  }

  getRecentRecord(lotteryId, lastIssueNo) {
    if (this.unmount) {
      clearInterval(this.spollingRR)
      return false
    }
    return fetchUtil({act: 205, lottery_id: lotteryId})
    .then((res) => {
      if (this.unmount) {
        clearInterval(this.spollingRR)
        return false
      }
      if (res) {
        let resData = Immutable.fromJS(res).toJS()
        if (lastIssueNo && lastIssueNo !== res.last_issue.issue_no) {
          resData['last_issue'] = {
            issue_no: lastIssueNo,
            prize_num: ''
          }
        }
        if (resData.last_issue.prize_num === '' && !this.isSpollingRecentRecord) {
          this.spollingRR = setInterval(this.getRecentRecord.bind(this, lotteryId, lastIssueNo), 15000)
          this.isSpollingRecentRecord = true
        }
        if (resData.last_issue.prize_num !== '' && this.isSpollingRecentRecord) {
          clearInterval(this.spollingRR)
          this.isSpollingRecentRecord = false
        }
        if (!this.state.lastIssue || resData.last_issue.prize_num !== this.state.lastIssue.prize_num
            || resData.last_issue.issue_no !== this.state.lastIssue.issue_no) {
          this.setState({
            lastIssue: resData.last_issue,
            recentlyIssue: resData.recently_issue
          })
        }
      }
    }).catch((err) => {
      setTimeout(this.getRecentRecord.bind(this, lotteryId, lastIssueNo), 5000)
      console.log(err)
    })
  }

  handleDisplayRecord(periods, event) {
    this.setState({
      displayIssue: periods
    })
  }

  render() {
    const { categoryId, lotteryId, shengXiao } = this.props
    let { lastIssue, recentlyIssue } = this.state


    return (
      <div className="lottery-record animated fadeInRightBig">
        <div className="record">
          <div  style={this.state.displayIssue === 'one' ? {display: 'block'} : {display: 'none'}}>
            <div className="one_issue">
              第<span>{lastIssue ? lastIssue.issue_no : '00000000000'}</span>期
            </div>
            {
              !!lastIssue && (
                <BallMagic shengXiao={shengXiao} lastIssue={lastIssue} categoryId={categoryId} lotteryId={lotteryId}/>
              )
            }
          </div>
          <div className="five-group" style={this.state.displayIssue === 'five' ? {display: 'flex'} : {display: 'none'}}>
          {
            recentlyIssue ? recentlyIssue.map((item, index) =>
              <div className="group" key={index}>
                <span className="five_issue">第<span>{item.issue_no}</span>期：</span>
                {
                  item.prize_num ? (
                    categoryId === 6 ? (
                      <div className="lucky-reacords">
                        <div>{item.prize_num.split(',')[0]}</div>
                        <span>+</span>
                        <div>{item.prize_num.split(',')[1]}</div>
                        <span>+</span>
                        <div>{item.prize_num.split(',')[2]}</div>
                        <span>=</span>
                        <div style={COLOR[161+ Number(item.prize_num.split(',')[3])]}>{item.prize_num.split(',')[3]}</div>
                      </div>

                    ) : (
                      item.prize_num.split(',').map((num, index) =>
                        <div key={index} className={`ball ${lotteryId === 20 || lotteryId === 26 || lotteryId === 27 || lotteryId === 28 ? 'iconfont lhc-record' : null}`}
                          style={
                            lotteryId === 20 || lotteryId === 26 || lotteryId === 27 || lotteryId === 28 ?
                            Object.assign({}, BALLS[num], {width: '20px', height: '20px', lineHeight: '20px', fontSize: '0.7rem'}) : null
                          }>
                          {num}
                        </div>
                      )
                    )
                  ) : null
                }
              </div>
            ) : null

          }
          </div>
        </div>
        <div className="issue-select">
          <button
            className={this.state.displayIssue === 'one' ? 'btn active' : 'btn'}
            onClick={this.handleDisplayRecord.bind(this, 'one')}
            >
            近一期
          </button>
          <button
            className={this.state.displayIssue === 'five' ? 'btn active' : 'btn'}
            onClick={this.handleDisplayRecord.bind(this, 'five')}
            >
            近五期
          </button>
        </div>
      </div>
    )
  }
}
