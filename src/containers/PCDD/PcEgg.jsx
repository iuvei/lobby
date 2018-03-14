import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPopupInfo, getUserInfo, SetShowBetData, SetShowBetConfirm, SetBetData } from '../../redux/actions/index'
import '../../styles/scss/pcdd.scss'
import PcEggGrid from '../../components/PCDD/PcEggGrid.jsx'
// import PCDDResult from '../../components/PCDD/PCDDResult'
import ConfirmModal from '../../components/common/newConfirmModal'
import OrderList from '../../components/common/OrderList.jsx'
import LhcChase from '../../components/BetArea/LhcChase.jsx'
import { fetchUtil } from '../../helpers/utils'
import { COLOR } from '../../components/PCDD/PCDDColor'
import { Scrollbars } from 'react-custom-scrollbars'
import Immutable from 'immutable'

class PcEgg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      betResult: [],
      selectedItems: [],
      isShowSelectList: false,
      baoSan1: 0,
      baoSan2: 1,
      baoSan3: 2,
      SliderValue: 0,
      isBetting: false,
      isFocus: false
    }
    this.delItem = this.delItem.bind(this)
    this.delAll = this.delAll.bind(this)
    this.addOrder = this.addOrder.bind(this)
    this.handleBaoSanSelect = this.handleBaoSanSelect.bind(this)
  }

  handleChange = (id, maxOdds, minOdds, name, stakeBetMaxMoney, stakeBetMinMoney, money, label) => {
    const { lhcBetData, SetShowBetData } = this.props
    let showBetData = Immutable.fromJS(lhcBetData.showBetData).toJS()
    showBetData[`${id}`] = {
      id,
      maxOdds,
      minOdds,
      name,
      stakeBetMaxMoney,
      stakeBetMinMoney,
      money,
      label
    }
    if (money === 0 || money === '') {
      delete showBetData[`${id}`]
    }
    SetShowBetData(showBetData)
  }

  delItem(index) {
    let betResult = this.state.betResult
    betResult.splice(index, 1)
    this.setState({
      betResult
    })
  }

  delAll() {
    const betResult = this.state.betResult
    if (betResult && betResult.length > 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '是否要删除全部注单？',
        action: {
          '取消': 'cancel',
          '确定': 'callBack'
        },
        callBack: () => {
          this.setState({
            betResult: []
          })
        }
      }
      this.props.setPopupInfo(info)
    }
  }

  handleSelectClick = (curBaoSan, listLeft) => {
    this.setState({
      isShowSelectList: true,
      curBaoSan,
      listLeft
    })
  }

  handleBaoSanSelect(item) {
    let { curBaoSan, baoSan1, baoSan2, baoSan3 } = this.state
    let isDoubleSelected = false
    if (curBaoSan === 'baoSan1') {
      if (item === baoSan2 || item === baoSan3) {
        isDoubleSelected = true
      }
    } else if (curBaoSan === 'baoSan2') {
      if (item === baoSan1 || item === baoSan3) {
        isDoubleSelected = true
      }
    } else if (curBaoSan === 'baoSan3') {
      if (item === baoSan1 || item === baoSan2) {
        isDoubleSelected = true
      }
    }

    if (isDoubleSelected) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '请重新选择号码（不可出现相同号码）',
        action: {
          '确定': 'cancel'
        }
      }
      this.props.setPopupInfo(info)
    } else {
      this.setState({
        [curBaoSan]: item,
        isShowSelectList: false
      })
    }

  }

  addOrder = () => {
    const { selectedItems, betResult } = this.state
    if (selectedItems && selectedItems.length <= 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '您未选择任何号码',
        action: {
          '确定': 'cancel'
        }
      }
      this.props.setPopupInfo(info)
    } else {
      this.setState({
        betResult: selectedItems.concat(betResult),
        selectedItems: []
      })
    }

  }

  SetSliderValue = (value) => {
    this.setState({ SliderValue: value })
  }

  closeBetConfirm = () => {
    this.props.SetShowBetConfirm(false)
  }

  betting = () => {
      const { lhcBetData, currentLottery, setPopupInfo, planList } = this.props
      const { lotteryId, currentIssue } = currentLottery
      const { betData, WinStop } = lhcBetData
      if (!betData || betData.length <= 0) {
        let info = {
          type: 'WARN',
          title: '温馨提示',
          content: '请先添加投注内容',
          action: {
            '确定': 'cancel'
          }
        }
        setPopupInfo(info)
        this.setState({ isBetting: false })
      } else {
        let order_list = []
        for (let order of betData) {
          if (order.playId === '203') {
            order_list.push({
              play_id: order.playId,
              content: order.number,
              price: order.value,
              money: order.value,
              point: order.rebate,
              mode: 1,
              nums: 1
            })
          } else {
            order_list.push({
              play_id: order.playId,
              price: order.value,
              money: order.value,
              point: order.rebate,
              mode: 1,
              nums: 1
            })
          }
        }
        let body = {
          act: 203,
          lottery_id: lotteryId,
          issue_no: currentIssue,
          order_list,
          plan_list: planList,
          win_stop: WinStop ? 1 : 0
        }
        fetchUtil(body)
        .then((res) => {
          if (res) {
            let info = {}
            if (res.status === 0) {
              info = {
                type: 'SUCCESS',
                title: '温馨提示',
                content: '下注成功',
                action: {'确定': 'cancel'}
              }
              getUserInfo()
              this.props.SetShowBetConfirm(false)
              this.props.SetBetData([])
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
    const { data, lhcBetData, planList, currentLottery } = this.props
    const { isShowSelectList, curBaoSan, baoSan1, baoSan2, baoSan3, SliderValue } = this.state
    const { betData, ShowBetConfirm, playWay, showBetData, chaseState } = lhcBetData
    let selectedItems = this.state.selectedItems
    const temabaosan = currentLottery.typeList.slice(-1)
    const bsodds = (data[4].play[0].detail[0].maxOdds-(data[4].play[0].detail[0].maxOdds-data[4].play[0].detail[0].minOdds)*SliderValue/100).toFixed(2)
    let moneyValue = Object.keys(showBetData).length ? showBetData[temabaosan[0].play[0].detail[0].money] : ''
    return(
      <div className="pcEgg-28">
        <PcEggGrid
          showBetData={lhcBetData.showBetData}
          SliderValue={SliderValue}
          moneyChange={this.handleChange}
          selectedItems={selectedItems}
          data={[{label: data[0].name, cols: 4, rows: 7, cells: data[0].play[0].detail}]}
          />
        <div className="bao-san">
          <div className="label">{data[4].name}</div>
          <div className="bs-odds">{bsodds}</div>
          <div className="bs-content" onMouseLeave={e => {this.setState({isShowSelectList: false})}}>
            <div className={curBaoSan === 'baoSan1' && isShowSelectList ? "item isShowSelectList" : 'item'} onClick={e => {this.handleSelectClick('baoSan1', '0px')}}>
              <div className="num" style={COLOR[161 + baoSan1]}>
                {baoSan1}
              </div>
              <i className="iconfont">&#xe791;</i>
            </div>
            <div className={curBaoSan === 'baoSan2' && isShowSelectList ? "item isShowSelectList" : 'item'} onClick={e => {this.handleSelectClick('baoSan2', '98px')}}>
              <div className="num" style={COLOR[161 + baoSan2]}>
                {baoSan2}
              </div>
              <i className="iconfont">&#xe791;</i>
            </div>
            <div className={curBaoSan === 'baoSan3' && isShowSelectList ? "item isShowSelectList" : 'item'} onClick={e => {this.handleSelectClick('baoSan3', '196px')}}>
              <div className="num" style={COLOR[161 + baoSan3]}>
                {baoSan3}
              </div>
              <i className="iconfont">&#xe791;</i>
            </div>
            {
              this.state.isShowSelectList && (
                <div className="select-list" style={{left: this.state.listLeft}}>
                  <Scrollbars autoHide={false} style={{ flex: 1, width: '100%' }}>
                  {
                    Array.from({length: 28}).map((item, index) => {
                      return (
                        <div key={index}
                          className="select-list-item"
                          onClick={e => {this.handleBaoSanSelect(index)}}>
                          <div style={COLOR[161 + index]}>{index}</div>
                        </div>
                      )
                    })
                  }
                  </Scrollbars>
                </div>
              )
            }

          </div>
          <div className="bs-money">
            <span>下注金额：</span>
            <input
              className={ this.state.isFocus ? "focus" : '' }
              maxLength={6}
              onFocus = { () => this.setState({ isFocus: true }) }
              onBlur = { () => this.setState({ isFocus: false }) }
              value={ moneyValue }
              onChange={e => {
                this.handleChange(
                  temabaosan[0].play[0].detail[0].id,
                  temabaosan[0].play[0].detail[0].maxOdds,
                  temabaosan[0].play[0].detail[0].minOdds,
                  `${this.state.baoSan1}, ${this.state.baoSan2}, ${this.state.baoSan3}`,
                  temabaosan[0].play[0].detail[0].stakeBetMaxMoney,
                  temabaosan[0].play[0].detail[0].stakeBetMinMoney,
                  e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,''),
                  temabaosan[0].name
                )
              }}/>
            <span>元</span>
          </div>
        </div>
        <PcEggGrid
          showBetData={lhcBetData.showBetData}
          SliderValue={this.state.SliderValue}
          moneyChange={this.handleChange}
          selectedItems={selectedItems}
          data={[
            {label: data[1].name, cols: 2, rows: 5, cells: data[1].play[0].detail},
            {label: data[2].name, cols: 1, rows: 5, cells: data[2].play[0].detail},
            {label: data[3].name, cols: 1, rows: 5, cells: data[3].play[0].detail}
          ]}
          />
        <OrderList
        SetSliderValue={(value)=>this.SetSliderValue(value)} />
        {
          chaseState ? <LhcChase/> : null
        }
        {
          ShowBetConfirm && betData.length > 0 ? (
            <ConfirmModal
              betData={betData}
              planList={planList}
              playWay={playWay}
              bet={this.betting}
              isBetting={this.state.isBetting}
              issue={currentLottery.currentIssue || ''}
              closeBetConfirm={this.closeBetConfirm}
              />
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { lhcBetData, planList, currentLottery } = state
  return {
    lhcBetData,
    planList,
    currentLottery
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPopupInfo: (info) => {
      dispatch(setPopupInfo(info))
    },
    getUserInfo: () => {
      dispatch(getUserInfo())
    },
    SetShowBetData: (showBetData) => {
      dispatch(SetShowBetData(showBetData))
    },
    SetShowBetConfirm: (value) => {
      dispatch(SetShowBetConfirm(value))
    },
    SetBetData: (value) => {
      dispatch(SetBetData(value))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PcEgg)
