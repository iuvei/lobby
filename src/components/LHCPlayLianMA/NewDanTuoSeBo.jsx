import React from 'react'
import { connect } from 'react-redux'
import { SetCurrentBetData, SetOrderConfirm } from '../../redux/actions'
import SimpleBallGrid from './NewSimpleBallGrid.jsx'

class DanTuoSeBo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dan: [],
      sebo: []
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
          upperLimit={this.props.series - 1} reset={this.props.reset} selectedNum={this.state.sebo}/>
        <SimpleBallGrid header="色波" name="sebo" handleSelect={this.handleSelect}
          upperLimit="49" reset={this.props.reset} seBo="true" selectedNum={this.state.dan}/>
      </div>
    )
  }

  handleSelect(name, nums) {
    this.selectedNum[name] = nums;
    if (name === 'dan') {
      this.setState({
        dan: nums
      })
    } else if (name === 'sebo') {
      this.setState({
        sebo: nums
      })
    }
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
      this.selectedNum = {};
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.lhcBetData.OrderConfirm !== nextProps.lhcBetData.OrderConfirm) {
      this.props.handleReset()
      this.props.SetOrderConfirm(false)
      this.setState({
        dan: [],
        sebo: []
      })
    }
  }
}

const mapStateToProps = (state) => {
  const { lhcBetData } = state
  return {
    lhcBetData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetCurrentBetData: (betData) => {
      dispatch(SetCurrentBetData(betData))
    },
    SetOrderConfirm: (betData) => {
      dispatch(SetOrderConfirm(betData))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DanTuoSeBo)
