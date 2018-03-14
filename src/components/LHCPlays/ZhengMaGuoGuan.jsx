import React from 'react'
import NormalGrid from './NormalGrid.jsx'
import { Scrollbars } from 'react-custom-scrollbars'

export default class ZhengMaGuoGuan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      betResult: {},
      money: '',
      showQuickFill: false,
      isBetting: false
    }
    this.combination = {}
  }
/*eslint-disable */
  handleBetResult(name, value) {
    let betResult = this.state.betResult
    betResult[name] = value
    let title = '', label = ''
    if(name === 'game1'){
      title = '正码一'
    } else if (name === 'game2') {
      title = '正码二'
    } else if (name === 'game3') {
      title = '正码三'
    } else if (name === 'game4') {
      title = '正码四'
    } else if (name === 'game5') {
      title = '正码五'
    } else if (name === 'game6') {
      title = '正码六'
    }
    if (value.indexOf('_ODD') != -1) {
      label = '单'
    } else if (value.indexOf('_EVEN') != -1) {
      label = '双'
    } else if (value.indexOf('_OVER') != -1) {
      label = '大'
    } else if (value.indexOf('_UNDER') != -1) {
      label = '小'
    } else if (value.indexOf('_SODD') != -1) {
      label = '和单'
    } else if (value.indexOf('_SEVEN') != -1) {
      label = '和双'
    } else if (value.indexOf('_SOVER') != -1) {
      label = '和大'
    } else if (value.indexOf('_SUNDER') != -1) {
      label = '和小'
    } else if (value.indexOf('_FOVER') != -1) {
      label = '尾大'
    } else if (value.indexOf('_FUNDER') != -1) {
      label = '尾小'
    } else if (value.indexOf('_R') != -1) {
      label = '红'
    } else if (value.indexOf('_G') != -1) {
      label = '绿'
    } else if (value.indexOf('_B') != -1) {
      label = '蓝'
    }
    let combination = this.combination
    combination[name] = title + ' ' + label + ' @' + this.props.playAttr.odds[value]
    if (Object.keys(combination).length > 1) {
      let results = {}
      let odds = 1
      for (let key of Object.keys(betResult)) {
        odds = (odds * this.props.playAttr.odds[betResult[key]]).toFixed(2)
      }
      results = {
        model: Object.keys(combination).length + ' 串 1' ,
        combination: combination,
        odds: odds
      }
      this.setState({
        results: results,
        betResult: betResult
      })
    } else {
      this.setState({
        betResult: betResult
      })
    }
  }

  render() {
    let result = this.state.results
    const { isBetting } = this.state
    const { goldList, data, playAttr } = this.props
    const odds = playAttr.odds
    return (
      <div className="zheng-ma-guo-guan">
        <NormalGrid data={data.items[0]} odds={odds}
                  setBetResult={this.handleBetResult.bind(this)}
                  betResult={this.state.betResult}/>
        <div className="lhc-bet-result">
          <div className="desc">
            <div className="dotted"></div>
            <div className="info-check">
              号码组合共<span>{result ? 1 : 0}</span>组
            </div>
            <div className="dotted"></div>
          </div>
          <div className="table">
            <div className="theader">
              <div className="model">模式</div>
              <div className="odds">赔率</div>
              <div className="combination">号码组合</div>
              <div className="operation">操作</div>
            </div>
            <div className="tbody">
              <Scrollbars autoHide={true} style={{ flex: 1, width: '100%' }}>
              {
                result && result.combination ? Object.keys(result.combination).map((name, index) =>
                  <div className="row" key={index}>
                    <div className="model">{index === 0 ? result.model : ''}</div>
                    <div className="odds">{index === 0 ? result.odds : ''}</div>
                    <div className="combination">{result.combination[name]}</div>
                    <div className="operation" onClick={this.handRemoveClick.bind(this, name)}>删除</div>
                  </div>
                ) : null
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
                  placeholder="最低限额1"
                  value={this.state.money}
                  onClick={(e) => {this.setState({showQuickFill: true}) }}
                  onChange={e => {
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
      </div>
    )
  }

  handRemoveClick(name, event) {
    let betResult = this.state.betResult
    let results = this.state.results
    let combination = this.combination
    delete combination[name]
    this.combination = combination
    if (Object.keys(betResult).length === 2) {
      delete betResult[name]
      results = {}
    } else {
      delete betResult[name]
      delete results.combination[name]
      results.model = Object.keys(results.combination).length + ' 串 1'
      let odds = 1
      for (let key of Object.keys(betResult)) {
        odds = (odds * this.props.playAttr.odds[betResult[key]]).toFixed(2)
      }
      results.odds = odds
    }
    this.setState({
      betResult: betResult,
      results: results
    })
  }

  handleBetClick() {
    this.setState({isBetting: true}, () => {
      let betResult = this.state.betResult
      let results = {}
      if (betResult && Object.keys(betResult).length >= 2) {
        let orders = {}
        let odds = 1
        for (let key of Object.keys(betResult)) {
          orders[betResult[key]] = {odds : this.props.playAttr.odds[betResult[key]]}
          odds = (odds * this.props.playAttr.odds[betResult[key]]).toFixed(2)
        }
        results.gameNum = this.props.id
        results.money = this.state.money
        results.act = 102
        results.orders = orders
      }

      this.props.betting(results, (success) => {
        if (success) {
          this.combination = {}
          this.setState({
            results: null,
            betResult: {},
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
    this.combination = {}
    this.setState({
      results: null,
      betResult: {},
      money: ''
    })
  }
}
