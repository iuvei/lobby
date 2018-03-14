import React from 'react';
import { BALLS } from '../common/BallsOld.jsx';
import BallsGrid from '../common/BallsGrid.jsx';


export default class ZhengFuNum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zheng: [],
      fu:[]
    }
    this.nums = [];
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(action, num) {
    let zheng = this.state.zheng;
    let fu = this.state.fu;
    let nums = this.nums;
    if (action === 'add') {
      if(zheng.length === 0){
        zheng.push(num)
      } else {
        fu.push(num)
      }
      nums.push(num);
    } else if (action === 'del'){
      if(zheng.includes(num)) {
        zheng.splice(zheng.indexOf(num), 1);
      } else {
        fu.splice(fu.indexOf(num), 1);
      }
      nums.splice(nums.indexOf(num), 1);
    }
    this.nums = nums;
    let combination = this.getCombination(zheng, fu);
    this.props.setBetResult(combination, {zheng: zheng, fu: fu})
    this.setState({
      zheng: zheng,
      fu: fu
    })
  }

  getCombination(zheng, fu) {
    let combination = [];
    let series = this.props.series;
    if (fu.length >= 1 &&  zheng.length >= 1) {
      for (let a = 0; a < fu.length - (series - 2); a++) {
        let com = zheng[0] + ',  ' + fu[a];
        if (series > 2) {
          for (let b = a + 1; b < fu.length - (series - 3); b++){
            let com_1 = com + ',  ' + fu[b];
            if (series > 3) {
              for (let c = b + 1; c < fu.length - (series - 4); c++){
                let com_2 = com_1 + ',  ' + fu[c];
                combination.push(com_2);
              }
            } else {
              combination.push(com_1);
            }
          }
        } else {
          combination.push(com);
        }

      }
    }
    return combination;

  }



  render() {
    return (
      <div className="zheng-fu-num">
        <div className="show-area">
          <div className="selected-shown">
            <span className="label" style={this.state.zheng.length <= 0 ? {flex: 1} : null}>正</span>
            {
              this.state.zheng.map((num, index) =>
                <span style={BALLS[num]} className="selected-num" key={index}>{num}</span>
              )
            }
          </div>
          <div className="selected-shown">
            <span className="label" style={this.state.fu.length <= 0 ? {flex: 1} : null}>副</span>
            {
              this.state.fu.map((num, index) =>
                <span style={BALLS[num]} className="selected-num" key={index}>{num}</span>
              )
            }
          </div>
        </div>
        <BallsGrid handleSelect={this.handleSelect} upperLimit="10" selectedBalls={this.nums}/>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.nums = [];
      this.setState({
        zheng: [],
        fu:[]
      })
    }
  }
}
