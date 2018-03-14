import React from 'react'
import { SetCurrentBetData } from '../../redux/actions'
import { connect } from 'react-redux'
import MiniGrid from '../common/NewMiniGrid.jsx'

class XiaoChuanWeiShu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.selectedNum = {}
    this.orders = {}
    this.handleSelect = this.handleSelect.bind(this)
    this.getCombination = this.getCombination.bind(this)

    this.shengxiao = [
      {name: '鼠', type: 'shu', value: 'A1', rank: '01'},
      {name: '牛', type: 'niu', value: 'A2', rank: '02'},
      {name: '虎', type: 'hu', value: 'A3', rank: '03'},
      {name: '兔', type: 'tu', value: 'A4', rank: '04'},
      {name: '龙', type: 'long', value: 'A5', rank: '05'},
      {name: '蛇', type: 'she', value: 'A6', rank: '06'},
      {name: '马', type: 'ma', value: 'A7', rank: '07'},
      {name: '羊', type: 'yang', value: 'A8', rank: '08'},
      {name: '猴', type: 'hou', value: 'A9', rank: '09'},
      {name: '鸡', type: 'ji', value: 'AA', rank: '10'},
      {name: '狗', type: 'gou', value: 'AB', rank: '11'},
      {name: '猪', type: 'zhu', value: 'AC', rank: '12'}
    ]

    this.weishu = [
      {name: '0', type: '0', value: '0', rank: '0'},
      {name: '1', type: '1', value: '1', rank: '1'},
      {name: '2', type: '2', value: '2', rank: '2'},
      {name: '3', type: '3', value: '3', rank: '3'},
      {name: '4', type: '4', value: '4', rank: '4'},
      {name: '5', type: '5', value: '5', rank: '5'},
      {name: '6', type: '6', value: '6', rank: '6'},
      {name: '7', type: '7', value: '7', rank: '7'},
      {name: '8', type: '8', value: '8', rank: '8'},
      {name: '9', type: '9', value: '9', rank: '9'}
    ]
  }

  getCombination() {
    let combination = []
    const { series } = this.props
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
    let betData = []
    combination.map((item, index) =>
      betData.push({
        content: item.toString().replace(/\s+/g, ""),
        number: item.toString(),
      }))
    this.props.SetCurrentBetData(betData)
    // this.props.setBetResult(combination)
  }

  handleSelect(name, num, val) {
    this.selectedNum[name] = num
    this.orders[name] = val
    this.getCombination()
  }

  render() {
    const { shengXiao } = this.props
    return (
      <div className="xiao-chuan-wei-shu">
        <MiniGrid
          shengXiao={shengXiao}
          handleSelect={this.handleSelect}
          data={this.shengxiao}
          name={"shengxiao"}
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

const mapStateToProps = (state) => {
  const { currentLottery } = state
  return {
    shengXiao: currentLottery.shengXiao
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetCurrentBetData: (layout) => {
      dispatch(SetCurrentBetData(layout))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(XiaoChuanWeiShu)
