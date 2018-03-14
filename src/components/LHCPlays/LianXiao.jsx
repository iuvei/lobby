import React from 'react';
import BetResult from './common/BetResult.jsx';
import {BALLS} from '../common/Balls.jsx';

export default class LianXiao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsList: [],
      betResult: {}
    }
    this.coefficient = 'A';
    this.link = 2;
    this.selectedSX = [];
    this.selectedItem = [];
    this.upperLimit = 5;
    this.checkCount = 0;
    this.combination = [];
    this.data = [
      [{
        label: '鼠',
        name: '1',
        type: 'shu'
      },
      {
        label: '牛',
        name: '2',
        type: 'niu'
      }],
      [{
        label: '虎',
        name: '3',
        type: 'hu'
      },
      {
        label: '兔',
        name: '4',
        type: 'tu'
      }],
      [{
        label: '龙',
        name: '5',
        type: 'long'
      },
      {
        label: '蛇',
        name: '6',
        type: 'she'
      }],
      [{
        label: '马',
        name: '7',
        type: 'ma'
      },
      {
        label: '羊',
        name: '8',
        type: 'yang'
      }],
      [{
        label: '猴',
        name: '9',
        type: 'hou'
      },
      {
        label: '鸡',
        name: 'A',
        type: 'ji'
      }],
      [{
        label: '狗',
        name: 'B',
        type: 'gou'
      },
      {
        label: '猪',
        name: 'C',
        type: 'zhu'
      }]
    ]

    this.setResults = this.setResults.bind(this)
  }


  render() {
    const { playAttr, tab, betting, goldList, shengXiao } = this.props
    const odds = playAttr.odds
    const tabName = tab.name;
    if(tabName === '二肖连') {
      this.link = 2;
      this.coefficient = 'A';
    } else if(tabName === '三肖连') {
      this.link = 3;
      this.coefficient = 'B';
    } else if(tabName === '四肖连') {
      this.link = 4;
      this.coefficient = 'C';
    } else if(tabName === '五肖连') {
      this.link = 5;
      this.coefficient = 'D';
    }
    return (
      <div>
        <div className="lian-grid">
          <div className="row title">
            <div className="cell">
              <div className="label">生肖</div>
              <div className="odds">赔率</div>
              <div className="numbers">号码</div>
            </div>
            <div className="cell">
              <div className="label">生肖</div>
              <div className="odds">赔率</div>
              <div className="numbers">号码</div>
            </div>
          </div>
          {
            this.data.map((row, index) =>
              <div className="row" key={index}>
              {
                row.map((cell, index) =>
                  <div className="cell" key={index}>
                    <div className="label" onClick={e => {
                        this.handleClick(cell.label, cell.number, cell.name)
                      }}>
                      <i className={`iconfont ${this.selectedSX.includes(cell.label) ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
                      <span>{cell.label}</span>
                    </div>
                    <div className="odds">{odds[this.coefficient + cell.name]}</div>
                    <div className="numbers">
                    {
                      Object.keys(shengXiao).filter(n => shengXiao[n] === cell.label).map((num, index) =>
                        <div className="num" key={index}>
                          <span style={this.selectedSX.includes(cell.label) ? BALLS[num] : null}>{num}</span>
                        </div>
                      )
                    }
                    </div>
                  </div>
                )
              }
              </div>
            )
          }
        </div>

        <BetResult
          playAttr={playAttr}
          data={this.state.resultsList}
          reset={this.handleReset.bind(this)}
          results={this.state.betResult}
          betting={betting}
          goldList={goldList}/>
      </div>

    )
  }

  handleReset() {
    this.selectedSX = [];
    this.selectedItem = [];
    this.checkCount = 0;
    this.setState({
      resultsList: [],
      betResult: {}
    })
  }

  handleClick(label, numbers, name) {
    let selectedItem = this.selectedItem;
    let odds = this.props.playAttr.odds;
    if(!this.selectedSX.includes(label)) {
      if(this.checkCount > this.upperLimit) {
        return
      }
      this.checkCount += 1;
      this.selectedSX.push(label);
      selectedItem.push({
        label: label,
        name: this.coefficient + name,
        odds: odds[this.coefficient + name]
      });
    } else {
      this.checkCount -= 1;
      this.selectedSX.splice(this.selectedSX.indexOf(label), 1);
      for (let i = 0; i < selectedItem.length; i++) {
        if (label === selectedItem[i].label) {
          selectedItem.splice(i, 1);
        }
      }
    }
    this.getCombination();
  }

  getCombination() {
    let selectedItem = this.selectedItem;
    let link = this.link;
    let combination = [];
    if(selectedItem.length >= link) {
      for(let i = 0; i < selectedItem.length - (link - 1); i++) {
        for(let j = i + 1; j < selectedItem.length - (link - 2); j++) {
          if(link > 2) {
            for(let m = j + 1; m < selectedItem.length - (link - 3); m++) {
              if(link > 3) {
                for(let n = m + 1; n < selectedItem.length - (link - 4); n++) {
                  if(link > 4) {
                    for(let g = n + 1; g < selectedItem.length - (link - 5); g++) {
                      let com = [];
                      com.push(selectedItem[i]);
                      com.push(selectedItem[j]);
                      com.push(selectedItem[m]);
                      com.push(selectedItem[n])
                      com.push(selectedItem[g])
                      combination.push(com);
                    }
                  } else {
                    let com = [];
                    com.push(selectedItem[i]);
                    com.push(selectedItem[j]);
                    com.push(selectedItem[m]);
                    com.push(selectedItem[n])
                    combination.push(com);
                  }
                }
              } else {
                let com = [];
                com.push(selectedItem[i]);
                com.push(selectedItem[j]);
                com.push(selectedItem[m]);
                combination.push(com);
              }
            }
          } else {
            let com = [];
            com.push(selectedItem[i]);
            com.push(selectedItem[j]);
            combination.push(com);
          }
        }

      }

    }

    this.setResults(combination);
  }


  setResults(combination) {
    let result = {},
        results = [],
        orders = {};
    for(let i = 0; i < combination.length; i++) {
      result = {};
      let com = [], odds = 0, names = [];
      for (var j = 0; j < combination[i].length; j++) {
        com.push(combination[i][j].label);
        if (odds === 0 || odds > Number(combination[i][j].odds)) {
          odds = combination[i][j].odds;
        }
        names.push(combination[i][j].name);
      }
      result.sequence = '组合' + (i + 1);
      result.model = this.props.tab.name;
      result.combination = com.join(', ');
      result.odds = odds;
      result.name = names;
      results.push(result);
    }
    let betResult = {};
    betResult.gameNum = this.props.id;
    betResult.model = this.props.tab.type;
    for (let item of this.selectedItem) {
      orders[item.name] = {odds: item.odds};
    }
    betResult.orders = orders;
    this.setState({
      resultsList: results,
      betResult: betResult
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.tab !== nextProps.tab) {
      this.selectedSX = [];
      this.selectedItem = [];
      this.checkCount = 0;
      this.setState({
        resultsList: []
      })
    }
  }
}
