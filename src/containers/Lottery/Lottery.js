import React from 'react'
import { connect } from 'react-redux'
import LHC from '../LHC/LHC'
import Newlhc from '../LHC/Newlhc'
import LotteryInfo from '../LotteryInfo/LotteryInfo'
import PlayChoice from '../../components/Lottery/PlayChoice'
import BetArea from '../BetArea/BetArea'
// import PCDD from '../PCDD/PCDD'
import PcEgg from '../PCDD/PcEgg.jsx'
import {
  initPlayWays,
  switchPlay,
  setPopupInfo,
  setCurrntIssue,
  setOrderInfoFromIndex,
  resetOrder,
  resetIssueList,
  setAnimals
} from '../../redux/actions/index'

class LotteryMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMethod: ''
    }
    this.firstFromIndexRandom = true
    this.renderLottery = this.renderLottery.bind(this)
  }

  componentDidMount() {
    const { initPlayWays, currentLottery } = this.props
    const { lotteryId, playId } = this.props.match.params
    // FIXME 对香港六合彩做特殊处理，因为香港六合彩并没有 layout 返回值，让Bruce后续进一步处理。 FUCK
    if (currentLottery && currentLottery.lotteryId === lotteryId && lotteryId !== '20') {
      this.switchMethod(currentLottery.layout.filter(n => n.selected)[0].detail[0].method[0])
    } else {
      initPlayWays(lotteryId, playId)
    }
  }

  getSelectData(lotteryId, selectNum) {
    let selected = {}
    let selectList = selectNum.split(',')
    if (lotteryId === 1) {
      selected['万位'] = Array.of(Number(selectList[0]))
      selected['千位'] = Array.of(Number(selectList[1]))
      selected['百位'] = Array.of(Number(selectList[2]))
      selected['十位'] = Array.of(Number(selectList[3]))
      selected['个位'] = Array.of(Number(selectList[4]))
    } else if (lotteryId === 6) {
      selected['号码'] = Array.of(Number(selectList[0]), Number(selectList[1]))
    } else if (lotteryId === 11) {
      selected['第一位'] = Array.of(selectList[0])
      selected['第二位'] = Array.of(selectList[1])
      selected['第三位'] = Array.of(selectList[2])
    } else if (lotteryId === 16) {
      selected['百位'] = Array.of(Number(selectList[0]))
      selected['十位'] = Array.of(Number(selectList[1]))
      selected['个位'] = Array.of(Number(selectList[2]))
    } else if (lotteryId === 19) {
      selected['第一位'] = Array.of(selectList[0])
    } else if (lotteryId === 4) {
      selected['万位'] = Array.of(Number(selectList[0]))
      selected['千位'] = Array.of(Number(selectList[1]))
      selected['百位'] = Array.of(Number(selectList[2]))
      selected['十位'] = Array.of(Number(selectList[3]))
      selected['个位'] = Array.of(Number(selectList[4]))
    } else if (lotteryId === 17) {
      selected['百位'] = Array.of(Number(selectList[0]))
      selected['十位'] = Array.of(Number(selectList[1]))
      selected['个位'] = Array.of(Number(selectList[2]))
    } else if (lotteryId === 3) {
      selected['万位'] = Array.of(Number(selectList[0]))
      selected['千位'] = Array.of(Number(selectList[1]))
      selected['百位'] = Array.of(Number(selectList[2]))
      selected['十位'] = Array.of(Number(selectList[3]))
      selected['个位'] = Array.of(Number(selectList[4]))
    } else if (lotteryId === 23) {
      selected['万位'] = Array.of(Number(selectList[0]))
      selected['千位'] = Array.of(Number(selectList[1]))
      selected['百位'] = Array.of(Number(selectList[2]))
      selected['十位'] = Array.of(Number(selectList[3]))
      selected['个位'] = Array.of(Number(selectList[4]))
    }

    return selected
  }

  componentWillReceiveProps(nextProps) {
    this.setRandomNum = false
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const { lotteryId } = nextProps.match.params
      this.props.initPlayWays(lotteryId)
    }
    if ((nextProps.currentLottery && nextProps.currentLottery.layout
      && nextProps.currentLottery.layout.filter(n => n.selected)[0].name !== (this.props.currentLottery.layout &&
      this.props.currentLottery.layout.filter(n => n.selected)[0].name))
      || (nextProps.currentLottery && this.props.currentLottery && nextProps.currentLottery.layout
          && nextProps.currentLottery.lotteryId !== this.props.currentLottery.lotteryId )) {
      this.switchMethod(nextProps.currentLottery.layout.filter(n => n.selected)[0].detail[0].method[0])
    }
  }

  switchMethod(currentMethod) {
    this.setState({
      currentMethod: currentMethod
    })
    const { resetOrder, currentLottery } = this.props
    if (this.firstFromIndexRandom && this.props.match.params.playId) {
      this.firstFromIndexRandom = false
      const { lotteryId, totalPrice, selectNum } = this.props.match.params
      let selected = this.getSelectData(lotteryId, selectNum)
      resetOrder(currentMethod.name, currentMethod.real_name, currentMethod.play_id,
        currentLottery.categoryId, currentLottery.lotteryId, Number(totalPrice), Number(totalPrice), selected, 1)
    } else {
      resetOrder(currentMethod.name, currentMethod.real_name, currentMethod.play_id,
        currentLottery.categoryId, currentLottery.lotteryId)
    }
  }

  renderLottery() {
    const { currentLottery, switchPlay, orderList, planList } = this.props
    let lotteryId = Number(currentLottery.lotteryId)
    if (lotteryId === 20 || lotteryId === 26) {
      return <LHC typeList={currentLottery.typeList} />
    } else if (lotteryId === 27 || lotteryId === 28) {
      return <Newlhc />
    } else if (lotteryId === 21 || lotteryId === 22) {
      return (
        // <PCDD
        //   data={currentLottery.lotteryInfo}
        //   lotteryId={currentLottery.lotteryId}
        //   currentIssue={currentLottery.currentIssue}/>
        <PcEgg
          data={currentLottery.typeList}
          lotteryId={currentLottery.lotteryId}
          currentIssue={currentLottery.currentIssue}
        />
      )

    } else {
      return (
        <div>
          <PlayChoice
            data={currentLottery.layout}
            switchPlay={switchPlay}
            switchMethod={this.switchMethod.bind(this)}
            currentPlayId={this.state.currentMethod.play_id}/>
          <BetArea currentMethod={this.state.currentMethod} orderList={orderList} planList={planList}/>
        </div>
      )
    }
  }

  render() {
    const { currentLottery, sysInfo, resetIssueList,
      orderInfo, orderList, planList, setPopupInfo, setCurrntIssue } = this.props
    const { lotteryId } = this.props.match.params
    if (sysInfo.showLoading || !currentLottery.lotteryId) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px'}}>
          <img src={require('../../styles/img/maintain.png')} alt="LOGO" style={{width: '432px', height: '450px'}}/>
        </div>
      )
    } else {
      return (
        <div className="lottery-main">
          <LotteryInfo
            setAnimals={this.props.setAnimals}
            lotteryId={lotteryId}
            clearBetInfo={
              (orderInfo && orderInfo.betNum > 0)
              || (orderList && orderList.length > 0)
              || (planList && planList.length > 0)
            }
            setCurrntIssue={setCurrntIssue}
            setPopupInfo={setPopupInfo}
            resetIssueList={resetIssueList}
            currentLottery={currentLottery}/>
          {
            this.renderLottery()
          }
        </div>
      )
    }


  }

}

const mapStateToProps = (state) => {
  const { currentLottery, orderInfo, orderList, planList, routing, sysInfo } = state
  return {
    currentLottery,
    orderInfo,
    orderList,
    planList,
    sysInfo,
    routing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setAnimals: (value)=>{
      dispatch(setAnimals(value))
    },
    initPlayWays: (lotteryId, playId) => {
      dispatch(initPlayWays(lotteryId, playId))
    },
    switchPlay: (index) => {
      dispatch(switchPlay(index))
    },
    setPopupInfo: (info) => {
      dispatch(setPopupInfo(info))
    },
    setCurrntIssue: (issue) => {
      dispatch(setCurrntIssue(issue))
    },
    setOrderInfoFromIndex: (lotteryId, multiple, totalPrice, selectNum) => {
      dispatch(setOrderInfoFromIndex(lotteryId, multiple, totalPrice, selectNum))
    },
    resetOrder: (name, realName, playId, categoryId, lotteryId, amount, total, selected, betNum) => {
      dispatch(resetOrder(name, realName, playId, categoryId, lotteryId, amount, total, selected, betNum))
    },
    resetIssueList: () => {
      dispatch(resetIssueList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LotteryMain)
