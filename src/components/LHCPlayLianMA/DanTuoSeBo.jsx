import React from 'react';
import SimpleBallGrid from './common/SimpleBallGrid.jsx';

export default class DanTuoSeBo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.selectedNum = {
      dan: [],
      sebo: []
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    return (
      <div className="dan-sebo">
        <SimpleBallGrid header="胆" name="dan" handleSelect={this.handleSelect}
          upperLimit={this.props.series - 1} reset={this.props.reset} selectedNum={this.selectedNum.sebo}/>
        <SimpleBallGrid header="色波" name="sebo" handleSelect={this.handleSelect}
          upperLimit="49" reset={this.props.reset} seBo="true" selectedNum={this.selectedNum.dan}/>
      </div>
    )
  }
  handleSelect(name, nums) {
    this.selectedNum[name] = nums;
    let dan = this.selectedNum.dan;
    let sebo = this.selectedNum.sebo;
    let combination = [];
    if (dan && sebo && dan.length > 0 && sebo.length > 0) {
      let series = this.props.series - dan.length;
      let com_dan = '';
      for (let d of dan) {
        com_dan = com_dan + ', ' + d;
      }
      for (let i = 0; i < sebo.length - (series - 1); i++) {
        let com_1 = sebo[i];
        if (series >= 2) {
          for (let j = i + 1; j < sebo.length - (series - 2); j++) {
            let com_2 = com_1 + ',  ' + sebo[j];
            if (series >= 3) {
              for (let m = j + 1; m < sebo.length - (series - 3); m++) {
                let com_3 = com_2 + ',  ' + sebo[m];
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
