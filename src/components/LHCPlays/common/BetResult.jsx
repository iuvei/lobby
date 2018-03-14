import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'


export default class BetResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      money: '',
      results: [],
      showQuickFill: false,
      isBetting: false
    }
  }

  render() {
    const { goldList, data, playAttr } = this.props
    const { isBetting } = this.state
    return (
      <div className="lhc-bet-result">
        <div className="desc">
          <div className="dotted l"></div>
          <div className="info-check">
            号码组合共<span>{data.length}</span>组
          </div>
          <div className="dotted r"></div>
        </div>
        <div className="table">
          <div className="theader">
            <div className="sequence">序号</div>
            <div className="model">模式</div>
            <div className="combination">号码组合</div>
            <div className="odds">赔率</div>
          </div>
          <div className="tbody">
            <Scrollbars autoHide={true} style={{ flex: 1, width: '100%' }}>
            {
              data.map((result, index) =>
                <div className="row" key={index}>
                  <div className="sequence">{result.sequence}</div>
                  <div className="model">{result.model}</div>
                  <div className="combination">{result.combination}</div>
                  <div className="odds">{result.odds}</div>
                </div>
              )
            }
            </Scrollbars>
          </div>
        </div>
        <div className="info">
          <div className="money">
            <span>下注金额：</span>
            <div onMouseLeave={() => {this.setState({showQuickFill: false})}}>
              <input type="text"
                name="betMoney"
                className="btn"
                placeholder="最低限额1"
                onClick={(e) => {this.setState({showQuickFill: true}) }}
                value={this.state.money} onChange={e => {
                  if (e.target.value <= 0) {
                    e.target.value = ''
                  }
                  /*eslint-disable */
                  this.setState({
                    money: e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[\,,\.]{1,}/g,'')
                  })
                }}/>
              {
                goldList && this.state.showQuickFill ? (
                  <div className="quick-fill">
                  {
                    goldList.map((item, index) =>
                      <div key={index} onClick={() => {this.setState({money: item, showQuickFill: false})}}>{`${item} 元`}</div>
                    )
                  }
                  </div>
                ) : null
              }
            </div>
          </div>
          <div className="tips">
            <span>单注限额：{playAttr.play_stake_bet_max_money}</span>
            <br/>
            <span>单项（号）限额：{playAttr.play_item_bet_max_money}</span>
          </div>
          <div className="btn-group">
            <button className="btn confirm" disabled={isBetting} onClick={this.handleBetClick.bind(this)}>确认下注</button>
            <button className="btn cancel" onClick={this.handleCancelClick.bind(this)}>取消</button>
          </div>
        </div>
      </div>
    )
  }

  handleBetClick() {
    this.setState({
      isBetting: true
    }, () => {
      let results = this.props.results
      if (results) {
        results.money = this.state.money
        results.act = 102
      }
      this.props.betting(results, (success) => {
        if (success) {
          this.props.reset()
          this.setState({
            money: '',
            isBetting: false
          })
        } else {
          this.setState({isBetting: false})
        }
      })
    })
  }

  handleCancelClick() {
    this.props.reset()
    this.setState({
      money: ''
    })
  }
}
