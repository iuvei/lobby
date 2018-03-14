import React, { Component } from 'react'
import BetTake from '../BetTake/BetTake'
import BetResult from '../BetResult/BetResult'
import BetChase from '../../components/BetArea/BetChase'

export default class BetArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showExample: false,
      showWinningNotes: false,
      showChaseNumWin: false,
      winStop: false
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.orderList.length <= 0) {
      this.setState({
        showChaseNumWin: false,
        winStop: false
      })
    }
  }

  setWinStop() {
    let winStop = this.state.winStop
    this.setState({
      winStop: !winStop
    })
  }

  handleRandomGenerationBet(betNum) {
    const { currentMethod, randomGenerationBet } = this.props
    randomGenerationBet(betNum, currentMethod)
  }

  handleShowChaseNumWin(isDisplay) {
    this.setState({showChaseNumWin: isDisplay})
  }

  render() {
    let { currentMethod } = this.props
    return (
      <div className="bet-area">
        <div className="tips">
          <div className="prompt">
            <i className="iconfont">&#xe67e;</i>
            <label>玩法提示：</label>
            <span>{currentMethod.tips}</span>
          </div>
          <div className="rule">
            <div className="example"
              onMouseEnter={e => {this.setState({showExample: true})}}
              onMouseLeave={e => {this.setState({showExample: false})}}
              >
              <i className="iconfont">&#xe798;</i>
              <span>范例</span>
              {
                this.state.showExample ? (
                  <div className="exampleWin">{currentMethod.example}</div>
                ) : null
              }

            </div>
            <div className="winning-notes"
              onMouseEnter={e => {this.setState({showWinningNotes: true})}}
              onMouseLeave={e => {this.setState({showWinningNotes: false})}}
              >
              <i className="iconfont">&#xe620;</i>
              <span>中奖说明</span>
              {
                this.state.showWinningNotes ? (
                  <div className="notesWin">{currentMethod.help}</div>
                ) : null
              }

            </div>
          </div>

        </div>
        <BetTake currentMethod={currentMethod}/>
        <BetResult
          winStop={this.state.winStop}
          currentMethod={currentMethod}
          showChaseNumWin={(isDisplay) => {this.handleShowChaseNumWin(isDisplay)}}
          />
        {
          this.state.showChaseNumWin && (
            <BetChase winStop={this.state.winStop} setWinStop={this.setWinStop.bind(this)}/>
          )
        }
      </div>
    )
  }
}
