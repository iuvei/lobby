import React from 'react'
import BallGrid from './BallGrid.jsx'
import SelectArea from './SelectArea.jsx'

export default class JiaoChaPeng extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedNum: Array.from({length: this.props.series})
    }
    this.index = 0
    this.setIndex = this.setIndex.bind(this)
    this.getCombination = this.getCombination.bind(this)
    this.combination = []
  }

  getCombination() {
    this.combination = []
    let selectedNum = this.state.selectedNum
    let series = this.props.series
    if (selectedNum.length >= series) {
      for (let i = 0; i < selectedNum.length - (series - 1); i++) {
        if (!selectedNum[i] || selectedNum[i].length <= 0) continue
        for (let num of selectedNum[i]) {
          if (num == null) continue
            for (let j = i + 1; j < selectedNum.length - (series - 2); j++) {
              if (!selectedNum[j] || selectedNum[j].length <= 0) continue
              for (let num_2 of selectedNum[j]) {
                if (num_2 == null) continue
                let com = num + ',  ' + num_2
                if (series > 2) {
                  for (let m = j + 1; m < selectedNum.length - (series - 3); m++) {
                    if (!selectedNum[m] || selectedNum[m].length <= 0) continue
                    for (let num_3 of selectedNum[m]) {
                      if (num_3 == null) continue
                      let com_1 = com + ',  ' + num_3
                      if (series > 3) {
                        for (let n = m + 1; n < selectedNum.length - (series - 4); n++) {
                          if (!selectedNum[n] || selectedNum[n].length <= 0) continue
                          for (let num_4 of selectedNum[n]) {
                            if (num_4 == null) continue
                            let com_2 = com_1 + ',  ' + num_4
                            this.combination.push(com_2)
                          }
                        }
                      } else {
                        this.combination.push(com_1)
                      }
                    }
                  }
                } else {
                  this.combination.push(com)
                }
              }
            }
        }
      }
      this.props.setBetResult(this.combination, selectedNum)
    }
  }


  handleSelect(nums, event) {
    let selectedNum = this.state.selectedNum
    let item = selectedNum[this.index] || []
    if(nums instanceof Array) {
      for (let num of nums) {
        item.push(num)
      }
    } else {
      item.push(nums)
    }

    selectedNum[this.index] = item
    this.setState({
      selectedNum: selectedNum,
      revertNum: null
    })
    this.getCombination()
  }

  setIndex(index) {
    this.index = index
  }

  removeNum(index, num) {
    let selectedNum = this.state.selectedNum
    let item = selectedNum[index]
    item.splice(item.indexOf(num), 1)
    selectedNum[index] = item
    this.setState({
      selectedNum: selectedNum,
      revertNum: Array.of(num)
    })
    this.getCombination()
  }

  addColumn() {
    let selectedNum = this.state.selectedNum
    selectedNum.push([])
    this.setState({
      selectedNum: selectedNum
    })
  }

  delColumn(index) {
    let selectedNum = this.state.selectedNum
    let revertNum = selectedNum[index]
    selectedNum.splice(index, 1)
    if(index <= this.index) {
      this.index = this.index - 1
    }
    this.setState({
      selectedNum: selectedNum,
      revertNum: revertNum
    })

    this.getCombination()

  }

  render() {
    const { shengXiao } = this.props
    return (
      <div className="jiao-cha-peng">
        <BallGrid
          shengXiao={shengXiao}
          handleSelect={this.handleSelect.bind(this)}
          revertNum={this.state.revertNum}
          reset={this.props.reset}/>
        <SelectArea selectedNum={this.state.selectedNum} setIndex={this.setIndex}
          removeNum={this.removeNum.bind(this)} addColumn={this.addColumn.bind(this)}
          delColumn={this.delColumn.bind(this)} reset={this.props.reset}/>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.index = 0
      this.setState({
        selectedNum: Array.from({length: this.props.series}),
        revertNum: []
      })
    }
  }
}
