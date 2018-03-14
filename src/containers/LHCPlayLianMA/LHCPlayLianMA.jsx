import React from 'react'
import BallsGrid from '../../components/common/BallsGrid.jsx'
import ZhengFuNum from '../../components/LHCPlayLianMA/ZhengFuNumOld.jsx'
import XiaoChuanWeiShu from '../../components/LHCPlayLianMA/XiaoChuanWeiShu.jsx'
import JiaoChaPeng from '../../components/LHCPlayLianMA/JiaoChaPeng.jsx'
import DanTuo from '../../components/LHCPlayLianMA/DanTuo.jsx'
import DanTuoSeBo from '../../components/LHCPlayLianMA/DanTuoSeBo.jsx'
import DanTuoShengXiao from '../../components/LHCPlayLianMA/DanTuoShengXiao.jsx'
import ShengXiaoDuiPeng from '../../components/LHCPlayLianMA/ShengXiaoDuiPeng.jsx'
import WeiShuDuiPeng from '../../components/LHCPlayLianMA/WeiShuDuiPengOld.jsx'
import BetResult from '../../components/LHCPlays/common/BetResult.jsx'


export default class LianMa extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      reset: false,
      betResult: {}
    }
    this.nums = []
    this.orders = {}
    this.renderSubTabs = this.renderSubTabs.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.renderBetArea = this.renderBetArea.bind(this)
    this.handleSubTabs = this.handleSubTabs.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.getCombination = this.getCombination.bind(this)
    this.setBetResult = this.setBetResult.bind(this)
    this.handleReset = this.handleReset.bind(this)
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

/*eslint-disable */
  renderSubTabs(subTabs) {
    let selectSubTab = this.state.subTab
    return (
      <ul className="subTabs">
        {
          subTabs.map((tab, index) =>
            <li key={index} onClick={this.handleSubTabs.bind(this, tab)}
              className={selectSubTab == tab ? 'active' : null}>{tab}</li>
          )
        }
      </ul>

    )
  }

  renderBetArea() {
    var subTab = this.state.subTab || ''
    const shengXiao = this.props.shengXiao
    if(subTab === subTab){
      if(subTab == '正/副号') {
        return <ZhengFuNum setBetResult={this.setBetResult} series={this.series} reset={this.state.reset}/>
      } else if(subTab == '肖串尾数') {
        return <XiaoChuanWeiShu setBetResult={this.setBetResult} series={this.series} reset={this.state.reset} shengXiao={shengXiao}/>
      } else if(subTab == '交叉碰') {
        return <JiaoChaPeng setBetResult={this.setBetResult} series={this.series} reset={this.state.reset} shengXiao={shengXiao}/>
      } else if(subTab == '胆拖') {
        return <DanTuo setBetResult={this.setBetResult} series={this.series} reset={this.state.reset}/>
      } else if(subTab == '胆拖色波') {
        return <DanTuoSeBo setBetResult={this.setBetResult} series={this.series} reset={this.state.reset}/>
      } else if(subTab == '胆拖生肖') {
        return <DanTuoShengXiao setBetResult={this.setBetResult} series={this.series} reset={this.state.reset} shengXiao={shengXiao}/>
      } else if(subTab == '生肖对碰') {
        return <ShengXiaoDuiPeng setBetResult={this.setBetResult} series={this.series} reset={this.state.reset} shengXiao={shengXiao}/>
      } else if(subTab == '尾数对碰') {
        return <WeiShuDuiPeng setBetResult={this.setBetResult} series={this.series} reset={this.state.reset}/>
      } else {
        return <BallsGrid handleSelect={this.handleSelect} upperLimit="10" selectedBalls={this.nums}/>
      }
    }

  }
  renderContent() {
    let data = this.props.data;
    this.series = data.series;
    return (
      <div>
      {
        this.renderSubTabs(data.subTabs)
      }
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

  setBetResult(combination, orders = {}) {
    const { tab, id, playAttr } = this.props
    let result = {},
        results = [],
        betResult = {}
    for(let i = 0; i < combination.length; i++) {
      result = {}
      result.sequence = '组合' + (i + 1);
      result.model = tab.name + ' ' + (this.state.subTab || '')
      result.combination = combination[i]
      result.odds = playAttr.odds[tab.type]
      results.push(result)
    }
    betResult.gameNum = this.props.id
    betResult.model = tab.type
    betResult.subModel = this.state.subTab || '';
    betResult.orders = orders
    betResult.odds = playAttr.odds[tab.type]
    this.setState({
      results: results,
      reset: false,
      betResult: betResult
    })
  }



  render() {
    const { goldList, betting, playAttr } = this.props
    return (
      <div className="lianma-area">
        {
          this.renderContent()
        }
        <BetResult
          playAttr={playAttr}
          data={this.state.results}
          reset={this.handleReset}
          results={this.state.betResult}
          betting={betting}
          goldList={goldList}/>
      </div>
    )
  }

  handleReset() {
    this.nums = []
    this.setState({
      results: [],
      reset: true,
      betResult: {}
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.tab != nextProps.tab) {
      this.nums = []
      this.setState({
        results: [],
        subTab: ''
      })
    }
  }
}
