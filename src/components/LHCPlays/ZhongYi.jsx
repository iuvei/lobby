import React from 'react'
import BallsGrid from '../common/BallsGrid.jsx'
import BetResult from './common/BetResult.jsx'

export default class ZhongYi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      betResult: {}
    }

    this.nums = []
    this.upperLimit = 10
    this.link = 5
    this.handleSelect = this.handleSelect.bind(this)
    this.setBetResult = this.setBetResult.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  render() {
    const { betting, tab, goldList, playAttr } = this.props
    let tabName = tab.name
    if(tabName === '五中一'){
      this.upperLimit = 10
      this.link = 5
    } else if(tabName === '六中一'){
      this.upperLimit = 10
      this.link = 6
    } else if(tabName === '七中一'){
      this.upperLimit = 10
      this.link = 7
    } else if(tabName === '八中一'){
      this.upperLimit = 11
      this.link = 8
    } else if(tabName === '九中一'){
      this.upperLimit = 12
      this.link = 9
    } else if(tabName === '十中一'){
      this.upperLimit = 13
      this.link = 10
    }

    return (
      <div>
        <BallsGrid
          handleSelect={this.handleSelect}
          upperLimit={this.upperLimit}
          selectedBalls={this.nums}/>
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

  handleSelect(action, number) {
    let nums = this.nums
    let link = this.link
    if (action === 'add') {
      nums.push(number)
    } else if (action === 'del') {
      if(nums.includes(number)) {
        nums.splice(nums.indexOf(number), 1)
      }
    }
    let combination = []
    for (let a = 0; a < nums.length - (link - 1); a++) {
      for (let b = a + 1; b < nums.length - (link - 2); b++) {
        for (let c = b + 1; c < nums.length - (link - 3); c++) {
          for (let d = c + 1; d < nums.length - (link - 4); d++) {
            for (let e = d + 1; e < nums.length - (link - 5); e++) {
              let com5 = nums[a] + ', ' + nums[b] + ', ' + nums[c] + ', ' + nums[d] + ', ' + nums[e]
              if (link > 5) {
                for (let f = e + 1; f < nums.length - (link - 6); f++) {
                  let com6 = com5 + ', ' + nums[f]
                  if (link > 6) {
                    for (let g = f + 1; g < nums.length - (link - 7); g++) {
                      let com7 = com6 + ', ' + nums[g]
                      if (link > 7) {
                        for (let h = g + 1; h < nums.length - (link - 8); h++) {
                          let com8 = com7 + ', ' + nums[h]
                          if (link > 8) {
                            for (let i = h + 1; i < nums.length - (link - 9); i++) {
                              let com9 = com8 + ', ' + nums[i]
                              if (link > 9) {
                                for (let j = i + 1; j < nums.length - (link - 10); j++) {
                                  let com10 = com9 + ', ' + nums[j]
                                  combination.push(com10)
                                }
                              } else {
                                combination.push(com9)
                              }
                            }
                          } else {
                            combination.push(com8)
                          }
                        }
                      } else {
                        combination.push(com7)
                      }
                    }
                  } else {
                    combination.push(com6)
                  }
                }
              } else {
                combination.push(com5)
              }
            }
          }
        }
      }
    }
    this.setBetResult(combination)
  }

  setBetResult(combination) {
    const { playAttr, tab } = this.props
    let result = {},
        results = []
    for (let i = 0; i < combination.length; i++) {
      result = {}
      result.sequence = '组合' + (i + 1)
      result.model = tab.name
      result.combination = combination[i]
      result.odds = playAttr.odds[tab.type]
      results.push(result)
    }
    let betResult = {}
    betResult.gameNum = this.props.id
    betResult.model = tab.type
    betResult.orders = this.nums
    betResult.odds = playAttr.odds[tab.type]
    this.setState({
      results: results,
      betResult: betResult
    })
  }

  handleReset() {
    this.nums = []
    this.setState({
      results: [],
      betResult: {}
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tab !== nextProps.tab) {
      this.nums = []
      this.setState({
        results: []
      })
    }
  }
}
