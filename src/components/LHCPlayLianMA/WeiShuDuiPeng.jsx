import React from 'react';
import MiniGrid from '../common/MiniGrid.jsx';

export default class WeiShuDuiPeng extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectedNum = {};
    this.orders = [];
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
      {name: '10', type: '10', value: '10'}
    ]
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    return (
      <div className="dui-peng">
        <MiniGrid handleSelect={this.handleSelect} data={this.weishu}
          name="weishu" header="尾数" reset={this.props.reset} type="checkbox" model="duipeng" upperLimit="2"/>
      </div>
    )
  }

  getCombination() {

  }

  handleSelect(name, num, val, action) {
    let combination = [];
    let selectedNum = this.selectedNum;
    if (action === 'add') {
      selectedNum[val] = num;
      this.orders.push(val);
    } else { //del
      delete selectedNum[val];
      this.orders.splice(this.orders.indexOf(val), 1);
    }
    let keys = Object.keys(selectedNum);
    if (keys.length >= 2) {
      for (var i = 0; i < selectedNum[keys[0]].length; i++) {
        for (var j = 0; j < selectedNum[keys[1]].length; j++) {
          combination.push(selectedNum[keys[0]][i] + ',  ' + selectedNum[keys[1]][j]);
        }
      }
    }

    this.props.setBetResult(combination, this.orders);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.selectedNum = {}
      this.orders = []
    }
  }

}
