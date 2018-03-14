import React from 'react'
import { SetCurrentBetData, SetOrderConfirm } from '../../redux/actions'
import { connect } from 'react-redux'
import MiniGrid from '../common/NewMiniGrid.jsx'

class ShengXiaoDuiPeng extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.selectedNum = {}
    this.orders = []
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
    this.handleSelect = this.handleSelect.bind(this)
  }

  render() {
    const shengXiao = this.props.shengXiao
    return (
      <div className="dui-peng">
        <MiniGrid
          shengXiao={shengXiao}
          handleSelect={this.handleSelect}
          data={this.shengxiao}
          name="shengxiao"
          header="生肖"
          reset={this.props.reset}
          type="checkbox"
          model="duipeng"
          upperLimit="2"/>
      </div>
    )
  }


  handleSelect(name, num, val, action) {
    let combination = []
    let selectedNum = this.selectedNum
    if (action === 'add') {
      selectedNum[val] = num
      this.orders.push(val)
    } else { //del
      delete selectedNum[val]
      this.orders.splice(this.orders.indexOf(val), 1)
    }
    let keys = Object.keys(selectedNum)
    if (keys.length >= 2) {
      for (var i = 0; i < selectedNum[keys[0]].length; i++) {
        for (var j = 0; j < selectedNum[keys[1]].length; j++) {
          combination.push(selectedNum[keys[0]][i] + ',  ' + selectedNum[keys[1]][j])
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.selectedNum = {}
      this.orders = []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.lhcBetData.OrderConfirm !== nextProps.lhcBetData.OrderConfirm) {
      this.props.handleReset()
      this.props.SetOrderConfirm(false)
      this.props.SetCurrentBetData([])
    }
  }

}

const mapStateToProps = (state) => {
  const { currentLottery, lhcBetData } = state
  return {
    lhcBetData,
    shengXiao: currentLottery.shengXiao
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetCurrentBetData: (layout) => {
      dispatch(SetCurrentBetData(layout))
    },
    SetOrderConfirm: (layout) => {
      dispatch(SetOrderConfirm(layout))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShengXiaoDuiPeng)
