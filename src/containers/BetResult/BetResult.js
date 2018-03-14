import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmModal from '../../components/BetResult/ConfirmModal'
import { getSelectContent, MathAdd } from '../../helpers/utils'
import {
  delOrder,
  modifyAmount,
  modifyUnit,
  betting,
  randomGenerationBet,
  setPopupInfo,
  resetPlanList
} from '../../redux/actions/index'
import { Scrollbars } from 'react-custom-scrollbars'
import { Switch } from 'antd'

class BetResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showBetConfirm: false,
    }

    this.handleBetting = this.handleBetting.bind(this)
    this.openBetConfirm = this.openBetConfirm.bind(this)
  }

  renderUnit(unit) {
    if (unit === 'yuan') {
      return '元'
    } else if (unit === 'jiao') {
      return '角'
    } else if (unit === 'fen') {
      return '分'
    }
  }

  handleZhuihao(event) {
    const { showChaseNumWin, planList, resetPlanList } = this.props
    if (!event && planList && planList.length > 0) {
      resetPlanList()
    }
    showChaseNumWin(event)

  }


  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    if (data && data.length <= 0) {
      this.setState({
        showBetConfirm: false
      })
    }
  }

  openBetConfirm() {
    const { data, setPopupInfo } = this.props
    if (!data || data.length <= 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '请先添加投注内容',
        action: {
          '确定': 'cancel'
        }
      }
      setPopupInfo(info)
    } else {
      this.setState({
        showBetConfirm: true
      })
    }

  }

  closeBetConfirm() {
    this.setState({
      showBetConfirm: false
    })
  }

  handleBetting(callBack) {
    this.props.handleBetting(this.props.winStop ? 1 : 0, callBack)
  }

  handleRemoveAll() {
    let info = {
      type: 'WARN',
      title: '温馨提示',
      content: '是否要删除全部注单？',
      action: {
        '确定': 'resetOrderList',
        '取消': 'cancel'
      }
    }
    this.props.setPopupInfo(info)
  }

  getBetContent(order) {
    let content = ''
    if (order.checked && order.checked.length > 0) {
      content = '[' + order.checked.join(",") + '] '
    }
    if (order.inputData.length > 0) {
      content = content + order.inputData.join(",")
    } else if (Object.keys(order.selected).length > 0) {
      content += getSelectContent(order.playId, order.selected)
    }
    return content
  }

/*eslint-disable */
  render() {
    const { data, handleDelOrder, handleModifyAmount, handleModifyUnit, planList,
             randomGenerationBet, currentLottery, currentMethod } = this.props

    let totalAmount = 0
    let totalBetNum = 0

    return(
      <div className="bet-result">
        <div className="order-area">
          <div className="bet-table">
            <div className="table-cap">
              <div className="cap-ct"></div>
            </div>
            <div className="tb-ct">
              <div className="tb-header">
                  <div className="method">玩法</div>
                  <div className="betnum">注数</div>
                  <div className="amount">单注金额</div>
                  <div className="tb-unit">模式</div>
                  <div className="tb-rebate">返点</div>
                  <div className="total">金额</div>
                  <div className="tb-del">&nbsp;</div>
              </div>
              <div className="tb-body">
                <Scrollbars autoHide={true} style={{ flex: 1, width: '100%' }}>
                {
                  data && data.length > 0 ? data.map((item, index) => {
                    totalAmount = MathAdd(totalAmount, item.total)
                    totalBetNum += item.betNum
                    let content = this.getBetContent(item)
                    return (
                      <div className="tb-row" key={index}>
                        <div className="method">
                          <div className="name">{item.realName}</div>
                          <div className="content">{content}</div>
                        </div>
                        <div className="betnum">{item.betNum}</div>
                        <div className="amount">
                          <input type="text" value={item.amount} maxLength="5"
                            onChange={e => {
                              handleModifyAmount(index, e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,''))
                            }}/>
                        </div>
                        <div className="tb-unit">
                          <select value={item.unit} onChange={e => { handleModifyUnit(index, e.target.value) }}>
                            <option value="yuan">元</option>
                            <option value="jiao">角</option>
                            <option value="fen">分</option>
                          </select>
                        </div>
                        <div className="tb-rebate">{item.rebate}%</div>
                        <div className="total">{item.total}&nbsp;元</div>
                        <div className="tb-del">
                          <a href="javascript: void(0)" onClick={e => { handleDelOrder(index) }}>
                            <i className="iconfont">&#xe63d;</i>
                          </a>
                        </div>
                      </div>
                    )
                  }
                  ) : null
                }
                </Scrollbars>
              </div>
              <div className="tb-footer">
                <div className="zhui-hao">
                  <div className="chase-choice">我要追号</div>
                  <Switch className="order-switch"
                    disabled={ data.length <= 0 }
                    onChange={ this.handleZhuihao.bind(this)}
                    checkedChildren="开"
                    unCheckedChildren="关"
                    defaultunchecked="true" />
                </div>
                <div className="bet-total">
                  <span>方案注数<span>{totalBetNum}</span>注，总金额<span>{totalAmount}</span>元</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bet-actions">
            <button onClick={ e => randomGenerationBet(1, currentMethod)}>随机一注</button>
            <button onClick={ e => randomGenerationBet(5, currentMethod)}>随机五注</button>
            <button onClick={ e => this.handleRemoveAll()}>删除全部</button>
            <button
              className="bet-confirm"
              onClick={e => { this.openBetConfirm(this) }}>
              确认投注
            </button>
          </div>
        </div>
        {
          this.state.showBetConfirm && data.length > 0? (
            <ConfirmModal
              orderList={data}
              planList={planList}
              issue={currentLottery.currentIssue || ''}
              closeBetConfirm={this.closeBetConfirm.bind(this)}
              betting={this.handleBetting}/>
          ) : null
        }
      </div>
    )
  }
/*eslint-disable */
}
const mapStateToProps = (state) => {
  const { planList, orderList, currentLottery } = state
  return {
    planList,
    data: orderList,
    currentLottery
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    handleDelOrder: (index) => {
      dispatch(delOrder(index))
    },
    handleModifyAmount: (index, amount) => {
      dispatch(modifyAmount(index, amount))
    },
    handleModifyUnit: (index, unit) => {
      dispatch(modifyUnit(index, unit))
    },
    handleBetting: (winStop, callBack) => {
      dispatch(betting(winStop, callBack))
    },
    randomGenerationBet: (betNum, currentMethod) => {
      dispatch(randomGenerationBet(betNum, currentMethod))
    },
    setPopupInfo: (info) => {
      dispatch(setPopupInfo(info))
    },
    resetPlanList: () => {
      dispatch(resetPlanList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetResult)
