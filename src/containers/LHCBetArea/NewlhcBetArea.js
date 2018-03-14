import React from 'react'
import { connect } from 'react-redux'
import { layoutSet, SetTabIndex, SetGridData, SetShowBetConfirm,
  SetSubTabIndex, SetSubLayout, SetShowBetData, SetChaseState,
  SetCurrentBetData, SetBetData } from '../../redux/actions'
import LHCQuickMoneySetting from '../../components/LHCBetArea/LHCQuickMoneySetting.jsx'
import LHCQuickBet from '../../components/LHCBetArea/NewLHCQuickBet.jsx'
import { fetchUtil, lianMaSub, erquanzhongSub } from '../../helpers/utils'
import NewLhcPlays from '../LHCPlays/NewLhcPlays'
import ConfirmModal from '../../components/common/newConfirmModal'
import Immutable from 'immutable'
import { BALLS } from '../../components/common/Balls.jsx';

import {
  setPopupInfo,
  getUserInfo
} from '../../redux/actions/index'

class NewlhcBetArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuickSettingWin: false,
      showQuickBetWin: false,
      goldList: [1, 5, 10, 20],
      status: 1,
      isBetting: false
    }
    this.betting = this.betting.bind(this)
  }

  componentDidMount() {
    fetchUtil({act: 103, lotteryId: this.props.lotteryId})
    .then((res) => {
      if (res) {
        this.setState({
          goldList: res.gold_value,
          status: Number(res.status)
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(Immutable.fromJS(this.props.lhcBetData.playWay), Immutable.fromJS(nextProps.lhcBetData.playWay))) {
      this.setState({
        showQuickSettingWin: false,
        showQuickBetWin: false,
      })
    }
    if (!Immutable.is(Immutable.fromJS(this.props.lhcBetData.tabIndex), Immutable.fromJS(nextProps.lhcBetData.tabIndex))) {
      this.props.SetShowBetData({})
      this.props.SetCurrentBetData([])
      this.props.SetSubLayout(null)
      this.props.SetSubTabIndex(null)
    }
  }

  handleClick = (tab, index) => {
    this.props.layoutSet(tab)
    this.props.SetTabIndex(index)
    this.props.SetHexiaoIndex(index)
  }

  subHandleClick = (tab, index) => {
    this.props.SetSubLayout(tab)
    this.props.SetSubTabIndex(index)
    this.props.SetShowBetData({})
    this.props.SetCurrentBetData([])
  }

  renderTabs = (tabs) => {
    if (!this.props.tabshow){
      return null
    } else {
      const { layout } = this.props
      const { lhcBetData } = this.props
      const { playWay, subTabIndex, showBetData, tabIndex } = lhcBetData
      const zheng = showBetData.zheng || []
      const fu = showBetData.fu || []
      const shadowStyle = playWay.id === '48' ? { 'boxShadow': '0 0 0 0 rgba(0,0,0,0)' } : { 'boxShadow': '0 2px 2px 0 rgba(0,0,0,0.30)' }
      const subShadow = subTabIndex === 0 ? { 'boxShadow': '0 0 0 0 rgba(0,0,0,0)' } : { 'boxShadow': '0 1.5px 0 0 rgba(0,0,0,0.30)' }
      const subTab = tabIndex < 3 ? lianMaSub : erquanzhongSub
      return (
        <div className="animated shake">
          <div className={playWay.id === '48' ? "tabs lianma" : "tabs"} style={shadowStyle}>
          {
            tabs.map((tab, index) => {
              let odds = 0
              if (playWay.id === '48') {
                if (Number(playWay.play[0].detail[index].maxOdds)) {
                  odds = Number(playWay.play[0].detail[index].maxOdds).toFixed(2)
                } else {
                  odds = Number(playWay.play[0].detail[index].maxOdds.split(',')[0]).toFixed(2)+','+Number(playWay.play[0].detail[index].maxOdds.split(',')[1]).toFixed(2)
                }
              }
              return (
                playWay.id !== '52' ?
                <div key={index} onClick={()=>this.handleClick(tab, index)}
                  className={layout && index === tabIndex ? 'tab-selected' : null}>
                  <label>{tab.name}</label>
                  {
                    playWay.id === '48' && (
                      <span>{odds}</span>
                    )
                  }
                </div> :
                <div key={index} onClick={()=>this.handleClick(tab, index)}
                  className={layout && this.props.hexiaoIndex === index ? 'tab-selected' : null}>
                  <label>{tab.name}</label>
                </div>
              )
            })
          }
          </div>
          {
            playWay.id === '48' ?
            (
              <div className="subtabs" style={subShadow} >
                {
                  subTab.map((item, index) =>
                    <div key={index} onClick={()=>this.subHandleClick(item, index)}
                      className={layout.subLayout && item === layout.subLayout ? 'tab-selected' : null}>
                      <label>{item}</label>
                    </div>
                  )
                }
              </div>
            )
            : null
          }
          {
            playWay.id === '48' && subTabIndex === 0 ? (
              <div className="show-area">
                <div className="selected-shown">
                  <span className="label" style={zheng.length <= 0 ? {flex: 1} : null}>正</span>
                  {
                    zheng.map((num, index) =>
                      <span style={BALLS[num]} className="selected-num" key={index}>{num}</span>
                    )
                  }
                </div>
                <div className="selected-shown">
                  <span className="label" style={fu.length <= 0 ? {flex: 1} : null}>副</span>
                  {
                    fu.map((num, index) =>
                      <span style={BALLS[num]} className="selected-num" key={index}>{num}</span>
                    )
                  }
                </div>
              </div>
            ) : null
          }
        </div>
      )
    }
  }

  handleBet = () => {
    this.setState({isBetting: true}, () => {
      const { planList, lhcBetData, currentLottery } = this.props
      const { betData } = lhcBetData
      const { currentIssue } = currentLottery
      let bet = {}
      let order_list = []
      betData.map((item, index) => {
        return order_list.push({
                content: item.content,
                mode:1,
                money: item.value,
                nums: 1,
                play_id: item.playId,
                point: item.rebate,
                price: item.value
              })
      })
      bet.plan_list = []
      planList.map((item, index) => {
        delete item.end_time
        if (item.multiple === 0 || item.checked === false) {
          return null
        } else {
          return bet.plan_list.push(item)
        }
      })
      bet.order_list = order_list
      bet.win_stop = lhcBetData.WinStop ? 1 : 0
      bet.issue_no = currentIssue
      bet.act = 203
      this.betting(bet, () => {
        this.setState({ isBetting: false })
        this.props.SetShowBetConfirm(false)
      })
    })
  }

  betting = (betResult, betCallBack) => {
    const { userInfo, setPopupInfo, getUserInfo, lotteryId } = this.props
    if (!betResult || !betResult.order_list || Object.keys(betResult.order_list).length <= 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '请先添加投注内容',
        autoShutDown: '取消',
        action: {
          '确定': 'cancel',
        }
      }
      betCallBack()
      setPopupInfo(info)
    } else if (!userInfo.userName) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '用户未登录',
        action: {
          '确定': 'cancel',
        }
      }
      betCallBack()
      setPopupInfo(info)
    } else if (betResult.money <= 0 || betResult.money === '') {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '请填写投注金额',
        autoShutDown: '取消',
        action: {
          '确定': 'cancel',
        }
      }
      betCallBack()
      setPopupInfo(info)
    } else {
      betResult.lottery_id = lotteryId
      fetchUtil(betResult)
      .then((res) => {
        if (res) {
          let info = {}
          if (res.status === 0) {
            info = {
              type: 'SUCCESS',
              title: '温馨提示',
              content: res.message,
              autoShutDown: '确定',
              action: {
                '确定': 'cancel'
              }
            }
            getUserInfo()
            betCallBack()
            this.props.SetChaseState(false)
            this.props.SetBetData([])
          } else {
            info = {
              type: 'ERROR',
              title: '温馨提示',
              content: res.message,
              action: {
                '确定': 'cancel'
              }
            }
            betCallBack()
          }
          setPopupInfo(info)
        }
      })
    }
  }

  setBetMoney = (indexValue, value) => {
    const { betResult } = this.state
    Object.keys(betResult).map((item, index) => {
      if (index === indexValue) {
        betResult[`${item}`] = value
      }
      return betResult
    })
  }

  settingQuickConfig(goldList, status) {
    const { userInfo, setPopupInfo, lotteryId } = this.props
    if (!userInfo.userName) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '用户未登录',
        action: {
          '确定': 'cancel',
        }
      }
      setPopupInfo(info)
    } else {
      fetchUtil({
        act: 104,
        lotteryId,
        gold_value: goldList,
        status
      })
      .then((res) => {
        if (res) {
          let info = {
            type: 'WARN',
            title: '温馨提示',
            content: res.message,
            action: {
              '确定': 'cancel',
            }
          }
          if (res.status === 1) {
            info.type = 'SUCCESS'
            this.setState({
              showQuickSettingWin: false,
              goldList,
              status
            })
          }
          setPopupInfo(info)
        }
      })
    }

  }

  closeBetConfirm = () => {
    this.props.SetShowBetConfirm(false)
  }

  render() {
    const { lhcBetData, shengXiao, playWayChild, layout, planList, currentLottery } = this.props
    const { status, goldList } = this.state
    const { playWay, betData } = lhcBetData
    if (!playWay) {
      return null
    } else {
      return (
        <div className="lhc-newbet-area">
          {
            playWayChild ? this.renderTabs(playWayChild.tabs) : this.renderTabs(null)
          }
          <div className="tool-bar">
            <div className="funs">
              {
                layout.quickBet && (
                  <div className={`${this.state.showQuickBetWin && 'selected'} quick-bet`} onClick={e => {
                      let showQuickBetWin = this.state.showQuickBetWin
                      this.setState({showQuickBetWin: !showQuickBetWin})
                    }}>
                    <span>快捷投注</span>
                    <i className={`iconfont ${layout.quickBet && this.state.showQuickBetWin ? 'icon-arrow-down' : 'icon-arrow-up'}`} />
                  </div>
                )
              }
              {
                playWay.id === '47' || playWay.id === '48' || playWay.id === '49' || playWay.id === '50' || playWay.id === '52' || playWay.id === '56' ? null :
                <div className="quick-money-setting" onClick={e => {this.setState({showQuickSettingWin: true})}}>
                  <span>快捷金额设置</span>
                </div>
              }
            </div>

            {
              layout.quickBet && this.state.showQuickBetWin && (
                <LHCQuickBet
                  type={(layout && layout.type) || layout.type}
                  shengXiao={shengXiao}
                  />
              )
            }
          </div>
          <NewLhcPlays
            setBetMoney={this.setBetMoney}
            status={status}
            goldList={goldList}
            />

          {
            !!this.state.showQuickSettingWin &&
            <LHCQuickMoneySetting
              setPopupInfo={this.props.setPopupInfo}
              goldList={this.state.goldList}
              status={this.state.status}
              setting={this.settingQuickConfig.bind(this)}
              closeWin={() => {this.setState({showQuickSettingWin: false})}}/>
          }
          {
            this.props.lhcBetData.ShowBetConfirm && betData.length > 0 ? (
              <ConfirmModal
                betData={betData}
                planList={planList}
                playWay={playWay}
                bet={this.handleBet}
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

}


const mapStateToProps = (state) => {
  const { userInfo, popupInfo, currentLottery, layout, orderInfo, lhcBetData, planList } = state
  return {
    currentLottery,
    orderInfo,
    layout,
    lhcBetData,
    userInfo,
    popupInfo,
    shengXiao: currentLottery.newAnimals,
    typeList: currentLottery.typeList,
    lotteryId: currentLottery.lotteryId,
    planList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetGridData: (gridData) => {
      dispatch(SetGridData(gridData))
    },
    SetTabIndex: (tabIndex) => {
      dispatch(SetTabIndex(tabIndex))
    },
    SetBetData: (BetData) => {
      dispatch(SetBetData(BetData))
    },
    SetCurrentBetData: (CurrentBetData) => {
      dispatch(SetCurrentBetData(CurrentBetData))
    },
    SetShowBetData: (ShowBetData) => {
      dispatch(SetShowBetData(ShowBetData))
    },
    layoutSet: (layout) => {
      dispatch(layoutSet(layout))
    },
    setPopupInfo: (info) => {
      dispatch(setPopupInfo(info))
    },
    getUserInfo: () => {
      dispatch(getUserInfo())
    },
    SetSubTabIndex: (index) => {
      dispatch(SetSubTabIndex(index))
    },
    SetSubLayout: (layout) => {
      dispatch(SetSubLayout(layout))
    },
    SetShowBetConfirm: (layout) => {
      dispatch(SetShowBetConfirm(layout))
    },
    SetChaseState: (value) => {
      dispatch(SetChaseState(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewlhcBetArea)
