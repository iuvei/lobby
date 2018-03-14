import React from 'react'
import {BALLS, NUMS} from '../../common/Balls.jsx'

export default class SimpleBallGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.count = 0
    this.data = [
      ['01', '11', '21', '31', '41'],
      ['02', '12', '22', '32', '42'],
      ['03', '13', '23', '33', '43'],
      ['04', '14', '24', '34', '44'],
      ['05', '15', '25', '35', '45'],
      ['06', '16', '26', '36', '46'],
      ['07', '17', '27', '37', '47'],
      ['08', '18', '28', '38', '48'],
      ['09', '19', '29', '39', '49'],
      ['10', '20', '30', '40', '']
    ]

    this.selectedNum = []
    this.selectedSeBo = ''

  }

  handleClick(num, event) {
    if (this.props.seBo || (this.props.selectedNum && this.props.selectedNum.includes(num))) {
      return false
    }
    let selectedNum = this.selectedNum
    if (selectedNum.includes(num)) {
      selectedNum.splice(selectedNum.indexOf(num), 1)
      this.count -= 1
    } else {
      if (this.count >= this.props.upperLimit) return false
      selectedNum.push(num)
      this.count += 1
    }
    this.props.handleSelect(this.props.name, selectedNum)
  }

  handleSeBoClick(sebo) {
    this.selectedSeBo = sebo
    this.selectedNum = NUMS[sebo]
    this.props.handleSelect(this.props.name, this.selectedNum)
  }

  render() {
    return (
      <div className="simple-ball-grid">
        <div className="row main-title">{this.props.header}</div>
        {
          this.props.seBo ?
          <div className="row">
            <div className="cell se-bo" onClick={e => {
                this.handleSeBoClick('hongbo')
              }}>
              <i className={`iconfont ${this.selectedSeBo ==='hongbo' ? 'icon-radio-check' : 'icon-radio-uncheck'}`}/>
              <span style={{color: '#ff5252'}}>红波</span>
            </div>
            <div className="cell se-bo" onClick={e => {
                this.handleSeBoClick('lvbo')
              }}>
              <i className={`iconfont ${this.selectedSeBo ==='lvbo' ? 'icon-radio-check' : 'icon-radio-uncheck'}`}/>
              <span style={{color: '#70c652'}}>绿波</span>
            </div>
            <div className="cell se-bo" onClick={e => {
                this.handleSeBoClick('lanbo')
              }}>
              <i className={`iconfont ${this.selectedSeBo ==='lanbo' ? 'icon-radio-check' : 'icon-radio-uncheck'}`}/>
              <span style={{color: '#63b6eb'}}>蓝波</span>
            </div>
          </div>
          : null
        }
        <div className="ball-grid">
        {
          this.data.map((rows, index) =>
            <div className="row" key={index}>
            {
              rows.map((num, index) =>
                <div className="cell" key={index}>
                {
                  this.renderBall(num)
                }
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

  renderBall(num) {
    let ballStyle = Object.assign({}, BALLS[num], {cursor: 'pointer'})
    if (this.selectedNum.includes(num) || (this.props.selectedNum && this.props.selectedNum.includes(num))) {
      ballStyle.backgroundColor = '#d2d2d2'
    }
    return <span style={ballStyle} onClick={this.handleClick.bind(this, num)}>{num}</span>
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.count = 0
      this.selectedNum = []
      this.selectedSeBo = ''
    }
  }

}
