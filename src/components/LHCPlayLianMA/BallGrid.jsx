import React from 'react'
import {BALLS, NUMS} from '../common/Balls.jsx'

export default class BallGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.renderNumber = this.renderNumber.bind(this)
    const shengXiao = props.shengXiao
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
    this.weishu = [
      {label: '尾 1', nums: NUMS['1']},
      {label: '尾 2', nums: NUMS['2']},
      {label: '尾 3', nums: NUMS['3']},
      {label: '尾 4', nums: NUMS['4']},
      {label: '尾 5', nums: NUMS['5']},
      {label: '尾 6', nums: NUMS['6']},
      {label: '尾 7', nums: NUMS['7']},
      {label: '尾 8', nums: NUMS['8']},
      {label: '尾 9', nums: NUMS['9']},
      {label: '尾 0', nums: NUMS['0']}
    ]
    this.xiaobo = [
      [
        {label: '鼠', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '鼠')},
        {label: '牛', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '牛')},
        {label: '虎', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '虎')},
        {label: '兔', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '兔')},
        {label: '龙', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '龙')},
        {label: '蛇', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '蛇')},
        {label: '马', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '马')},
        {label: '羊', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '羊')},
        {label: '猴', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '猴')},
        {label: '鸡', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '鸡')}
      ],
      [
        {label: '狗', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '狗')},
        {label: '猪', nums: Object.keys(shengXiao).filter(n => shengXiao[n] === '猪')},
        {label: '红波', nums: NUMS['hongbo']},
        {label: '绿波', nums: NUMS['lvbo']},
        {label: '蓝波', nums: NUMS['lanbo']},
        {label: '', nums: []},
        {label: '', nums: []},
        {label: '', nums: []},
        {label: '', nums: []},
        {label: '', nums: []}
      ]
    ]
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
          this.weishu.map((item, index) =>
            <div className="row" key={index}>
              <div onClick={this.handleQuickClick.bind(this, item.nums)}>{item.label}</div>
            </div>
          )
        }
        </div>
        <div className="ball-grid">
        {
          this.data.map((rows, index) =>
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
          this.xiaobo.map((items, index) =>
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
        <div className="tips">选择号码（或按生肖、尾数、色波选择）</div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.selectedNum = []
    }
  }

}
