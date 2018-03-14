import React from 'react'
import { BALLS, NUMS } from './BallsOld.jsx'

export default class MiniGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.cols = 2
    this.selectedItem = []
    this.selectedNum = []
    this.count = 0
  }

  handleWrapClick(event) {
    let els = event.target.children
    for(let i = 0; i < els.length; i++) {
      if(els[i].type === 'radio' || els[i].type === 'checkbox') {
        els[i].click()
      }
    }
  }

  handleClick(dataType, dataName, val, checkType) {
    const { shengXiao, name, model, handleSelect, upperLimit } = this.props
    let selectedNum = this.selectedNum
    let action = 'add'
    let factsNumList = []
    if (name === 'shengxiao') {
      factsNumList = Object.keys(shengXiao).filter(n => shengXiao[n] === dataName)
    } else {
      factsNumList = NUMS[dataType]
    }
    if (checkType === 'radio') {
      this.selectedItem = []
      this.selectedItem.push(val)
      selectedNum = factsNumList
    } else {
      if (!this.selectedItem.includes(val)) {
        if (upperLimit && this.count >= upperLimit) return false
        this.selectedItem.push(val)
        selectedNum = selectedNum.concat(factsNumList)
        this.count ++
      } else {
        this.count --
        action = 'del'
        this.selectedItem.splice(this.selectedItem.indexOf(val), 1)
        selectedNum = selectedNum.filter( num => !factsNumList.includes(num))
      }
    }
    if (model === 'duipeng') {
      handleSelect(name, factsNumList, val, action)
    } else if (model === 'hexiao') {
      handleSelect(dataName, action, this.selectedItem)
    } else {
      handleSelect(name, selectedNum, val, action)
    }
    this.selectedNum = selectedNum
  }

  render() {
    if (this.props.defaultItem && this.props.defaultItem.length > 0) {
      this.selectedItem = this.props.defaultItem
      this.count = this.selectedItem.length
    }
    const { data, shengXiao, name } = this.props
    let length = data.length
    let cols = this.cols
    let rows = length % cols === 0 ? length / cols : length / cols + 1
    return (
      <div className="mini-grid">
        <div className="row main-title">{this.props.header}</div>
        {
          Array.from({length: rows}).map((row, rowIndex) =>
            <div key={rowIndex} className="row">
            {
              Array.from({length: cols}).map((col, colIndex) =>
                {
                  let cell = data[rowIndex * cols + colIndex]
                  let check = this.props.type === 'radio' ? 'icon-radio-check' : 'icon-checkbox-check'
                  let unCheck = this.props.type === 'radio' ? 'icon-radio-uncheck' : 'icon-checkbox-uncheck'
                  return (
                    <div key={colIndex} className="cell" style={{width: '50%'}}>
                      <div className="label" onClick={e => {
                          this.handleClick(cell.type, cell.name, cell.value, this.props.type)
                        }}>
                        <i className={`iconfont ${this.selectedItem.includes(cell.value) ? check : unCheck}`} />
                        <span>{cell.name}</span>
                      </div>
                      <div className="nums">
                      {
                        name === 'shengxiao' ? (
                          Object.keys(shengXiao).filter(n => shengXiao[n] === cell.name).map((num, index) =>
                            <div key={index}>
                              <span style={this.selectedItem.includes(cell.value) ?
                                  ((this.props.selectedNum && this.props.selectedNum.includes(num)) ?
                                  Object.assign({}, BALLS[num], {backgroundColor: '#d2d2d2'}) : BALLS[num]) : null}>
                                {num}
                              </span>
                            </div>
                          )
                        ) : (
                          NUMS[cell.type].map((num, index) =>
                            <div key={index}>
                              <span style={this.selectedItem.includes(cell.value) ?
                                  ((this.props.selectedNum && this.props.selectedNum.includes(num)) ?
                                  Object.assign({}, BALLS[num], {backgroundColor: '#d2d2d2'}) : BALLS[num]) : null}>
                                {num}
                              </span>
                            </div>
                          )
                        )

                      }
                      </div>
                    </div>
                  )
                }
              )
            }
            </div>
          )
        }
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.selectedItem = []
      this.selectedNum = []
      this.count = 0
    }

  }

}
