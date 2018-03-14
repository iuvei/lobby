import React from 'react'
import { BALLS } from './Balls.jsx'


export default class BallsGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.checkCount = 0
    this.data = {
      title: ['号码', '勾选'],
      cols: 5,
      rows: [
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
    }
  }

  renderHeader(titles, cols, cellStyle) {
    if(titles != null ){
      return (
        <div className="row title">
        {
          Array.from({length: cols}).map((item, index) =>
            <div className="cell" style={cellStyle} key={index}>
              <div className="number" style={{width: '50%', color: '#333'}}>{titles[0]}</div>
              <div className="select" style={{width: '50%', color: '#333'}}>{titles[1]}</div>
            </div>
          )
        }
        </div>
      )
    } else {
      return null
    }
  }


  renderIn(num) {
    if(!num){
      return null
    } else {
      let selectedBalls = this.props.selectedBalls || []
      return <i className={`iconfont ${selectedBalls.includes(num) ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
    }
  }

  getWidth(cols) {
    let num = 1 / cols
    return (num * 100).toFixed(2) + '%'
  }

  handleClick(num) {
    let action = 'add'
    let selectedBalls = this.props.selectedBalls || []
    if(!selectedBalls.includes(num)) {
      if(this.checkCount >= this.props.upperLimit) {
        return false
      }
      this.checkCount += 1
    } else {
      this.checkCount -= 1
      action = 'del'
    }
    this.props.handleSelect(action, num)
  }

  render() {
    var data = this.data
    var cellWidth = this.getWidth(data.cols)
    var cellStyle = {
      width: cellWidth
    }
    return (
      <div className="balls-grid">
      {
        this.renderHeader(data.title, data.cols, cellStyle)
      }
      {
        data.rows.map((row, index) =>
          <div key={index} className="row">
          {
            row.map((num, index) =>
              <div key={index} className="cell" style={cellStyle}>
                <div className="number" style={{width: '50%'}}>
                  <span style={BALLS[num]}>{num}</span>
                </div>
                <div className="select" style={{width: '50%'}} onClick={e => {
                    this.handleClick(num)
                  }}>
                  {this.renderIn(num)}
                </div>
              </div>
            )
          }
          </div>
        )
      }
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.selectedBalls !== nextProps.selectedBalls) {
      this.checkCount = 0
    }
  }
}
