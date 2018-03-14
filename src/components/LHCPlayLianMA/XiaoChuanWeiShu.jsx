import React from 'react'
import MiniGrid from '../common/MiniGrid.jsx'

export default class XiaoChuanWeiShu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.selectedNum = {}
    this.orders = {}
    this.handleSelect = this.handleSelect.bind(this)
    this.getCombination = this.getCombination.bind(this)

    this.shengxiao = [
      {name: '鼠', type: 'shu', value: 'A1'},
      {name: '牛', type: 'niu', value: 'A2'},
      {name: '虎', type: 'hu', value: 'A3'},
      {name: '兔', type: 'tu', value: 'A4'},
      {name: '龙', type: 'long', value: 'A5'},
      {name: '蛇', type: 'she', value: 'A6'},
      {name: '马', type: 'ma', value: 'A7'},
      {name: '羊', type: 'yang', value: 'A8'},
      {name: '猴', type: 'hou', value: 'A9'},
      {name: '鸡', type: 'ji', value: 'AA'},
      {name: '狗', type: 'gou', value: 'AB'},
      {name: '猪', type: 'zhu', value: 'AC'}
    ]

    this.weishu = [
      {name: '1', type: '1', value: '1'},
      {name: '2', type: '2', value: '2'},
      {name: '3', type: '3', value: '3'},
      {name: '4', type: '4', value: '4'},
      {name: '5', type: '5', value: '5'},
      {name: '6', type: '6', value: '6'},
      {name: '7', type: '7', value: '7'},
      {name: '8', type: '8', value: '8'},
      {name: '9', type: '9', value: '9'},
      {name: '0', type: '0', value: '0'}
    ]
  }

  getCombination() {
    let combination = []
    let series = this.props.series
    if(this.selectedNum.shengxiao != null && this.selectedNum.weishu != null) {
      let shengxiao = this.selectedNum.shengxiao
      let weishu = this.selectedNum.weishu
      for (let a of shengxiao) {
        for (var b = 0; b < weishu.length - (series - 2); b++) {
          let com = a + ',  ' + weishu[b]
          if(!shengxiao.includes(weishu[b])) {
            if (series > 2) {
              for (var c = b + 1; c < weishu.length - (series - 3); c++) {
                let com_1 = com + ',  ' + weishu[c]
                if(!shengxiao.includes(weishu[c])) {
                  if (series > 3) {
                    for (var d = c + 1; d < weishu.length - (series - 4); d++) {
                      if(! shengxiao.includes(weishu[d])) {
                        let com_2 = com_1 + ',  ' + weishu[d]
                        combination.push(com_2)
                      }
                    }
                  } else {
                    combination.push(com_1)
                  }
                }
              }
            } else {
              combination.push(com)
            }
          }
        }
      }
    }
    this.props.setBetResult(combination, this.orders)
  }

  handleSelect(name, num, val) {
    this.selectedNum[name] = num
    this.orders[name] = val
    this.getCombination()
  }

  render() {
    const shengXiao = this.props.shengXiao
    return (
      <div className="xiao-chuan-wei-shu">
        <MiniGrid
          shengXiao={shengXiao}
          handleSelect={this.handleSelect}
          data={this.shengxiao}
          name="shengxiao"
          header="生肖"
          reset={this.props.reset}
          type="radio"/>
        <MiniGrid
          handleSelect={this.handleSelect}
          data={this.weishu}
          name="weishu"
          header="尾数"
          reset={this.props.reset}
          type="radio"/>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.selectedNum = {}
    }
  }

}
