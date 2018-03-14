import React, { Component } from 'react'
import { MathAdd, MathMul, getSelectContent } from '../../helpers/utils'

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isBetting: false
    }
    this.unit = {
      'yuan': '元',
      'jiao': '角',
      'fen': '分'
    }
    this.handleBetting = this.handleBetting.bind(this)
  }

  handleBetting() {
    if (!this.state.isBetting) {
      this.setState({
        isBetting: true
      }, () => {
        this.props.betting(() => {
          this.setState({
            isBetting : false
          })
        })
      })
    }
  }

  render() {
    const { orderList, issue, closeBetConfirm } = this.props
    let totalPrice = 0, orderTotalPrice = 0
    if (orderList && orderList.length > 0) {
      for (let order of orderList) {
        orderTotalPrice = MathAdd(orderTotalPrice, order.total)
      }
    }
    totalPrice = orderTotalPrice
    let planList = this.props.planList.filter( plan => plan.multiple !== 0 )
    if (planList && planList.length > 0) {
      totalPrice = 0
      for (let planItem of planList.filter(n=>n.checked!==false)) {
        totalPrice = MathAdd(totalPrice, MathMul(planItem.multiple, orderTotalPrice))
      }
    }
    return(
      <div className="bet-confirm-wrap">
        <div className="bet-confirm-win">
          <div className="bet-confirm-top">
            <span>温馨提示</span>
            <i className="iconfont" onClick={e => { closeBetConfirm() }}>&#xe63d;</i>
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
                orderList && orderList.length > 0 ? (
                  orderList.map((order, index) => {
                    let highLight = index % 2 === 0 ? 'high-light' : null
                    let content = ''
                    if (order.checked && order.checked.length > 0) {
                      content = '[' + order.checked.join(",") + '] '
                    }
                    if (order.inputData.length > 0) {
                      content = content + order.inputData.join(",")
                    } else if (Object.keys(order.selected).length > 0) {
                      content += getSelectContent(order.playId, order.selected)
                    }
                    return (
                      <div className={`order-row ${highLight}`} key={index}>
                        <div className="play-name">{order.realName}</div>
                        <div className="unit">{this.unit[order.unit]}</div>
                        <div className="content">{content}</div>
                        <div className="price">{order.total}</div>
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
                this.state.isBetting ? '投注中': '确认'
              }
            </button>
            <button
              className="btn-cancel"
              onClick={e => { closeBetConfirm() }}>
              取消
            </button>
          </div>
        </div>
      </div>
    )
  }
}
