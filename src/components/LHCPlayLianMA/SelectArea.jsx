import React from 'react'
import {BALLS} from '../common/Balls.jsx'

export default class SelectArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
    this.initCols = this.props.selectedNum.length
  }

  renderNumber(wrapIndex, index, num) {
    let ballStyle = Object.assign({cursor: 'pointer', display: 'inline-block'}, BALLS[num])

    return <span style={ballStyle} key={index} onClick={this.handleMove.bind(this, wrapIndex, num)}>{num}</span>
  }

  handleMove(index, num, event) {
    event.stopPropagation()
    this.props.removeNum(index, num)
  }

  handleClick(index, event) {
    event.stopPropagation()
    this.setState({
      selectedIndex: index
    })
    this.props.setIndex(index)
  }

  renderBalls(nums, wrapIndex) {
    if(nums) {
      return (
        nums.map((num, index) =>
          this.renderNumber(wrapIndex, index, num)
        )
      )
    } else {
      return null
    }

  }

  handleDelClick(index, event) {
    if(index <= this.state.selectedIndex) {
      let curIndex = this.state.selectedIndex - 1
      this.setState({
        selectedIndex: curIndex
      })
    }
    this.props.delColumn(index)
  }

  render() {
    return (
      <div className="select-area">
        {
          this.props.selectedNum.map((nums, index) =>
            <div key={index} className="item" onClick={this.handleClick.bind(this, index)}
              style={this.state.selectedIndex === index ? {borderColor: 'red'} : null}>
            {
              this.renderBalls(nums, index)
            }
            {
              this.initCols < this.props.selectedNum.length ? (
                <button className="del" onClick={this.handleDelClick.bind(this, index)}>
                  <i className="iconfont">&#xe63d;</i>
                </button>
              ) : null
            }
            </div>
          )
        }
        <button className="btn add" onClick={this.props.addColumn}>新增柱列</button>

      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.setState({
        selectedIndex: 0
      })
      this.props.setIndex(0)
      return null
    }
    if(this.props.selectedNum != null && this.state.selectedIndex >= this.props.selectedNum.length) {
      let index = (this.props.selectedNum.length - 1) <= 0 ? 0 : (this.props.selectedNum.length - 1)
      this.setState({
        selectedIndex: index
      })
      this.props.setIndex(index)
    }
  }
}
