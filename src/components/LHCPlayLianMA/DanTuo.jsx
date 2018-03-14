import React from 'react';
import SimpleBallGrid from './common/SimpleBallGrid.jsx';

export default class DanTuo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.selectedNum = {
      dan: [],
      tuo: []
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    return (
      <div className="dan-tuo">
        <SimpleBallGrid header="胆" name="dan" handleSelect={this.handleSelect}
          upperLimit={this.props.series - 1} reset={this.props.reset} selectedNum={this.selectedNum.tuo}/>
        <SimpleBallGrid header="拖" name="tuo" handleSelect={this.handleSelect}
          upperLimit="49" reset={this.props.reset} selectedNum={this.selectedNum.dan}/>
      </div>
    )
  }
  handleSelect(name, nums) {
    this.selectedNum[name] = nums;
    let dan = this.selectedNum.dan;
    let tuo = this.selectedNum.tuo;
    let combination = [];
    if (dan && tuo && dan.length > 0 && tuo.length > 0) {
      let series = this.props.series - dan.length;
      let com_dan = '';
      for (let d of dan) {
        com_dan = com_dan + ', ' + d;
      }
      for (let i = 0; i < tuo.length - (series - 1); i++) {
        let com_1 = tuo[i];
        if (series >= 2) {
          for (let j = i + 1; j < tuo.length - (series - 2); j++) {
            let com_2 = com_1 + ',  ' + tuo[j];
            if (series >= 3) {
              for (let m = j + 1; m < tuo.length - (series - 3); m++) {
                let com_3 = com_2 + ',  ' + tuo[m];
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

    this.props.setBetResult(combination, this.selectedNum);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.selectedNum = {};
    }
  }


}
