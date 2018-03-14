import React, { Component } from 'react'

class Input extends Component {

  handleChange(event) {
    const { orderInfo } = this.props
    let val = event.target.value
    let categoryIdList = ['3', '5']
    if (categoryIdList.includes(orderInfo.categoryId)) {
      val = val.replace(/[;，；]/g, ',').replace(/[\r\n]/g, ',\r\n').replace(/,{2,}/g, ',')
    } else {
      val = val.replace(/[,;，；]/g, ' ').replace(/[\r\n]/g, ' \r\n')
    }
    event.target.value = val
    this.props.input(val)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.inputRawData !== this.props.inputRawData) {
      return true
    }
    return false
  }

  render() {
    let inputRawData = this.props.inputRawData || ''
    const { orderInfo } = this.props
    let categoryIdList = ['3', '5']
    let specialMark = categoryIdList.includes(orderInfo.categoryId)
    return(
      <div className="input animated bounceInRight">
        <textarea onChange={this.handleChange.bind(this)} value={inputRawData}></textarea>
        <span className="tips">
          {`每一注号码之间请用一个${specialMark ? '' : '空格[ ]、'} 逗号[,] 或者 分号[;] 隔开
          （输入的号码会自动排序并去除不合格号码）。`}
        </span>
      </div>
    )
  }
}

export default Input
