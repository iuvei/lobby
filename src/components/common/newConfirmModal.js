import React, { Component } from 'react'
import { MathAdd, MathMul } from '../../helpers/utils'

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props)
    this.handleBetting = this.handleBetting.bind(this)
  }

  handleBetting() {
    if (!this.props.isBetting) {
      this.props.bet()
    }
  }

  render() {
    const { betData, issue, closeBetConfirm } = this.props
    let totalPrice = 0, orderTotalPrice = 0
    betData.map((item, index) => orderTotalPrice += Number(item.value))
    totalPrice = (orderTotalPrice).toFixed(2)
    let planList = this.props.planList.filter( plan => plan.multiple !== 0 )
    if (planList && planList.length > 0) {
      totalPrice = 0
      for (let planItem of planList.filter(n=>n.checked!==false)) {
        totalPrice = MathAdd(totalPrice, MathMul(planItem.multiple, orderTotalPrice)).toFixed(2)
      }
    }
    return(
      <div className="bet-confirm-wrap">
        <div className="bet-confirm-win">
          <div className="bet-confirm-top">
            <span>温馨提示</span>
            <i className="iconfont" onClick={e => closeBetConfirm() }>&#xe63d;</i>
          </div>
          <div className="bet-confirm-content">
            <div className="issue">
              <i className="iconfont">&#xe613;</i>
              <span>
                {
                  planList && planList.length > 0 ?
                  `您确定要追 ${planList.filter(n=>n.checked!==false).length} 期?` :
                  `您确定要加入 ${issue} 期？`
                }
              </span>
            </div>
            <div className="list">
              <div className="order-row order-header">
                <div className="play-name">玩法</div>
                <div className="unit">单位</div>
                <div className="content">内容</div>
                <div className="price">金额</div>
              </div>
              <div className="list-wrap">
              {
                betData && betData.length > 0 ? (
                  betData.map((order, index) => {
                    let highLight = index % 2 === 0 ? 'high-light' : null
                    const playName = order.name instanceof Array ? order.name.join(',') : order.name
                    return (
                      <div className={`order-row ${highLight} ${playName.length>20 && "heiger" }`} key={index}>
                        <div className={"play-name"}>{playName}</div>
                        <div className="unit">{'元'}</div>
                        <div className="content">{order.number}</div>
                        <div className="price left">{order.value}</div>
                      </div>
                    )
                  })
                ) : null
              }
              </div>
            </div>
            <div className="total">
              {
                planList && planList.length > 0 ?
                `追号总金额：${totalPrice} 元` :
                `投注总金额：${totalPrice} 元`
              }
            </div>
          </div>
          <div className="bet-confirm-bottom">
            <button
              className="btn-confirm"
              onClick={e => {this.handleBetting()}}>
              {
                this.props.isBetting ? '投注中': '确认'
              }
            </button>
            <button
              className="btn-cancel"
              onClick={e => closeBetConfirm()}>
              取消
            </button>
          </div>
        </div>
      </div>
    )
  }
}
