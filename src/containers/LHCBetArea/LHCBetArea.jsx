import React from 'react'
import { connect } from 'react-redux'
import LHCQuickMoneySetting from '../../components/LHCBetArea/LHCQuickMoneySetting.jsx'
import LHCQuickBet from '../../components/LHCBetArea/LHCQuickBet.jsx'
import { fetchUtil } from '../../helpers/utils'
import LHCPlays from '../LHCPlays/LHCPlays'

import {
  setPopupInfo,
  getUserInfo
} from '../../redux/actions/index'

class BetArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuickSettingWin: false,
      showQuickBetWin: false,
      betResult: {},
      goldList: [1, 5, 10, 20],
      status: 1,
      isBetting: false
    }
    this.selectedTab = null
    this.data = {}
    this.renderTabs = this.renderTabs.bind(this)
    this.betting = this.betting.bind(this)
  }

  componentDidMount() {
    fetchUtil({act: 103, lotteryId: this.props.lotteryId})
    .then((res) => {
      if (res) {
        this.setState({
          goldList: res.gold_value,
          status: res.status
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playWay !== nextProps.playWay) {
      this.selectedTab = null
      this.data = null
      this.setState({
        betResult: {},
        showQuickSettingWin: false,
        showQuickBetWin: false
      })
    }

  }

  handleClick(tab, event) {
    this.selectedTab = tab
    this.setState({
      betResult: {}
    })
  }

  renderTabs(tabs) {
    if (!tabs){
      return null
    } else {
      let PLType = this.props.playWay.type
      let displayOdds = false
      return (
        <div className="tabs">
        {
          tabs.map((tab, index) => {
            if (this.selectedTab === null && tab.defaultSelected) {
              this.selectedTab = {
                type: tab.type,
                name: tab.name
              }
            }
            if (this.selectedTab && tab.type === this.selectedTab.type) {
              if (PLType === 'hexiao') {
                this.data = tab.subTabs
              } else if (PLType === 'lianma') {
                this.data = {}
                this.data['subTabs'] = tab.subTabs
                this.data['series'] = tab.series

              } else {
                this.data = tab.items
              }

              if (this.selectedTab === null && tab.defaultSelected === true) {
                this.selectedTab = {
                  type: tab.type,
                  name: tab.name
                }
              }
            }
            let odds = 0
            if (PLType === 'lianma' || PLType === 'zixuanbuzhong' || PLType === 'zhongyi') {
              displayOdds = true
              odds = this.props.playAttr.odds[tab.type]
            }
            return (
              <div key={index} onClick={this.handleClick.bind(this, {type: tab.type, name: tab.name})}
                className={this.selectedTab && tab.type === this.selectedTab.type ? 'tab-selected' : 'false'}>
                <label>{tab.name}</label>
                {
                  !!displayOdds && (
                    <span>{odds}</span>
                  )
                }
              </div>
            )
          })
        }
      </div>
      )
    }
  }

  handleBet() {
    this.setState({isBetting: true}, () => {
      let betResult = this.state.betResult
      let bet = {}
      let orders = {}
      let odds = this.props.playAttr.odds
      for (let key of Object.keys(betResult)) {
        orders[key]= {
          money: betResult[key].toString(),
          odds: odds[key]
        }
      }
      bet['gameNum'] = this.props.playWay.id

      bet['orders'] = orders
      bet['act'] = 102
      if (this.selectedTab) {
        bet['model'] = this.selectedTab.type
      }
      this.betting(bet, (success) => {
        if (success) {
          this.setState({
            betResult: {},
            isBetting: false
          })
        } else {
          this.setState({
            isBetting: false
          })
        }

      })
    })

  }

  betting(betResult, betCallBack) {
    const { userInfo, setPopupInfo, getUserInfo, playAttr, lotteryId } = this.props
    let orders = betResult.orders
    let totalMoney = 0
    let lowerSingle = false, exceededSingle = false
    if (orders) {
      for (let key of Object.keys(orders)) {
        if (!orders[key] || orders[key].money === '' || orders[key].money <= 0) {
          delete orders[key]
        } else {
          totalMoney += Number(orders[key].money)
        }
        if (orders[key]) {
          if (Number(orders[key].money) < Number(playAttr.play_stake_bet_min_money)) {
            lowerSingle = true
          } else if (Number(orders[key].money) > Number(playAttr.play_stake_bet_max_money)) {
            exceededSingle = true
          }
        }

      }
    }
    let betNum = playAttr.lhc_type_id === 6 ? 1 :  Object.keys(orders).length
    if (lowerSingle
      || (betResult.money && Number(betResult.money) < Number(playAttr.play_stake_bet_min_money))) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: `该玩法单注金额不得低于 ${playAttr.play_stake_bet_min_money}`,
        autoShutDown: '取消',
        action: {
          '确定': 'cancel',
        }
      }
      betCallBack()
      setPopupInfo(info)
    } else if (exceededSingle
      || (betResult.money && Number(betResult.money) > Number(playAttr.play_stake_bet_max_money))) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: `该玩法单注金额不得高于 ${playAttr.play_stake_bet_max_money}`,
        autoShutDown: '取消',
        action: {
          '确定': 'cancel',
        }
      }
      betCallBack()
      setPopupInfo(info)
    } else if (totalMoney > Number(playAttr.play_item_bet_max_money)
      || (betResult.money && (Number(betResult.money)  * betNum) > Number(playAttr.play_item_bet_max_money))) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: `该玩法单笔金额不得高于 ${playAttr.play_item_bet_max_money}`,
        autoShutDown: '取消',
        action: {
          '确定': 'cancel',
        }
      }
      betCallBack()
      setPopupInfo(info)
    } else if (!betResult || !betResult.orders || Object.keys(betResult.orders).length <= 0) {
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
      betResult.lotteryId = lotteryId
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
            betCallBack(true)
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

  handleCancelClick() {
    this.setState({
      betResult: {}
    })
  }

  handleBetResult(action, name, value) {
    let betResult = this.state.betResult
    if (action === 'add') {
      betResult[name] = value
    } else if (action === 'del'){
      delete betResult[name]
    } else if (action === 'reset') {
      betResult = value
    }
    this.setState({
      betResult: betResult
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

  render() {
    const { playWay, shengXiao, playAttr } = this.props
    const { isBetting, status, goldList, betResult } = this.state
    if (!playWay) {
      return null
    } else {
      return (
        <div className="lhc-bet-area">
          <div className="tool-bar">
            <div className="funs">
              <div className="quick-money-setting" onClick={e => {this.setState({showQuickSettingWin: true})}}>
                <i className="iconfont ">&#xe602;</i>
                <span>快捷金额设置</span>
              </div>
              {
                !!playWay.quickBet && (
                  <div className="quick-bet" onClick={e => {
                      let showQuickBetWin = this.state.showQuickBetWin
                      this.setState({showQuickBetWin: !showQuickBetWin})
                    }}>
                    <i className={`iconfont ${!!playWay.quickBet && !!this.state.showQuickBetWin ? 'icon-arrow-down' : 'icon-arrow-up'}`} />
                    <span>快捷投注</span>
                  </div>
                )
              }
            </div>

            {
              !!playWay.quickBet && !!this.state.showQuickBetWin && (
                <LHCQuickBet
                  type={(this.selectedTab && this.selectedTab.type) || playWay.type}
                  betResult={this.state.betResult}
                  setBetResult={this.handleBetResult.bind(this)}
                  shengXiao={shengXiao}
                  />
              )
            }
          </div>
          {
            this.renderTabs(playWay.tabs)
          }
          <LHCPlays
            selectedTab={this.selectedTab}
            betting={this.betting}
            data={this.data}
            playWay={playWay}
            shengXiao={shengXiao}
            playAttr={playAttr}
            isBetting={isBetting}
            status={status}
            goldList={goldList}
            betResult={betResult}
            setBetResult={this.handleBetResult.bind(this)}
            handleCancelClick={this.handleCancelClick.bind(this)}
            handleBet={this.handleBet.bind(this)} />
          {
            !!this.state.showQuickSettingWin &&
            <LHCQuickMoneySetting
              goldList={this.state.goldList}
              status={this.state.status}
              setting={this.settingQuickConfig.bind(this)}
              closeWin={() => {this.setState({showQuickSettingWin: false})}}/>
          }
        </div>
      )
    }
  }

}


const mapStateToProps = (state) => {
  const { userInfo, popupInfo, currentLottery } = state
  return {
    userInfo,
    popupInfo,
    shengXiao: currentLottery.shengXiao,
    typeList: currentLottery.typeList,
    lotteryId: currentLottery.lotteryId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setPopupInfo: (info) => {
      dispatch(setPopupInfo(info))
    },
    getUserInfo: () => {
      dispatch(getUserInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetArea)
