import React from 'react'
import { connect } from 'react-redux'
import BallsGrid from '../../components/common/NewBallsGrid.jsx'
import OrderList from '../../components/common/OrderList.jsx'
import ZhengFuNum from '../../components/LHCPlayLianMA/ZhengFuNum.jsx'
import XiaoChuanWeiShu from '../../components/LHCPlayLianMA/NewXiaoChuanWeiShu.jsx'
import JiaoChaPeng from '../../components/LHCPlayLianMA/NewJCPeng.jsx'
import DanTuo from '../../components/LHCPlayLianMA/NewDanTuo.jsx'
import DanTuoSeBo from '../../components/LHCPlayLianMA/NewDanTuoSeBo.jsx'
import DanTuoShengXiao from '../../components/LHCPlayLianMA/NewDanTuoShengXiao.jsx'
import ShengXiaoDuiPeng from '../../components/LHCPlayLianMA/NewShengXiaoDuiPeng.jsx'
import WeiShuDuiPeng from '../../components/LHCPlayLianMA/NewWeiShuDuiPeng.jsx'
import LhcChase from '../../components/BetArea/LhcChase.jsx'

class LianMa extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      money: 0,
      results: [],
      reset: false,
      betResult: {},
      subTab: "正/副号"
    }
    this.nums = []
    this.orders = {}
    this.renderContent = this.renderContent.bind(this)
    this.renderBetArea = this.renderBetArea.bind(this)
    this.handleSubTabs = this.handleSubTabs.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.getCombination = this.getCombination.bind(this)
    this.setBetResult = this.setBetResult.bind(this)
  }

  handleSubTabs(tab) {
    let selectedTab = ''
    if(tab === this.state.subTab){
      selectedTab = ''

    } else {
      selectedTab = tab
    }
    this.nums = [];
    this.setState({
      subTab: selectedTab,
      results: []
    })
  }

  renderBetArea() {
    const { shengXiao, data, layout } = this.props
    const { subLayout } = layout
    if(subLayout === '正/副号') {
      return <ZhengFuNum data={data} series={this.series} reset={this.state.reset} results={this.state.results}/>
    } else if(subLayout === '肖串尾数') {
      return <XiaoChuanWeiShu results={this.state.results} series={this.series} reset={this.state.reset}/>
    } else if(subLayout === '交叉碰') {
      return <JiaoChaPeng handleReset={this.handleReset} series={this.series} reset={this.state.reset} shengXiao={shengXiao}/>
    } else if(subLayout === '胆拖') {
      return <DanTuo handleReset={this.handleReset} series={this.series} reset={this.state.reset}/>
    } else if(subLayout === '胆拖色波') {
      return <DanTuoSeBo handleReset={this.handleReset} series={this.series} reset={this.state.reset}/>
    } else if(subLayout === '胆拖生肖') {
      return <DanTuoShengXiao handleReset={this.handleReset} series={this.series} reset={this.state.reset} shengXiao={shengXiao}/>
    } else if(subLayout === '生肖对碰') {
      return <ShengXiaoDuiPeng handleReset={this.handleReset} series={this.series} reset={this.state.reset} shengXiao={shengXiao}/>
    } else if(subLayout === '尾数对碰') {
      return <WeiShuDuiPeng handleReset={this.handleReset} series={this.series} reset={this.state.reset}/>
    } else {
      return <BallsGrid handleSelect={this.handleSelect} upperLimit="10" selectedBalls={this.nums}/>
    }
  }
  renderContent() {
    let data = this.props.layout;
    this.series = data.series;
    return (
      <div>
      {
        this.renderBetArea()
      }
      </div>
    )

  }

  handleSelect(action, num) {
    let nums = this.nums;
    if(action === 'add') {
      nums.push(num)
    } else if(action === 'del'){
      if(nums.includes(num)) {
        nums.splice(nums.indexOf(num), 1);
      }
    }
    let combination = this.getCombination(nums);
    this.setBetResult(combination, nums);
  }

  setBetResult(combination) {
    this.newBetResult(combination)
    let order_list = []
    combination.map((item, index) =>
      order_list.push({content: item})
    )
    const { orderInfo, play_id } = this.props
    const { money } = this.state
    let betResult = {}
    betResult.issue_no = orderInfo.issueNo
    let newlist = []
    Object.keys(order_list).map((item, index) =>
      newlist.push({
        ...order_list[item],
        money,
        mode: 1,
        point: '0.0',
        play_id: play_id,
        nums:1
      })
    )
    betResult.order_list = newlist
    betResult.win_stop = 1
    this.setState({
      reset: false,
      betResult: betResult
    })
  }

  getCombination(nums) {
    let combination = []
    let series = this.series
    if(nums && nums.length >= series ) {
      for(let a = 0; a < nums.length - (series - 1); a++) {
        for(let b = a + 1; b < nums.length - (series - 2); b++) {
          let com = nums[a] + ',  ' + nums[b];
          if (series > 2) {
            for(let c = b + 1; c < nums.length - (series - 3); c++) {
              let com_1 = com + ',  ' + nums[c];
              if (series > 3) {
                for(let d = c + 1; d < nums.length - (series - 4); d++) {
                  let com_2 = com_1 + ',  ' + nums[d];
                  combination.push(com_2)
                }
              } else {
                combination.push(com_1)
              }
            }
          } else {
            combination.push(com)
          }
        }
      }
    }
    return combination
  }

  newBetResult = (combination) => {
    const { lhcBetData, playWay } = this.props
    const { tabIndex } = lhcBetData
    let result = {},
        results = []
    for(let i = 0; i < combination.length; i++) {
      result = {}
      result.sequence = '组合' + (i + 1)
      result.combination = combination[i]
      result.odds = playWay.play[0].detail[tabIndex].maxOdds
      results.push(result)
    }
    this.setState({results})
  }

  setMoney = (money) => {
    this.setState({money})
  }


  render() {
    const { playWay, lhcBetData } = this.props
    const { chaseState } = lhcBetData
    let oddData = []
    playWay.play.map((item, index) => {
      item.detail.map((subItem, index)=> {
        return subItem.groupName = item.groupName
      })
      return oddData = [...oddData, ...item.detail]
    })

    return (
      <div className="lianma-area-new">
        {
          this.renderContent()
        }
        <OrderList SetSliderValue={this.props.SetSliderValue} playWay={playWay} data={oddData}/>
        {
          chaseState ? <LhcChase/> : null
        }
      </div>
    )
  }

  handleReset = () => {
    this.nums = []
    this.setState({
      reset: true,
      results: []
    }, ()=> this.setState({reset: false}))
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.tab !== nextProps.tab) {
      this.nums = []
      this.setState({
        results: [],
        subTab: ''
      })
    }
  }
}

const mapStateToProps = (state) => {
  const { layout, orderInfo, currentLottery, lhcBetData } = state
  return {
    layout,
    lhcBetData,
    orderInfo,
    play_id: currentLottery.play_id
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     layoutSet: (layout) => {
//       dispatch(layoutSet(layout))
//     },
//   }
// }

export default connect(mapStateToProps, null)(LianMa)
