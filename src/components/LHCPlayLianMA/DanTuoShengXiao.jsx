import React from 'react';
import SimpleBallGrid from './common/SimpleBallGrid.jsx';
import MiniGrid from '../common/MiniGrid.jsx';

export default class DanTuoShengXiao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.selectedNum = {
      dan: [],
      shengxiao: []
    };
    this.orders = {
      shengxiao: []
    };
    this.handleSelect = this.handleSelect.bind(this);

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

  }

  render() {
    const shengXiao = this.props.shengXiao
    return (
      <div className="dan-shengxiao">
        <SimpleBallGrid
          header="胆"
          name="dan"
          handleSelect={this.handleSelect}
          upperLimit={this.props.series - 1}
          reset={this.props.reset}/>
        <MiniGrid
          shengXiao={shengXiao}
          handleSelect={this.handleSelect}
          data={this.shengxiao}
          name="shengxiao"
          header="生肖"
          selectedItem={this.shengxiaoSelected}
          reset={this.props.reset}
          type="checkbox"
          selectedNum={this.selectedNum.dan}/>
      </div>
    )
  }
  handleSelect(name, nums, value, action) {
    this.selectedNum[name] = nums;
    if (name === 'shengxiao') {
      if (action === 'add') {
        this.orders['shengxiao'].push(value);
      } else {
        this.orders['shengxiao'].splice(this.orders['shengxiao'].indexOf(value), 1)
      }

    } else {
      this.orders[name] = nums;
    }
    let dan = this.selectedNum.dan;
    let shengxiao = this.selectedNum.shengxiao;
    let combination = [];

    if (dan && shengxiao && dan.length > 0 && shengxiao.length > 0) {
      let series = this.props.series - dan.length;
      let com_dan = '';
      for (let d of dan) {
        com_dan = com_dan + ', ' + d;
      }
      shengxiao = shengxiao.filter(num =>
        !dan.includes(num)
      )
      for (let i = 0; i < shengxiao.length - (series - 1); i++) {
        let com_1 = shengxiao[i];
        if (series >= 2) {
          for (let j = i + 1; j < shengxiao.length - (series - 2); j++) {
            let com_2 = com_1 + ',  ' + shengxiao[j];
            if (series >= 3) {
              for (let m = j + 1; m < shengxiao.length - (series - 3); m++) {
                let com_3 = com_2 + ',  ' + shengxiao[m];
                combination.push(com_3 + com_dan);
              }
            } else {
              combination.push(com_2 + com_dan);
            }
          }
        } else {
          combination.push(com_1 + com_dan);
        }
      }

    }

    this.props.setBetResult(combination, this.orders);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.selectedNum = {};
      this.setState({
        dan: [],
        shengxiao: []
      })
    }
  }


}
