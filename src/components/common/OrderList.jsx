import React from 'react'
import { connect } from 'react-redux'
import { SetBetData, SetShowBetData, SetOrderMoney, SetOrderConfirm,
  SetCurrentBetData, SetChaseState, setPopupInfo, SetShowBetConfirm,
  GetIssueList, SetTotalCost, SetTabIndex } from '../../redux/actions'
import { Scrollbars } from 'react-custom-scrollbars'
import { getRandomArrayElements, fiftyArray, getRandomMAXMIN, MathMul, MathDiv } from '../../helpers/utils'
import { Switch } from 'antd'
import Slider from 'rc-slider'
import Immutable from 'immutable'

class OrderList extends React.Component {
  constructor(props){
  	super(props)
  	this.state = {
      value: 0,
      orderBetData: false,
      award: 0,
      orderMoney: 2
    }
    this.betContinue = true
  }

  componentWillUpdate(nextProps, nextState) {
    const { SetTotalCost, layout } = this.props
    if (!Immutable.is(Immutable.fromJS(this.props.lhcBetData.betData), Immutable.fromJS(nextProps.lhcBetData.betData))) {
      let totalCost = 0
      nextProps.lhcBetData.betData.map((item, index) => totalCost += Number(item.value))
      SetTotalCost(totalCost)
    }
    if (layout.name !== nextProps.layout.name) {
      this.setState({
        award: 0,
        value: 0
       })
       this.props.SetSliderValue(0)
    }
  }

  onSliderChange = (value) => {
    this.setState({value: value})
    this.props.SetSliderValue(value)
  }

  SyncOddMoney = () => {
    let orderBetData = []
    const { lhcBetData, SetCurrentBetData, data, layout, currentLottery } = this.props
    const { playWay, tabIndex, showBetData, quickMoney, currentBetData , subTabIndex} = lhcBetData
    const { value, orderMoney } = this.state
    let odds = 1, rebate= 0
    this.betContinue = true
    if (playWay.id === '48') { // 连码
      const max = playWay.play[0].detail[tabIndex].maxOdds.split(',')
      const min = playWay.play[0].detail[tabIndex].minOdds.split(',')
      const subName = subTabIndex || subTabIndex === 0 ? `-${layout.subTabs[subTabIndex]}` : ''
      if (tabIndex === 2 || tabIndex === 4) {
        odds = (max[0]-(max[0]-min[0])*value/100).toFixed(3) + ',' + (max[1]-(max[1]-min[1])*value/100).toFixed(3)
      } else {
        odds = (max-(max-min)*value/100).toFixed(3)
      }
      currentBetData.map((item, index) => {
        item.odds = odds
        item.number = item.content.toString()
        item.name = `${playWay.name}-${playWay.play[0].detail[tabIndex].name}${subName}`
        item.rebate = (value/100).toFixed(3)
        item.value = orderMoney
        item.playId = playWay.play[0].detail[tabIndex].id
        item.stakeBetMinMoney = playWay.play[0].detail[0].stakeBetMinMoney
        item.stakeBetMaxMoney = playWay.play[0].detail[0].stakeBetMaxMoney
        return true
      })
      orderBetData = currentBetData
    }
    else if (playWay.id === '43' || playWay.id === '44') { // 特码 正码
      Object.keys(showBetData).map((item, index) => {
        const max = playWay.play[tabIndex].detail[Number(item)-1].maxOdds
        const min = playWay.play[tabIndex].detail[Number(item)-1].minOdds
        const name = playWay.id === '45' ? `${playWay.name}-${playWay.play[tabIndex].groupName}` : playWay.name
        odds = (max-(max-min)*value/100).toFixed(3)
        rebate = value*this.props.lhcBetData.reBate/100
        return orderBetData.push({
                  playId: playWay.play[tabIndex].detail[Number(item)-1].id,
                  number: item,
                  name: name,
                  odds,
                  rebate,
                  value: showBetData[item] ? showBetData[item] : quickMoney,
                  stakeBetMinMoney: playWay.play[0].detail[Number(item)-1].stakeBetMinMoney,
                  stakeBetMaxMoney: playWay.play[0].detail[Number(item)-1].stakeBetMaxMoney
               })
        })
    }
    else if (playWay.id === '42') { // 两面
      Object.keys(showBetData).map((item, index) => {
        const max = playWay.play[tabIndex].detail[Number(item)-1].maxOdds
        const min = playWay.play[tabIndex].detail[Number(item)-1].minOdds
        odds = (max-(max-min)*value/100).toFixed(3)
        rebate = value*this.props.lhcBetData.reBate/100
        return orderBetData.push({
                  playId: playWay.play[tabIndex].detail[Number(item)-1].id,
                  number: data[Number(item)-1].name,
                  name: playWay.name,
                  odds,
                  rebate,
                  value: showBetData[item] ? showBetData[item] : quickMoney,
                  stakeBetMinMoney: playWay.play[0].detail[Number(item)-1].stakeBetMinMoney,
                  stakeBetMaxMoney: playWay.play[0].detail[Number(item)-1].stakeBetMaxMoney
               })
        })
    }
    else if (playWay.id === '46') { // 正码1-6
      Object.keys(showBetData).map((item, index) => {
        const max = data[Number(item)-1].maxOdds
        const min = data[Number(item)-1].minOdds
        odds = (max-(max-min)*value/100).toFixed(3)
        rebate = value*this.props.lhcBetData.reBate/100
        return orderBetData.push({
                  playId: data[Number(item)-1].id,
                  number: `${data[Number(item)-1].name}`,
                  name: `${playWay.name}-${data[Number(item)-1].groupName}`,
                  odds,
                  rebate,
                  value: showBetData[item] ? showBetData[item] : quickMoney,
                  stakeBetMinMoney: data[Number(item)-1].stakeBetMinMoney,
                  stakeBetMaxMoney: data[Number(item)-1].stakeBetMaxMoney
               })
        })
    }
    else if (playWay.id === '51' || playWay.id === '53' || playWay.id === '54' || playWay.id === '55' || playWay.id === '45') { // 生肖 正码特
      Object.keys(showBetData).map((item, index) => {
        const max = playWay.play[tabIndex].detail[Number(item)-1].maxOdds
        const min = playWay.play[tabIndex].detail[Number(item)-1].minOdds
        odds = (max-(max-min)*value/100).toFixed(3)
        rebate = value*this.props.lhcBetData.reBate/100
        return orderBetData.push({
                  playId: playWay.play[tabIndex].detail[Number(item)-1].id,
                  number: `${playWay.play[tabIndex].detail[Number(item)-1].name}`,
                  name: `${playWay.name}-${layout.name}`,
                  odds,
                  rebate,
                  value: showBetData[item] ? showBetData[item] : quickMoney,
                  stakeBetMinMoney: playWay.play[tabIndex].detail[Number(item)-1].stakeBetMinMoney,
                  stakeBetMaxMoney: playWay.play[tabIndex].detail[Number(item)-1].stakeBetMaxMoney
               })
        })
    }
    else if (playWay.id === '49') { // 连肖连尾
      currentBetData.map((item, index) => {
        const max = Math.min(...item.maxOdds)
        const min = Math.min(...item.minOdds)
        item.odds = (max-(max-min)*value/100).toFixed(3)
        item.number = item.number.toString()
        item.rebate = value*this.props.lhcBetData.reBate/100
        item.name = `${playWay.name}-${playWay.play[tabIndex].groupName}`
        item.value = orderMoney
        item.stakeBetMinMoney = playWay.play[0].detail[0].stakeBetMinMoney
        item.stakeBetMaxMoney = playWay.play[0].detail[0].stakeBetMaxMoney
        return true
      })
        orderBetData = currentBetData
    }
    else if (playWay.id === '50' || playWay.id === '56' ) { // 自选不中 中一
      const name = `${playWay.name}-${playWay.play[0].detail[tabIndex].name}`
      currentBetData.map((item, index) => {
        const max = item.maxOdds
        const min = item.minOdds
        item.odds = (max-(max-min)*value/100).toFixed(3)
        item.rebate = value*this.props.lhcBetData.reBate/100
        item.name = name
        item.value = orderMoney
        item.stakeBetMinMoney = playWay.play[0].detail[tabIndex].stakeBetMinMoney
        item.stakeBetMaxMoney = playWay.play[0].detail[tabIndex].stakeBetMaxMoney
        return true
      })
        orderBetData = currentBetData
    }
    else if (playWay.id === '52' ) { // 合肖
      const name = playWay.name
      currentBetData.map((item, index) => {
        let max=0, min=0
        item.maxOdds.map((subItem, subIndex) => max += Number(subItem))
        item.minOdds.map((subItem, subIndex) => min += Number(subItem))
        const odds = (MathDiv(max, MathMul(Object.keys(showBetData).length, Object.keys(showBetData).length))-((MathDiv(max, MathMul(Object.keys(showBetData).length, Object.keys(showBetData).length))-MathDiv(min, MathMul(Object.keys(showBetData).length, Object.keys(showBetData).length))))*value/100).toFixed(3)
        item.odds = odds
        item.rebate = value*this.props.lhcBetData.reBate/100
        item.name = name
        item.value = orderMoney
        item.stakeBetMinMoney = playWay.play[0].detail[0].stakeBetMinMoney
        item.stakeBetMaxMoney = playWay.play[0].detail[0].stakeBetMaxMoney
        return true
      })
        orderBetData = currentBetData
    }
    else if (playWay.id === '47') { // 正码过关
      let playId = [], number = [], name = [playWay.name]
      Object.keys(showBetData).map((item, index) => {
        const max = data[Number(item)-1].maxOdds
        const min = data[Number(item)-1].minOdds
        name.push(` ${data[Number(item)-1].groupName}`)
        odds = odds * (max-(max-min)*value/100)
        rebate = value*this.props.lhcBetData.reBate/100
        playId.push(data[Number(item)-1].id)
        number.push(`${data[Number(item)-1].name}`)
        return true
      })
      if (playId.length > 0 && number.length > 0) {
        orderBetData.push({
          playId: playId.join(','),
          number: number.join(','),
          name,
          odds: odds.toFixed(3),
          rebate,
          value: orderMoney,
          stakeBetMinMoney: playWay.play[0].detail[0].stakeBetMinMoney,
          stakeBetMaxMoney: playWay.play[0].detail[0].stakeBetMaxMoney
       })
      }
    }
    else if (currentLottery.categoryId === '6' ) { // 混合
      Object.keys(showBetData).map((item, index) => {
        const max = showBetData[item].maxOdds
        const min = showBetData[item].minOdds
        return orderBetData.unshift({
                  playId: showBetData[item].id,
                  number: showBetData[item].name,
                  odds: (odds * (max-(max-min)*value/100)).toFixed(3),
                  rebate: value*this.props.lhcBetData.reBate/100,
                  value: showBetData[item].money,
                  name: showBetData[item].label
               })
      })
    }
    SetCurrentBetData(orderBetData)
  }

  async orderConfirm () {
    await this.SyncOddMoney()
    const { SetBetData, currentBetData, betData, SetShowBetData, SetCurrentBetData, lhcBetData, setPopupInfo } = this.props
    const { showBetData, playWay, subTabIndex } = lhcBetData
    const { orderMoney } = this.state
    const dataMap = [ ...currentBetData, ...betData]
    if (playWay.id === '52' && (Object.keys(showBetData).length > 11 || Object.keys(showBetData).length <= 1)) {
      setPopupInfo({
        type: 'WARN',
        title: '温馨提示',
        content: '玩法生肖个数2-11',
        action: {
          '确定': 'cancel'
        }
      })
      this.betContinue = false
    }
    if (playWay.id === '49' && Object.keys(showBetData).length < 2) { //连肖连尾
      setPopupInfo({
        type: 'WARN',
        title: '温馨提示',
        content: '玩法个数2-6',
        action: {
          '确定': 'cancel'
        }
      })
      this.betContinue = false
    }
    if (playWay.id === '42' || playWay.id === '43' || playWay.id === '44' ||
    playWay.id === '42' || playWay.id === '45' || playWay.id === '51' || playWay.id === '53'
    || playWay.id === '54' || playWay.id === '55' || !Number(this.state.orderMoney) ) { // 输入框校验
      Object.keys(showBetData).map((item, index) => {
        if (!Number(showBetData[`${item}`]) ) {
          setPopupInfo({
            type: 'WARN',
            title: '温馨提示',
            content: '请添加有效投注金额',
            action: {
              '确定': 'cancel'
            }
          })
          this.betContinue = false
        }
        return true
      })
    }
    if (playWay.id === '48') { //连码
      if (subTabIndex === 1 && currentBetData.length < 1) {
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '该玩法必选2个',
          action: {
            '确定': 'cancel'
          }
        })
        this.betContinue = false
      }
      if (orderMoney === '0' || !orderMoney) {
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '请添加有效投注金额',
          action: {
            '确定': 'cancel'
          }
        })
        this.betContinue = false
      }
    }
    if (playWay.id === '47' && Object.keys(showBetData).length < 2) { // 正码过关
      setPopupInfo({
        type: 'WARN',
        title: '温馨提示',
        content: '至少选择两个号码',
        action: {
          '确定': 'cancel'
        }
      })
      this.betContinue = false
    }
    if (this.betContinue) {
      SetBetData(dataMap)
      this.setState({
        orderBetData: betData,
        award: 0
      }, ()=>SetCurrentBetData([]))
      SetShowBetData({})
      this.props.SetOrderConfirm(!lhcBetData.OrderConfirm)
    }
  }

  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min
  }

  /*
   验证随机数
   var sum = {}
   for (var i = 0; i < 100000; i++) {
     if (!sum[`${getRandomArbitrary(1, 49).toFixed(0)}`]) {
       sum[`${getRandomArbitrary(1, 49).toFixed(0)}`] = 1
     } else {
       sum[`${getRandomArbitrary(1, 49).toFixed(0)}`] += 1
     }
   }
   console.log('sum', sum)
   */

  lianxiaoRandom = (length, times) => {
    let number = []
     Array.from({length: times}).map((item, index) => {
       let num = []
       if (this.props.lhcBetData.tabIndex < 4) {
         getRandomArrayElements([0,1,2,3,4,5,6,7,8,9,10,11], length).map((item, index) => num.push(item))
       } else {
         getRandomArrayElements([0,1,2,3,4,5,6,7,8,9], length).map((item, index) => num.push(item))
       }
       return number.push(num)
     })
     return this.lianxiaoRandomOrder(number)
   }

  lianxiaoRandomOrder = (number) => {
    const { lhcBetData, SetBetData } = this.props
    const { orderBetData, orderMoney } = this.state
    const { tabIndex, playWay } = lhcBetData
    let betData = []
    number.map((item, index) => {
      let playId = [],
          odds = [],
          name = []
      item.map((subItem, subIndex) => {
        playId.push(playWay.play[tabIndex].detail[subItem].id)
        name.push(playWay.play[tabIndex].detail[subItem].name)
        odds.push(playWay.play[tabIndex].detail[subItem].maxOdds)
        return true
      })
      betData.push({
        playId: playId.join(','),
        number: name.join(','),
        odds: Math.min(...odds).toFixed(3),
        name: `${playWay.name}-${playWay.play[tabIndex].groupName}`,
        value: orderMoney,
        stakeBetMaxMoney: playWay.play[tabIndex].detail[0].stakeBetMaxMoney,
        stakeBetMinMoney: playWay.play[tabIndex].detail[0].stakeBetMinMoney
      })
      return true
    })
    this.setState({
      orderBetData: [...betData, ...orderBetData]
    })
    SetBetData([ ...betData, ...lhcBetData.betData])
  }

  randomNumber = (times) => {
    let number = []
    const id = Number(this.props.lhcBetData.playWay.id)
    const { lhcBetData, currentLottery } = this.props
    const { tabIndex } = lhcBetData
    if (String(currentLottery.categoryId) === '6') {
      Array.from({length: times}).map((item, index) =>
        number.push(Number(this.getRandomArbitrary(0, 4).toFixed(0)))
      )
    }
    else if (id === 42) {
      Array.from({length: times}).map((item, index) =>
        number.push(Number(this.getRandomArbitrary(0, 19).toFixed(0)))
      )
    }
    else if (id === 43 || id === 44 || id === 45) {
      Array.from({length: times}).map((item, index) =>
        number.push(Number(this.getRandomArbitrary(0, 48).toFixed(0)))
      )
    }
    else if (id === 55) { // 七码五行
      if (tabIndex === 0) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 15).toFixed(0)))
        )
      } else if (tabIndex === 1) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 4).toFixed(0)))
        )
      }
    }
    else if (id === 54) { // 尾数
      if (tabIndex === 0) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 14).toFixed(0)))
        )
      } else if (tabIndex === 1) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 9).toFixed(0)))
        )
      }
    }
    else if (id === 53) { // 色波
      if (tabIndex === 0) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 2).toFixed(0)))
        )
      } else if (tabIndex === 1 || tabIndex === 2) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 11).toFixed(0)))
        )
      } else if (tabIndex === 3) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 3).toFixed(0)))
        )
      }
    }
    else if (id === 51) { // 生肖
      if (tabIndex === 0 || tabIndex === 1 || tabIndex === 2) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 11).toFixed(0)))
        )
      } else if (tabIndex === 3) {
        Array.from({length: times}).map((item, index) =>
          number.push(Number(this.getRandomArbitrary(0, 5).toFixed(0)))
        )
      }
    }
    else if (id === 52) { // 合肖
      Array.from({length: times}).map((item, index) => {
        let num = []
        getRandomArrayElements([0,1,2,3,4,5,6,7,8,9,10,11], 2).map((subItem, subIndex) => num.push(subItem))
        return number.push(num)
      })
    }
    else if (id === 46) { // 正码1-6
      Array.from({length: times}).map((item, index) =>
        number.push(Number(this.getRandomArbitrary(0, 77).toFixed(0)))
      )
    }
    else if (id === 47) { // 正码过关
      Array.from({length: times}).map((item, index) => {
        let subNum = [], num = []
        subNum.push(Number(this.getRandomArbitrary(0, 12).toFixed(0)))
        subNum.push(Number(this.getRandomArbitrary(13, 25).toFixed(0)))
        subNum.push(Number(this.getRandomArbitrary(26, 38).toFixed(0)))
        subNum.push(Number(this.getRandomArbitrary(39, 51).toFixed(0)))
        subNum.push(Number(this.getRandomArbitrary(52, 64).toFixed(0)))
        getRandomArrayElements([0,1,2,3,4], 2).map((item, index) => num.push(subNum[item]))
        return number.push(num)
      })
    }
    else if (id === 48) { // 连码
      Array.from({length: times}).map((item, index) => {
        let num = []
        getRandomArrayElements(fiftyArray, this.props.lhcBetData.size).map((subItem, subIndex) => num.push(subItem))
        return number.push(num)
      })
    }
    else if (id === 49) { // 连肖连尾
      number = this.lianxiaoRandom(this.props.lhcBetData.size, times)
      return null
    }
    else if (id === 50 || id === 56) {  // 自选不中 中一
      Array.from({ length: times }).map((item, index) => {
        let num = []
        getRandomArrayElements(fiftyArray, this.props.lhcBetData.size).map((item, index) => num.push(item))
        number.push(num)
        return number
      })
    }
    this.randomOrder(number)
  }

  randomOrder = (number) => {
    let playId, max, min
    let betData = this.props.betData ? Immutable.fromJS(this.props.betData).toJS() : []
    const { lhcBetData, data, currentLottery, layout } = this.props
    const { playWay, tabIndex, subTabIndex } = lhcBetData
    const { id } = playWay
    const { value, orderMoney } = this.state
    if (id === '46') { //正码1-6
      number.map((item, index) => {
        max = data[item].maxOdds
        min = data[item].minOdds
        playId = data[item].id
        return  betData.unshift({
                  playId: playId,
                  value: 2,
                  odds: (max-(max-min)*value/100).toFixed(3),
                  name: `${playWay.name}-${data[item].groupName}`,
                  number: `${data[item].name}`,
                  rebate: value*lhcBetData.reBate/100,
                  stakeBetMinMoney: data[item].stakeBetMinMoney,
                  stakeBetMaxMoney: data[item].stakeBetMaxMoney,
                })
      })
    }
    else if (id === '47') { // 正码过关
      number.map((item, index) => {
        let name = [], max = 1, min = 1, playId = [], playName = [playWay.name]
        item.map((subItem, subIndex) => {
          playId.push(data[subItem].id)
          playName.push(` ${data[subItem].groupName}`)
          name.push(`${data[subItem].name}`)
          max = max * data[subItem].maxOdds
          min = min * data[subItem].minOdds
          return true
        })
        betData.unshift({
          playId: playId.join(','),
          number: name.join(','),
          value: orderMoney,
          name: playName,
          odds: (max-(max-min)*value/100).toFixed(3),
          rebate: value*lhcBetData.reBate/100,
          stakeBetMinMoney: data[0].stakeBetMinMoney,
          stakeBetMaxMoney: data[0].stakeBetMaxMoney,
        })
        return true
      })
    }
    else if (id === '42' || id === '43' || id === '44') { //两面
      const playName = playWay.name
      number.map((item, index) => {
        let name = [], max = 1, min = 1, playId = []
        playId.push(data[item].id)
        name.push(`${data[item].name}`)
        max = data[item].maxOdds
        min = data[item].minOdds
        return  betData.unshift({
                  playId: playId.join(','),
                  number: name.join(','),
                  name: playName,
                  value: 2,
                  odds: (max-(max-min)*value/100).toFixed(3),
                  rebate: value*lhcBetData.reBate/100,
                  stakeBetMinMoney: data[item].stakeBetMinMoney,
                  stakeBetMaxMoney: data[item].stakeBetMaxMoney,
                })
      })
    }
    else if (id === '55' || id === '54' || id === '51' || id === '45') { // 正码特 七码五行
      const playName = `${playWay.name}-${playWay.play[tabIndex].groupName}`
      number.map((item, index) => {
        let max = 1, min = 1
        max = playWay.play[tabIndex].detail[item].maxOdds
        min = playWay.play[tabIndex].detail[item].minOdds
        return  betData.unshift({
                  playId: playWay.play[tabIndex].detail[item].id,
                  number: playWay.play[tabIndex].detail[item].name,
                  name: playName,
                  value: 2,
                  odds: (max-(max-min)*value/100).toFixed(3),
                  rebate: value*lhcBetData.reBate/100,
                  stakeBetMinMoney: playWay.play[tabIndex].detail[item].stakeBetMinMoney,
                  stakeBetMaxMoney: playWay.play[tabIndex].detail[item].stakeBetMaxMoney,
                })
      })
    }
    else if (id === '50' || id === '56') { // 自选不中 中一
      number.map((item, index) => {
        let max = playWay.play[0].detail[tabIndex].maxOdds,
            min = playWay.play[0].detail[tabIndex].minOdds
        return betData.unshift({
                playId: playWay.play[0].detail[tabIndex].id,
                number: item.toString(),
                content: item.toString(),
                value: orderMoney,
                name: `${playWay.name}-${playWay.play[0].detail[tabIndex].name}`,
                odds: (max-(max-min)*value/100).toFixed(3),
                rebate: value*lhcBetData.reBate/100,
                stakeBetMinMoney: playWay.play[0].detail[tabIndex].stakeBetMinMoney,
                stakeBetMaxMoney: playWay.play[0].detail[tabIndex].stakeBetMaxMoney,
              })
      })
    }
    else if (id === '52') { // 合肖
      number.map((item, index) => {
        let name = [], max = 0, min = 0, playId = [], odds
        item.map((subItem, subIndex) => {
          playId.push(playWay.play[0].detail[subItem].id)
          name.push(`${playWay.play[0].detail[subItem].name}`)
          max += Number(playWay.play[0].detail[subItem].maxOdds)
          min += Number(playWay.play[0].detail[subItem].minOdds)
          odds = (MathDiv(max, MathMul(name.length, name.length)) - (MathDiv(max, MathMul(name.length, name.length))-MathDiv(min, MathMul(name.length, name.length)))*value/100).toFixed(3)
          return true
        })
        betData.unshift({
          playId: playId.join(','),
          number: name.join(','),
          name: playWay.name,
          value: orderMoney,
          odds: odds,
          rebate: value*lhcBetData.reBate/100,
          stakeBetMinMoney: playWay.play[0].detail[0].stakeBetMinMoney,
          stakeBetMaxMoney: playWay.play[0].detail[0].stakeBetMaxMoney,
        })
        return true
      })
    }
    else if (id === '53') { // 色波
     number.map((item, index) => {
       let name = [], max = 1, min = 1
       name.push(playWay.play[tabIndex].detail[item].name)
       max = playWay.play[tabIndex].detail[item].maxOdds
       min = playWay.play[tabIndex].detail[item].minOdds
       return  betData.unshift({
                 playId: playWay.play[tabIndex].detail[item].id,
                 number: name.join(','),
                 name: `${playWay.name}-${playWay.play[tabIndex].groupName}`,
                 value: 2,
                 odds: (max-(max-min)*value/100).toFixed(3),
                 rebate: value*lhcBetData.reBate/100,
                 stakeBetMinMoney: playWay.play[tabIndex].detail[item].stakeBetMinMoney,
                 stakeBetMaxMoney: playWay.play[tabIndex].detail[item].stakeBetMaxMoney,
               })
     })
    }
    else if (id === '48') { // 连码
      number.map((item, index) => {
        let max = playWay.play[0].detail[tabIndex].maxOdds,
            min = playWay.play[0].detail[tabIndex].minOdds,
            playName = subTabIndex || subTabIndex===0 ? `${playWay.name}-${playWay.play[0].detail[tabIndex].name}-${layout.subTabs[subTabIndex]}` : `${playWay.name}-${playWay.play[0].detail[tabIndex].name}`,
            odds
        if (tabIndex === 2 || tabIndex === 4) {
          odds = (max.split(',')[0]-(max.split(',')[0]-min.split(',')[0])*value/100).toFixed(3) + ',' + (max.split(',')[1]-(max.split(',')[1]-min.split(',')[1])*value/100).toFixed(3)
        } else {
          odds = (max-(max-min)*value/100).toFixed(3)
        }
        return  betData.unshift({
                  playId: playWay.play[0].detail[tabIndex].id,
                  content: item.toString(),
                  number: item.toString(),
                  value: orderMoney,
                  name: playName,
                  odds,
                  rebate: value*lhcBetData.reBate/100,
                  stakeBetMinMoney: playWay.play[0].detail[tabIndex].stakeBetMinMoney,
                  stakeBetMaxMoney: playWay.play[0].detail[tabIndex].stakeBetMaxMoney,
                })
      })
    }
    else if (currentLottery.categoryId === '6') { // PCegg
      number.map((item, index) => {
        const length = currentLottery.typeList[item].play[0].detail.length-1
        const randomIndex = Number(this.getRandomArbitrary(0, length).toFixed(0))
        const detail = currentLottery.typeList[item].play[0].detail[randomIndex]
        const content = item === 4 ? getRandomMAXMIN(0, 27, 3).join(',') : detail.name.toString()
        return betData.unshift({
                  playId: detail.id,
                  content: content,
                  number: content,
                  name: currentLottery.typeList[item].name,
                  value: orderMoney,
                  odds: (detail.maxOdds-(detail.maxOdds-detail.minOdds)*value/100).toFixed(3),
                  rebate: value*lhcBetData.reBate/100,
                  stakeBetMinMoney: detail.stakeBetMinMoney,
                  stakeBetMaxMoney: detail.stakeBetMaxMoney,
                })
      })
    }
    this.setState({
      orderBetData: betData
    })
    this.props.SetBetData(betData)
  }

  setOrderMoney = (value) => {
    this.setState({
      orderMoney: value
    })
    this.props.SetOrderMoney(value)
  }

  deleteOne = (index) => {
    let orderBetData = Immutable.fromJS(this.props.lhcBetData.betData).toJS()
    orderBetData.splice(index, 1)
    this.setState({
      orderBetData
    })
    this.props.SetBetData(orderBetData)
    this.props.SetTotalCost(0)
    if (orderBetData.length === 0) {
      this.props.SetChaseState(false)
    }
  }

  setBetMoney = (valueIndex, value) => {
    const betData = Immutable.fromJS(this.props.lhcBetData.betData).toJS()
    betData.map((item, index) => {
      if (valueIndex === index) {
        item.value = value
      }
      return true
    })
    this.props.SetBetData(betData)
  }

  beginBet = () => {
    const { lhcBetData } = this.props
    let goOn = true
    if (lhcBetData.betData && lhcBetData.betData.length > 0) {
      lhcBetData.betData.map((item, index) => {
        if (Number(item.value) < item.stakeBetMinMoney || Number(item.value) > item.stakeBetMaxMoney) {
          this.props.setPopupInfo({
            type: 'WARN',
            title: '温馨提示',
            content: `注单序号${index+1}投注金额${item.stakeBetMinMoney}-${item.stakeBetMaxMoney}`,
            action: {
              '确定': 'cancel'
            }
          })
          goOn = false
        }
        return true
      })
    } else {
      this.props.setPopupInfo({
        type: 'WARN',
        title: '温馨提示',
        content: `请添加注单`,
        action: {
          '确定': 'cancel'
        }
      })
      goOn = false
    }
    if (goOn) {
      this.props.SetShowBetConfirm(true)
    }
  }

  render () {
    const { lhcBetData, SetChaseState, GetIssueList } = this.props
    const { value, orderMoney } = this.state
    const { playWay, currentBetData, betData, tabIndex , reBate, showBetData} = lhcBetData
    const currentReBate = (value*reBate/100).toFixed(3)
    const orderMoneyTotal = (orderMoney*currentBetData.length).toFixed(3)
    let max=0,
        min=0,
        changeOdds
    if (playWay.id === '47') {
      max = currentBetData.length ? currentBetData[0].odds ? 0 : Number(currentBetData[0].maxOdds) : 0
      min = currentBetData.length ? currentBetData[0].odds ? 0 : Number(currentBetData[0].minOdds) : 0
      changeOdds = Object.keys(showBetData).length > 1 ? (max-(max-min)*value/100).toFixed(3) : 0
    }
    else if (playWay.id === '52' && currentBetData.length) {
      currentBetData[0].maxOdds.map((item, index) => max +=Number(item))
      currentBetData[0].minOdds.map((item, index) => min +=Number(item))
      let MAXODDS = MathDiv(max, MathMul(currentBetData[0].maxOdds.length, currentBetData[0].maxOdds.length)),
          MINODDS = MathDiv(min, MathMul(currentBetData[0].minOdds.length, currentBetData[0].minOdds.length))
      changeOdds = (MAXODDS-(MAXODDS-MINODDS)*value/100).toFixed(3)
    }
    else if (playWay.id === '50' || playWay.id === '56') {
      max = playWay.play[0].detail[tabIndex].maxOdds
      min = playWay.play[0].detail[tabIndex].minOdds
      changeOdds = (max-(max-min)*value/100).toFixed(3)
    }
    else if (playWay.id === '48') {
      max = playWay.play[0].detail[tabIndex].maxOdds
      min = playWay.play[0].detail[tabIndex].minOdds
      if (tabIndex === 2 || tabIndex === 4) {
        changeOdds = (max.split(',')[0]-(max.split(',')[0]-min.split(',')[0])*value/100).toFixed(3) + ',' +
                    (max.split(',')[1]-(max.split(',')[1]-min.split(',')[1])*value/100).toFixed(3)
      } else {
        changeOdds = (max-(max-min)*value/100).toFixed(3)
      }
    }
    else {
      changeOdds = null
    }

    return(
      <div className='addOrder'>
        <div className='setting-wrap'>
          <div  className='addOrder-left'>
            {
              playWay.id === '48' || playWay.id === '47' || playWay.id === '49' || playWay.id === '50' || playWay.id === '52' || playWay.id === '56' ?
              <div className='addOrder-number'>
                <p>共 <span>{ currentBetData.length }</span> 注，单注金额：
                  <input
                    value={orderMoney}
                    type="number"
                    min="1"
                    onChange={ e => {
                      this.setOrderMoney(e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,''))
                    }}
                    />元，
                  共 <span>{ orderMoneyTotal }</span> 元
                </p>
              </div> : null
            }
            <div className='addOdds-wrap'>
              <div className='addOrder-odds'>
                <p className='addOrder-font'>{ changeOdds }</p>
                <p className='addOrder-font'>{ currentReBate }%</p>
              </div>
              <div className='addOrder-top'>
                <p className='addOrder-font'>赔率调节</p>
                <Slider
                  className='slider'
                  defaultValue={1}
                  value={this.state.value}
                  onChange={this.onSliderChange}
                  onAfterChange={this.onAfterChange}
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
                <p className='addOrder-font-left'>返利</p>
              </div>
            </div>
          </div>
          <div className='addOrder-button' onClick={()=>this.orderConfirm()}>
            <span className='button-font'>添加注单</span>
          </div>
        </div>
        <div className='bet-result'>
          <div className="order-area">
            <div className="bet-table">
              <div className="table-cap">
                <div className="cap-ct"></div>
              </div>
              <div className="tb-ct">
                <div className="tb-header">
                  <div style={{flex: 1}}>序号</div>
                  <div style={{flex: 1}}>玩法</div>
                  <div style={{flex: 1}}>号码</div>
                  <div style={{flex: 1}}>赔率</div>
                  <div style={{flex: 1}}>金额</div>
                  <div className="tb-del">&nbsp;</div>
                </div>
                <div className="tb-body">
                  <Scrollbars autoHide={true} style={{ flex: 1, width: '100%' }}>
                  {
                    lhcBetData.betData ?
                    lhcBetData.betData.map((item, index) => {
                      const playWayName = item.name
                      return (
                        <div className='order-body' key={index}>
                          <p>{index+1}</p>
                          <p>{ playWayName }</p>
                          <p>{item.number}</p>
                          <p className='order-body-odd'>{item.odds}</p>
                          <div className="amount">
                            <input
                              type="number"
                              min="1"
                              value={ item.value }
                              onChange={e => {
                                this.setBetMoney(index, e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,''))
                              }}
                            />
                          </div>
                          <div
                            className="order-del"
                            onClick={()=>this.deleteOne(index)}
                            >
                            <img src={require('../../styles/img/orderDelete.png')} alt=":"/>
                          </div>
                        </div>
                      )
                    }) : null
                  }
                  </Scrollbars>
                </div>
                <div className="tb-footer">
                  <div className="zhui-hao">
                    <div className="chase-choice">我要追号</div>
                    <Switch className="order-switch"
                      disabled={ betData.length === 0 }
                      checked={ lhcBetData.chaseState && betData.length !== 0 }
                      onChange={ e => {
                        SetChaseState(e)
                        if (e) {
                          GetIssueList()
                        }
                      }}
                      checkedChildren="开"
                      unCheckedChildren="关"
                      defaultunchecked="true" />
                  </div>
                  <div className="bet-total">
                    <span>方案注数<span>{betData.length}</span>注，总金额<span>{(lhcBetData.totalCost).toFixed(3)}</span>元</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='bet-actions'>
              <button onClick={ e => this.randomNumber(1)}>随机一注</button>
              <button onClick={ e => this.randomNumber(5)}>随机五注</button>
              <button onClick={ e => {
                  this.props.SetBetData([])
                  this.props.SetChaseState(false)
                }
                }>删除全部</button>
              <button
                className="bet-confirm"
                onClick={ () => this.beginBet() }>
                确认投注
              </button>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { lhcBetData, layout, currentLottery } = state
  return {
    layout,
    lhcBetData,
    currentLottery,
    betData: lhcBetData.betData,
    showBetData: lhcBetData.showBetData,
    currentBetData: lhcBetData.currentBetData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetBetData: (betData) => {
      dispatch(SetBetData(betData))
    },
    SetShowBetData: (betData) => {
      dispatch(SetShowBetData(betData))
    },
    SetCurrentBetData: (betData) => {
      dispatch(SetCurrentBetData(betData))
    },
    SetChaseState: (value) => {
      dispatch(SetChaseState(value))
    },
    GetIssueList: () => {
      dispatch(GetIssueList())
    },
    SetTotalCost: (totalCost) => {
      dispatch(SetTotalCost(totalCost))
    },
    SetTabIndex: (tabIndex) => {
      dispatch(SetTabIndex(tabIndex))
    },
    SetOrderMoney: (OrderMoney) => {
      dispatch(SetOrderMoney(OrderMoney))
    },
    setPopupInfo: (info, callBack) => {
      dispatch(setPopupInfo(info, callBack))
    },
    SetOrderConfirm: (info) => {
      dispatch(SetOrderConfirm(info))
    },
    SetShowBetConfirm: (info) => {
      dispatch(SetShowBetConfirm(info))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
