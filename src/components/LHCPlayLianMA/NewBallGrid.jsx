import React from 'react'
import { connect } from 'react-redux'
import { layoutData, JXP } from '../../helpers/utils'
import { BALLS } from '../common/Balls.jsx'

class BallGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.renderNumber = this.renderNumber.bind(this)
    this.selectedNum = []
  }

  renderNumber(num) {
    if( num === '' ) return null
    let ballStyle = Object.assign({}, BALLS[num])
    ballStyle.cursor = 'pointer'
    if (this.selectedNum.includes(num)) {
      ballStyle.backgroundColor = '#d2d2d2'
      ballStyle.color = '#e6e6e6'
    }
    return <span style={ballStyle} onClick={this.handleBallClick.bind(this, num)}>{num}</span>
  }

  handleBallClick(num, event) {
    if(!this.selectedNum.includes(num)) {
      this.selectedNum.push(num)
      this.props.handleSelect(num)
    }
  }

  handleQuickClick(nums) {
    if (nums != null && nums.length > 0) {
      let newArr = []
      for (let num of nums) {
        if (!this.selectedNum.includes(num)) {
          newArr.push(num)
          this.selectedNum.push(num)
        }
      }
      this.props.handleSelect(newArr)
    }

  }


  render() {
    const { xiaobo } = this.props.currentLottery
    if (this.selectedNum.length > 0 && this.props.revertNum != null){
      for (let num of this.props.revertNum) {
        if (this.selectedNum.includes(num)){
          this.selectedNum.splice(this.selectedNum.indexOf(num), 1)
        }
      }
    }
    return (
      <div className="quick-ball-grid">
        <div className="wei-shu">
        {
          JXP.weishu.map((item, index) =>
            <div className="row" key={index}>
              <div onClick={this.handleQuickClick.bind(this, item.nums)}>{item.label}</div>
            </div>
          )
        }
        </div>
        <div className="ball-grid">
        {
          layoutData.map((rows, index) =>
            <div className="row" key={index}>
            {
              rows.map((num, index) =>
                <div className="cell" key={index}>
                {
                  this.renderNumber(num)
                }
                </div>
              )
            }
            </div>
          )
        }
        </div>
        <div className="xiao-bo">
        {
          xiaobo.map((items, index) =>
            <div className="col" key={index}>
            {
              items.map((item, index) =>
                <div className="row" key={index}>
                  <div onClick={this.handleQuickClick.bind(this, item.nums)}>{item.label}</div>
                </div>
              )
            }
            </div>
          )
        }
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.selectedNum = []
    }
  }
}

const mapStateToProps = (state) => {
  const { currentLottery } = state
  return {
    currentLottery
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     layoutSet: (layout) => {
//       dispatch(layoutSet(layout))
//     },
//   }
// }

export default connect(mapStateToProps, null)(BallGrid)
