import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { fetchUtil } from '../../helpers/utils'

export default class LuckyResult extends Component {
  constructor(props) {
    super(props)
    this.betting = this.betting.bind(this)
    this.state = {
      isBetting: false
    }
  }


  betting() {
    const { data, lotteryId, currentIssue, setPopupInfo, delAll, getUserInfo } = this.props
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
      this.setState({isBetting: false})
    } else {
      let order_list = []
      for (let order of data) {
        order_list.push({
          play_id: order.playId,
          bet_content: order.num,
          price: order.money
        })
      }
      let body = {
        act: 214,
        lottery_id: lotteryId,
        issue_no: currentIssue,
        order_list
      }

      fetchUtil(body)
      .then((res) => {
        if (res) {
          let info = {}
          if (res.status === 0) {
            info = {
              type: 'SUCCESS',
              title: '温馨提示',
              content: '恭喜您下注成功',
              action: {'确定': 'cancel'}
            }
            delAll()
            getUserInfo()
          } else {
            info = {
              type: 'WARN',
              title: '温馨提示',
              content: res.message,
              action: {'确定': 'cancel'}
            }
          }
          this.setState({isBetting: false})
          setPopupInfo(info)
        }
      }).catch((err) => {
        let info = {
          type: 'WARN',
          title: '温馨提示',
          content: err,
          action: {
            '确定': 'cancel'
          }
        }
        this.setState({isBetting: false})
        setPopupInfo(info)
      })
    }
  }


  render() {
    const { data, delItem, delAll, addOrder } = this.props
    const { isBetting } = this.state
    let totalPrice = 0
    return(
      <div className="lucky-result">
        <div className="bet-table">
          <div className="table-cap">
            <div className="cap-ct"></div>
          </div>
          <div className="tb-ct">
            <div className="tb-header">
              <div className="lk-type">下注类型</div>
              <div className="lk-num">号码</div>
              <div className="lk-betNum">注数</div>
              <div className="lk-amout">金额</div>
              <div className="lk-del"></div>
            </div>
            <div className="tb-body">
              <Scrollbars autoHide={true} style={{ flex: 1, width: '100%' }}>
              {
                data && data.length > 0 && data.map((item, index) => {
                  totalPrice += Number(item.money)
                  return (
                    <div key={index} className="bd-row">
                      <div className="lk-type">{item.typeName}</div>
                      <div className="lk-num">{item.num}</div>
                      <div className="lk-betNum">1</div>
                      <div className="lk-amout">{item.money}元</div>
                      <div className="lk-del">
                        <i className="iconfont" onClick={() => {delItem(index)}}>&#xe63d;</i>
                      </div>
                    </div>
                  )
                })
              }
              </Scrollbars>
            </div>
            <div className="tb-footer">
              <div className="bet-total">
                <span>您已经选中<span>{data ? data.length : 0}</span>注，共<span>{totalPrice}</span>元</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bet-actions">
          <button className="add" onClick={ e => {addOrder()}}>添加注单</button>
          <button className="del" onClick={ e => {delAll()}}>删除全部</button>
          <button className="confirm"  disabled={isBetting}
            onClick={ e => {
              this.setState({
                isBetting: true
              }, () => { this.betting() })
            }}>
            确认投注
          </button>
        </div>
      </div>
    )
  }
}
