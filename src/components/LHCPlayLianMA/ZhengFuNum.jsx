import React from 'react';
import { connect } from 'react-redux'
import { SetCurrentBetData, SetShowBetData } from '../../redux/actions'
import BallsGrid from '../common/NewBallsGrid.jsx';


class ZhengFuNum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zheng: [],
      fu:[],
      num: []
    }
  }

  handleSelect = (num) => {
    const { lhcBetData, SetCurrentBetData, SetShowBetData } = this.props
    const { playWay,tabIndex } = lhcBetData
    const zheng = lhcBetData.showBetData.zheng || []
    const fu = lhcBetData.showBetData.fu || []
    let nums = lhcBetData.showBetData.nums || [], currentBetData = []
    if (zheng.length && zheng.includes(num)) {
      zheng.splice(zheng.indexOf(num), 1)
    } else if (!zheng.length) {
      if (!fu.includes(num)) {
        zheng.push(num)
      } else if (fu.includes(num)) {
        fu.splice(fu.indexOf(num), 1)
      }
    } else if (zheng.length && !zheng.includes(num)) {
      if (fu.includes(num)) {
        fu.splice(fu.indexOf(num), 1)
      } else {
        fu.push(num)
      }
    }
    this.setState({
      zheng,
      fu,
      nums
    })
    SetShowBetData({
      ...lhcBetData.showBetData,
      zheng,
      fu,
      nums
    })
    let combination = this.getCombination(zheng, fu)
    if (combination) {
      combination.map((item, index) =>
        currentBetData.push({
          content: item.replace(/\s|\xA0/g,"") ,
          playId: lhcBetData.play_id,
          number: `${playWay.play[0].detail[tabIndex].name}`
        }))
    }
    SetCurrentBetData(currentBetData)
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

        <BallsGrid handleSelect={this.handleSelect} upperLimit="10" />
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.setState({
        zheng: [],
        fu:[],
        nums: []
      })
    }
  }
}

const mapStateToProps = (state) => {
  const { lhcBetData } = state
  return {
    lhcBetData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetCurrentBetData: (currentBetData) => {
      dispatch(SetCurrentBetData(currentBetData))
    },
    SetShowBetData: (currentBetData) => {
      dispatch(SetShowBetData(currentBetData))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZhengFuNum)
