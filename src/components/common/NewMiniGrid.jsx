import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { SetCurrentBetData, SetShowBetData, SetBetData, SetXCShengxiao, SetXCWeishu, SetOrderConfirm } from '../../redux/actions'
import { HeXiaoMethod } from '../../helpers/utils'
import {BALLS, NUMS} from './Balls.jsx'

class MiniGrid extends React.Component {
  constructor(props) {
    super(props)
    this.cols = 2
    this.selectedNum = []
    this.count = 0
    this.shengxiao = []
    this.weishu = []
    this.state = {
      selectedItem: []
    }
  }

  handleWrapClick(event) {
    let els = event.target.children
    for(let i = 0; i < els.length; i++) {
      if(els[i].type === 'radio' || els[i].type === 'checkbox') {
        els[i].click()
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.lhcBetData.OrderConfirm !== nextProps.lhcBetData.OrderConfirm) {
      this.setState({ selectedItem: [] })
      this.props.handleSelect('shengxiao', null, null)
      this.props.handleSelect('weishu', null, null)
      this.props.SetOrderConfirm(false)
    }
  }

  componentWillMount() {
    const { layout, SetShowBetData } = this.props
    let showBetData = {}
    if (layout.name === '野兽') {
      showBetData = HeXiaoMethod.yeshou
    }
    SetShowBetData(showBetData)
  }

  handleClick(rank, name, val, checkType) {
    const { newAnimals } = this.props
    const { model, handleSelect, upperLimit } = this.props
    const { selectedItem } = this.state
    const type = this.props.name
    let selectedNum = this.selectedNum
    let action = 'add'
    let factsNumList = []
    if (type === 'shengxiao') {
      factsNumList = Object.keys(newAnimals).filter(n => newAnimals[n] === name)
    } else {
      factsNumList = NUMS[rank]
    }
    if (checkType === 'radio') {
      this.setState({selectedItem: val.split()})
      selectedNum = factsNumList
    } else {
      if (!selectedItem.includes(val)) {
        if (upperLimit && this.count >= upperLimit) return false
        this.setState({selectedItem:  [...selectedItem, val]})
        selectedNum = selectedNum.concat(factsNumList)
        this.count ++
      } else {
        this.count --
        action = 'del'
        let res = Immutable.fromJS(selectedItem).toJS()
        res.splice(selectedItem.indexOf(val), 1)
        this.setState({ selectedItem: res })
        selectedNum = selectedNum.filter( num => !factsNumList.includes(num))
      }
    }
    if (model === 'duipeng') {
      handleSelect(type, factsNumList, val, action)
    } else {
      handleSelect(type, selectedNum, val, action)
    }
    this.selectedNum = selectedNum
  }

  render() {
    const { data, name, newAnimals, defaultItem } = this.props
    const { selectedItem } = this.state
    let length = data.length
    let cols = this.cols
    let rows = length % cols === 0 ? length / cols : length / cols + 1
    if (defaultItem && defaultItem.length > 0) {
      this.setState({selectedItem:defaultItem})
      this.count = defaultItem.length
    }
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
                        <i className={`iconfont ${selectedItem.includes(cell.value) ? check : unCheck}`} />
                        <span>{cell.name}</span>
                      </div>
                      <div className="nums">
                      {
                        name === 'shengxiao' ? (
                          Object.keys(newAnimals).filter(n => newAnimals[n] === cell.name).map((num, index) =>
                            <div key={index}>
                              <span style={selectedItem.includes(cell.value) ?
                                  ((this.props.selectedNum && this.props.selectedNum.includes(num)) ?
                                  Object.assign({}, BALLS[num], {backgroundColor: '#d2d2d2'}) : BALLS[num]) : null}>
                                {num}
                              </span>
                            </div>
                          )
                        ) : (
                          NUMS[String(cell.name)].map((num, index) =>
                            <div key={index}>
                              <span style={selectedItem.includes(cell.value) ?
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
      this.setState({selectedItem: []})
      this.selectedNum = []
      this.count = 0
    }

  }

}

const mapStateToProps = (state) => {
  const { currentLottery, lhcBetData, layout } = state
  return {
    layout,
    lhcBetData,
    newAnimals: currentLottery.newAnimals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetCurrentBetData: (currentBetData) => {
      dispatch(SetCurrentBetData(currentBetData))
    },
    SetShowBetData: (showBetData) => {
      dispatch(SetShowBetData(showBetData))
    },
    SetBetData: (betData) => {
      dispatch(SetBetData(betData))
    },
    SetXCShengxiao: (Shengxiao) => {
      dispatch(SetXCShengxiao(Shengxiao))
    },
    SetXCWeishu: (weishu) => {
      dispatch(SetXCWeishu(weishu))
    },
    SetOrderConfirm: (weishu) => {
      dispatch(SetOrderConfirm(weishu))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGrid)
