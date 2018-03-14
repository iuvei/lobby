import React from 'react'
import MiniGrid from '../common/MiniGrid.jsx'
import BetResult from './common/BetResult.jsx'
import { MathAdd, MathDiv, MathSub, subNumber } from '../../helpers/utils'

export default class HeXiao extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      betResult: {}
    }
    this.defaultItem = []
    this.selectedItem = []
    this.selectSubTab = ''
    this.shengxiao = [
      {name: '鼠', type: 'shu', value: 'NX_A1'},
      {name: '牛', type: 'niu', value: 'NX_A2'},
      {name: '虎', type: 'hu', value: 'NX_A3'},
      {name: '兔', type: 'tu', value: 'NX_A4'},
      {name: '龙', type: 'long', value: 'NX_A5'},
      {name: '蛇', type: 'she', value: 'NX_A6'},
      {name: '马', type: 'ma', value: 'NX_A7'},
      {name: '羊', type: 'yang', value: 'NX_A8'},
      {name: '猴', type: 'hou', value: 'NX_A9'},
      {name: '鸡', type: 'ji', value: 'NX_AA'},
      {name: '狗', type: 'gou', value: 'NX_AB'},
      {name: '猪', type: 'zhu', value: 'NX_AC'}
    ]

    this.handleSelect = this.handleSelect.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.setBetResult = this.setBetResult.bind(this)
  }


  render() {
    const { betting, tab, data, goldList, shengXiao, playAttr } = this.props
    let upperLimit = 11
    if (tab.type !== 'NX_IN') {
      upperLimit = 10
    }
    return (
      <div className="he-xiao">
        <ul className="subTabs">
          {
            data.map((tab, index) =>
              <li key={index} onClick={this.handleSubTabClick.bind(this, tab)}
                className={this.selectSubTab === tab ? 'active' : null}>{tab}</li>
            )
          }
        </ul>
        <MiniGrid
          shengXiao={shengXiao}
          handleSelect={this.handleSelect}
          data={this.shengxiao}
          name="shengxiao"
          header="生肖"
          reset={this.state.reset}
          type="checkbox"
          model="hexiao"
          upperLimit={upperLimit}
          defaultItem={this.defaultItem}/>
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
    this.selectSubTab = ''
    this.selectedItem = []
    this.defaultItem = []
    this.setState({
      results: [],
      reset: true,
      betResult: {}
    })
  }

  handleSelect(name, action, defaultItem) {
    this.defaultItem = defaultItem //reset subtab's value
    let selectedItem = this.selectedItem
    if (action === 'add') {
      selectedItem.push(name)
    } else {
      selectedItem.splice(selectedItem.indexOf(name), 1)
    }
    this.setBetResult(selectedItem.join(", "))
  }

  setBetResult(combination) {
    const { id, tab, playAttr } = this.props
    let result = {}, betResult = {}
    let odds = 0, selectedTotal = 0, coefficient = 0 , orders = {}
    if (this.defaultItem && this.defaultItem.length > 0) {
      for (let name of this.defaultItem) {
        selectedTotal = MathAdd(selectedTotal, Number(playAttr.odds[name]))
        orders[name] = {odds: playAttr.odds[name]}
      }
      if (tab.type === 'NX_IN') {
        coefficient = this.defaultItem.length
      } else {
        let total = 0
        for (let name of Object.keys(playAttr.odds)) {
          total = MathAdd(total, Number(playAttr.odds[name]))
        }
        selectedTotal = MathSub(total, selectedTotal)
        coefficient = 12 - this.defaultItem.length
      }
      odds = subNumber(MathDiv(MathDiv(MathDiv(selectedTotal, coefficient), coefficient), 1000), 3)
      // odds = odds.substring(0, odds.length - 1)

      result = {
        sequence: '组合1',
        model: tab.name,
        combination: combination,
        odds: odds
      }

      betResult.gameNum = id
      betResult.model = tab.type
      betResult.orders = orders
    }

    this.setState({
      results: [result],
      reset: false,
      betResult: betResult
    })
  }

  handleSubTabClick(tab, event) {
    this.selectSubTab = tab
    if (tab === '野兽') {
      this.defaultItem = ['NX_A1', 'NX_A3', 'NX_A4', 'NX_A5', 'NX_A6','NX_A9']
      this.selectedItem = ['鼠', '虎', '兔', '龙', '蛇', '猴']
    } else if (tab === '家禽'){
      this.defaultItem = ['NX_A2', 'NX_A7', 'NX_A8', 'NX_AA', 'NX_AB','NX_AC']
      this.selectedItem = ['牛', '马', '羊', '鸡', '狗', '猪']
    } else if (tab === '单'){
      this.defaultItem = ['NX_A1', 'NX_A3', 'NX_A5', 'NX_A7', 'NX_A9','NX_AB']
      this.selectedItem = ['鼠', '虎', '龙', '马', '猴', '猴']
    } else if (tab === '双'){
      this.defaultItem = ['NX_A2', 'NX_A4', 'NX_A6', 'NX_A8', 'NX_AA','NX_AC']
      this.selectedItem = ['牛', '兔', '蛇', '羊', '鸡', '猪']
    } else if (tab === '前肖'){
      this.defaultItem = ['NX_A1', 'NX_A2', 'NX_A3', 'NX_A4', 'NX_A5','NX_A6']
      this.selectedItem = ['鼠', '牛', '虎', '兔', '龙', '蛇']
    } else if (tab === '后肖'){
      this.defaultItem = ['NX_A7', 'NX_A8', 'NX_A9', 'NX_AA', 'NX_AB','NX_AC']
      this.selectedItem = ['马', '羊', '猴', '鸡', '狗', '猪']
    } else if (tab === '天肖'){
      this.defaultItem = ['NX_A2', 'NX_A4', 'NX_A5', 'NX_A7', 'NX_A9','NX_AC']
      this.selectedItem = ['牛', '兔', '龙', '马', '猴', '猪']
    } else if (tab === '地肖'){
      this.defaultItem = ['NX_A1', 'NX_A3', 'NX_A6', 'NX_A8', 'NX_AA','NX_AB']
      this.selectedItem = ['鼠', '虎', '蛇', '羊', '鸡', '狗']
    }
    this.setBetResult(this.selectedItem.join(", "))
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.tab !== nextProps.tab) {
      this.handleReset()
    }
  }
}
