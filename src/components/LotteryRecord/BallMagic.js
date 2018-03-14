import React from 'react'
import { BALLS } from '../common/Balls.jsx'
import { COLOR } from '../PCDD/PCDDColor.js'

export default class BallMagic extends React.Component {
  constructor(props) {
    super(props)
    let ballList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const { lastIssue } = this.props
    if (lastIssue && lastIssue.prize_num) {
      ballList = lastIssue.prize_num.split(',')
    }
    this.state = {
      ballList
    }
    this.isSpolling = false
  }

  componentWillMount() {
    let lastIssue = this.props.lastIssue
    let ballList = []
    if (lastIssue && lastIssue.prize_num) {
      ballList = lastIssue.prize_num.split(',')
      this.setState({
        ballList
      })
    } else {
      this.intervalBallList = setInterval(this.setBallList.bind(this), 100)
      this.isSpolling = true
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastIssue !== this.props.lastIssue) {
      let lastIssue = nextProps.lastIssue
      let ballList = []
      if (lastIssue && lastIssue.prize_num) {
        clearInterval(this.intervalBallList)
        this.isSpolling = false
        ballList = lastIssue.prize_num.split(',')
        this.setState({
          ballList
        })
      } else {
        if (!this.isSpolling) {
          this.intervalBallList = setInterval(this.setBallList.bind(this), 100)
          this.isSpolling = true
        }

      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalBallList)
  }

  setBallList() {
    const lotteryId = String(this.props.lotteryId)
    const categoryId = String(this.props.categoryId)
    let ballList = []
    if (lotteryId === '20' || lotteryId === '26' || lotteryId === '27' || lotteryId === '28') {
      ballList = this.randomBall(49, 1, 7, true)
    } else if (categoryId === '1') {
      ballList = this.randomBall(9, 0, 5, false)
    } else if (categoryId === '2') {
      ballList = this.randomBall(6, 1, 3, false)
    } else if (categoryId === '3') {
      ballList = this.randomBall(11, 1, 5, true)
    } else if (categoryId === '4') {
      ballList = this.randomBall(9, 0, 3, false)
    } else if (categoryId === '5') {
      ballList = this.randomBall(10, 1, 10, true)
    } else if (categoryId === '6') {
      ballList = this.randomBall(9, 0, 3, false)
    }

    this.setState({
      ballList
    })
  }

  randomBall(max, min, digit, isDouble) {
    let ballList = []
    let i = 0
    while(i < digit) {
      let num = Math.round(Math.random() * (max - min) + min)
      if (isDouble && num.toString().length !== 2) {
        num = '0' + num
      }
      if (!ballList.includes(num)) {
        ballList.push(num)
        i++
      }
    }
    return ballList
  }

  render() {
    const { categoryId, lotteryId, shengXiao } = this.props
    let ballList = this.state.ballList
    return (
      <div className="ball-magic">
      {
        String(categoryId) === '6' ? (
          <div className="lucky-reacords">
            <div>{ballList[0]}</div>
            <span>+</span>
            <div>{ballList[1]}</div>
            <span>+</span>
            <div>{ballList[2]}</div>
            <span>=</span>
            <div style={COLOR[161 + Number(ballList[0]) + Number(ballList[1]) + Number(ballList[2])]}>
              {Number(ballList[0]) + Number(ballList[1]) + Number(ballList[2])}
            </div>
          </div>
        ) : (
          ballList.map((item, index) => {
            let numStyle = {}
            if (ballList.length > 5) {
              numStyle = {
                width: '24px',
                height: '24px',
                fontSize: '0.875rem',
                lineHeight: '24px'
              }
            }
            if (lotteryId === 20 || lotteryId === 26 || lotteryId === 27 || lotteryId === 28) {
              numStyle = Object.assign({}, numStyle, BALLS[item])
            }
            return (
              <div className={(lotteryId === 20 || lotteryId === 26 || lotteryId === 27 || lotteryId === 28) ? 'iconfont lhc-record' : undefined } key={index}
                style={ballList.length > 5 ? {marginRight: '5px'} : null}>
                <div style={numStyle}>
                  {item}
                </div>
                {
                  (lotteryId === 20 || lotteryId === 26 || lotteryId === 27 || lotteryId === 28) && shengXiao && <label>{shengXiao[item]}</label>
                }
              </div>
            )
          })
        )

      }
      </div>
    )
  }

}
