import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from '../../components/BetTake/Checkbox'
import Select from '../../components/BetTake/Select'
import Input from '../../components/BetTake/Input'
import * as Utils from '../../helpers/utils'
import {
  selectBet,
  inputBet,
  checkbookBet,
  betAmount,
  monetaryUnit,
  addOrder,
  modifyOddsRebate,
  setPopupInfo
} from '../../redux/actions/index'
import Slider from 'rc-slider'

class BetTake extends Component {
  constructor(props) {
    super(props)
    this.rangeValue = 0
  }

  handleSelect(data) {
    const {currentMethod, handleSelectBet, orderInfo} = this.props
    let betNum = 0
    betNum = Utils.calSelectBetNum(currentMethod.play_id, data)
    if (currentMethod.checkbox) {
      let checkedBetNum = Utils.calCheckboxBetNum(currentMethod.play_id, orderInfo.checked)
      betNum = betNum * checkedBetNum
    }
    handleSelectBet({
      selected: data,
      betNum
    })
  }

  handleInput(data) {
    const {currentMethod, handleInputBet, orderInfo} = this.props
    let result = {
      inputData: data.split(" "),
      betNum: 0
    }
    let categoryIdList = ['3', '5']
    if (categoryIdList.includes(orderInfo.categoryId)) {
      result = Utils.calSpecialInputBetNum(currentMethod.play_id, data.split(","))
    } else {
      result = Utils.calInputBetNum(currentMethod.play_id, data.split(/\s+/))
    }
    if (currentMethod.checkbox) {
      let checkedBetNum = Utils.calCheckboxBetNum(currentMethod.play_id, orderInfo.checked)
      result.betNum = result.betNum * checkedBetNum
    }
    result['inputRawData'] = data
    handleInputBet(result)
  }

  handleCheckbox(data) {
    const {currentMethod, orderInfo, handleCheckboxBet } = this.props
    let betNum = 0
    let checkedBetNum = Utils.calCheckboxBetNum(currentMethod.play_id, data)
    if (currentMethod.select) {
      betNum = Utils.calSelectBetNum(currentMethod.play_id, orderInfo.selected)
    } else if (currentMethod.input) {
      let result = Utils.calInputBetNum(currentMethod.play_id, orderInfo.inputData)
      betNum = result.betNum
    }
    handleCheckboxBet({
      checked: data,
      betNum: checkedBetNum * betNum
    })
  }

  calculateOdds = (value) => {
    const { handleOddsRebate, orderInfo } = this.props
    const { max_odds, min_odds, rebate_point } = this.props.currentMethod
    let currentOdds = ''
    let rebate = (value / 100 * rebate_point).toFixed(1)
    if (max_odds.split(',').length > 1) {
      let maxOdds = max_odds.split(',')
      let minOdds = min_odds.split(',')
      let curOdds = Array.from({length: maxOdds.length})
      for (let i = 0; i < maxOdds.length; i++) {
        curOdds[i] = this.subNumber(maxOdds[i] -  (maxOdds[i] - minOdds[i]) * rebate / (Number(rebate_point) === 0 ? 1 : Number(rebate_point)), 3) //rebate_point为0时特殊处理
      }
      if (orderInfo.playId === '101' || orderInfo.playId === '205' || orderInfo.playId === '2034') {
        currentOdds = curOdds
      } else {
        currentOdds = curOdds.join(' | ')
      }
    } else {
      currentOdds = this.subNumber(max_odds -  (max_odds - min_odds) * rebate / rebate_point, 3)

    }


    handleOddsRebate(currentOdds, rebate)
  }

  subNumber(number, length) {
    let tempNum = 0
    let s1 = number + ''
    let start = s1.indexOf('.')
    if(start !== -1 && s1.substr(start + length + 1, 1) >= 5)
      tempNum = 1
    let temp = Math.pow(10, length)
    let s = Math.floor(number * temp) + tempNum
    return s / temp
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentMethod.play_id !== this.props.currentMethod.play_id || nextProps.orderInfo.rebate === '0.0') {
      this.rangeValue = 0
    }

  }

  handleUnitPrice(event) {
    this.props.handleBetAmount(event.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,''))
  }

  render() {
    const {currentMethod, orderInfo, handleMonetaryUnit, handleAddOrder, setPopupInfo} = this.props
    if (!currentMethod) {
      return null
    }
    return (
      <div className="bet-main">
        <div className="">
          {
            currentMethod.checkbox ?
            <Checkbox data={currentMethod.checkbox} orderInfo={orderInfo}
              checked={this.handleCheckbox.bind(this)}/>
            : null
          }
          {
            currentMethod.select ?
              <Select data={currentMethod.select} selected={this.handleSelect.bind(this)}
                      orderInfo={orderInfo} currentMethod={currentMethod}/>
              : null
          }
          {
            currentMethod.input ?
            <Input inputRawData={orderInfo.inputRawData} input={this.handleInput.bind(this)}
              orderInfo={orderInfo}/> : null
          }
        </div>
        <div className="bet-tools">
          <div className="opt">
            <span>
              共<span className="bet-num">{orderInfo.betNum}</span>注，
              单注金额：
            </span>
            <input className="amount" type="text" name="amount"
              value={orderInfo.amount} maxLength={Math.floor(currentMethod.bet_max).toString().length.toString()}
              onChange={this.handleUnitPrice.bind(this)}/>
            <div className={orderInfo.unit === 'yuan' ? "unit_activity unit" : "unit"}
              onClick={ e =>
                handleMonetaryUnit('yuan')
              }>
              元
            </div>
            <div className={orderInfo.unit === 'jiao' ? "unit_activity unit" : "unit"}
              onClick={ e =>
                handleMonetaryUnit('jiao')
              }>
              角
            </div>
            <div className={orderInfo.unit === 'fen' ? "unit_activity unit" : "unit"}
              onClick={ e =>
                handleMonetaryUnit('fen')
              }>
              分
            </div>
            <span>
              共
              <span className="total">
              {orderInfo.total}
              </span>
              元
            </span>
            <div className="bonus-adjustment">
              <div className="bonus-rebate">
                <div className="bonus">
                  {
                    orderInfo.playId === '101' || orderInfo.playId === '205' || orderInfo.playId === '2034'? ' ' : (
                      orderInfo.currentOdds ? orderInfo.currentOdds : (
                        currentMethod.max_odds && currentMethod.max_odds.split(',').length > 1 ?
                        currentMethod.max_odds.split(',').join(' | ') : currentMethod.max_odds
                      )
                    )
                  }
                </div>
                <div className="rebate">
                  {orderInfo.rebate ? orderInfo.rebate : '0.0'}%
                </div>
              </div>
              <div className="control">
                <div className="control-label">赔率</div>
                <Slider
                  className='slider'
                  defaultValue={1}
                  value={this.rangeValue}
                  onChange={value => {
                    this.rangeValue = value
                    this.calculateOdds(value)
                  }}
                  trackStyle={{ backgroundColor: '#EC2313', height: 10 }}
                  handleStyle={{
                    borderColor: '#EC2313',
                    height: 24,
                    width: 24,
                    marginLeft: -10,
                    marginTop: -7,
                    backgroundColor: '#EC2313',
                  }}
                  railStyle={{ backgroundColor: '#e9e9e9', height: 10, borderColor: 'red' }}
                />
                <div className="control-label">返利</div>
              </div>
            </div>
          </div>
          <div className="operation-group">
            <button className="add" onClick={e => {
              if (orderInfo.total > currentMethod.bet_max) {
                let info = {
                  type: 'WARN',
                  title: '温馨提示',
                  content: `您投注的单注金额超过最大金额限制，当前玩法最大金额${currentMethod.bet_max}`,
                  action: {
                    '确定': 'cancel'
                  }
                }
                setPopupInfo(info)
              } else if (orderInfo.betNum > 20000) {
                let info = {
                  type: 'WARN',
                  title: '温馨提示',
                  content: `单笔注单不能超过20000`,
                  action: {
                    '确定': 'cancel'
                  }
                }
                setPopupInfo(info)
              } else {
                handleAddOrder()
              }
            }}>
              添加注单
            </button>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { orderInfo, orderList } = state
  return {
    orderInfo,
    orderList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    handleSelectBet: (order) => {
      dispatch(selectBet(order))
    },
    handleInputBet: (order) => {
      dispatch(inputBet(order))
    },
    handleCheckboxBet: (order) => {
      dispatch(checkbookBet(order))
    },
    handleBetAmount: (amount) => {
      dispatch(betAmount(amount))
    },
    handleMonetaryUnit: (unit) => {
      dispatch(monetaryUnit(unit))
    },
    handleAddOrder: () => {
      dispatch(addOrder())
    },
    handleOddsRebate: (currentOdds, rebate) => {
      dispatch(modifyOddsRebate(currentOdds, rebate))
    },
    setPopupInfo: (info) => {
      dispatch(setPopupInfo(info))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetTake)
