import React from 'react'
import {BALLS} from '../common/Balls.jsx'

export default class NormalGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuickFill: {}
    }
    this.TDTitleWidth = 10
    this.ODTitleWidth = 90
    this.handleChange = this.handleChange.bind(this)
  }

  renderTitle(data, cellStyle) {
    if(!data.hideTitle){
      return (
        <div className="row title" style={data.TDTitle ? {backgroundColor: '#FFFCFA', color: '#333333'} : null}>
        {
          data.TDTitle ? (
            <div className="cell" style={{width: this.TDTitleWidth + '%'}}>
              <div className="td-title">
                {data.TDTitle[0]}
              </div>
            </div>
          ) : null
        }
        {
          Array.from({length: data.cols}).map((item, index) =>
            <div className="cell" style={cellStyle} key={index}>
            {
              data.title.map((item, index) =>
                {
                  let itemStyle = {width: item.width}
                  if (data.TDTitle) {
                    itemStyle = Object.assign(itemStyle, {color: '#333'})
                  }
                  if (item.type === 'number') {
                    return <div style={itemStyle} key={index}>号码</div>
                  } else if (item.type === 'shengXiao') {
                    return <div style={itemStyle} key={index}>号码</div>
                  } else if (item.type === 'odds' || item.type === 'odds_radio') {
                    return <div style={itemStyle} key={index}>赔率</div>
                  } else if (item.type === 'money') {
                    return <div style={itemStyle} key={index}>金额</div>
                  } else if (item.type === 'label') {
                    return <div style={itemStyle} key={index}>{item.name}</div>
                  } else if (item.type === 'balls') {
                    return <div style={itemStyle} key={index}>号码</div>
                  }else if (item.type === 'radio') {
                    return <div style={itemStyle} key={index}>{item.name}</div>
                  } else {
                    return item
                  }
                }
              )
            }
            </div>
          )
        }
        </div>
      )
    } else {
      return null
    }
  }

  getWidth(cols, TDTitle) {
    let coefficient = 100
    if (TDTitle) {
      coefficient = 90
    }
    let num = (coefficient / cols).toFixed(3)
    return num.substring(0, num.length - 1) + '%'
  }



  renderIn(cell) {
    if(cell.name === null){
      return null
    } else {
      const { betResult, goldList } = this.props
      return (
        <div onMouseLeave={this.handleMouseLeave.bind(this)}>
          {
            cell.name ?
              <input type="text" name={cell.name} key={cell.name}
                onChange={ e => {
                  this.handleChange(e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,''), e.target.name)
                }}
                value={betResult[cell.name] || ''}
                onClick={this.handleMoney.bind(this, cell.name)}/>
             : null
          }          
          {
            goldList && this.state.showQuickFill[cell.name] ? (
              <div className="quick-fill">
              {
                goldList.map((item, index) =>
                  <div key={index} onClick={this.handleMoneySelect.bind(this, item, cell.name)}>{`${item} 元`}</div>
                )
              }
              </div>
            ) : null
          }

        </div>
      )
    }
  }

  handleMouseLeave() {
    if (Object.keys(this.state.showQuickFill).length > 0) {
      this.setState({
        showQuickFill: {}
      })
    }
  }

  handleMoneySelect(val, name, event) {
    this.props.setBetResult('add', name, val)
    this.setState({
      showQuickFill: {}
    })
  }

  handleMoney(name, event) {
    let showQuickFill = this.state.showQuickFill
    showQuickFill = {}
    showQuickFill[name] = true
    this.setState({
      showQuickFill: showQuickFill
    })
  }

  handleChange(value, name) {
    let action = 'add'
    if(value === 0 || value === null || value === '') {
      action = 'del'
    }
    this.props.setBetResult(action, name, value)
  }

  render() {
    const data = this.props.data
    let cellWidth = this.getWidth(data.cols, data.TDTitle)
    let cellStyle = {
      width: cellWidth
    }
    return (
      <div className="bet-grid">
        {
          data.mainTitle ? <div className="row title main-title">{data.mainTitle}</div> : null
        }
        {
          data.totleTitle ? (
            <div className="row title totle-title">
              <div style={{width: this.TDTitleWidth + '%'}}></div>
              {
                data.totleTitle.map((title, index) =>
                  <div key={index} style={cellStyle}>{title}</div>
                )
              }
            </div>
          ) : null
        }
        {
         this.renderTitle(data, cellStyle)
        }
        {
          this.renderTbody(data, cellStyle)
        }
      </div>
    )
  }


  renderTbody(data, cellStyle) {
    const { betResult, shengXiao } = this.props
    let cellsLength = data.cells.length
    let cols = data.cols
    let rows = (cellsLength % cols) === 0 ? (cellsLength / cols) :  (cellsLength / cols ) + 1
    var odds = this.props.odds || {}
    return (
      Array.from({length: rows}).map((row, rowIndex) =>
        <div key={rowIndex} className="row">
        {
          data.TDTitle ? (
            <div className="cell" style={{width: this.TDTitleWidth + '%'}}>
              <div className="td-title">
                {data.TDTitle[rowIndex + 1]}
              </div>
            </div>
          ) : null
        }
        {
          Array.from({length: cols}).map((col, colIndex) =>
            {
              let cell = data.cells[rowIndex * cols + colIndex]
              return (
                <div key={colIndex} className="cell" style={cellStyle}>
                {
                  data.title.map((item, index) =>
                    {
                      if (item.type === 'number') {
                        return (
                          <div className="number" style={{width: item.width}} key={index}>
                            <span style={BALLS[cell.number]} key={index}>{cell.number}</span>
                          </div>
                        )
                      } else if (item.type === 'shengXiao') {
                        return (
                          <div className="sheng-xiao" style={{width: item.width}} key={index}>
                            <span key={index}>
                              {Object.keys(shengXiao).filter(n => shengXiao[n] === cell.label).join(', ')}
                            </span>
                          </div>
                        )
                      } else if (item.type === 'odds') {
                        return (
                          <div className={`odds ${Object.keys(betResult).includes(cell.name) && 'item-selected'}`} style={{width: item.width}} key={index}>
                            <span>{odds[cell.name]}</span>
                          </div>
                        )
                      } else if (item.type === 'money') {
                        return (
                          <div className={`money ${Object.keys(betResult).includes(cell.name) && 'item-selected'}`} style={{width: item.width}} key={index}>
                            {this.renderIn(cell)}
                          </div>
                        )

                      } else if (item.type === 'label') {
                        return <div className="label" style={{width: item.width}} key={index}>{cell.label}</div>
                      } else if (item.type === 'balls') {
                        return (
                          <div className="balls" style={{width: item.width}} key={index}>
                          {
                            cell.balls.map((ball, index) =>
                              <span style={BALLS[ball]} key={index}>{ball}</span>

                            )
                          }
                          </div>
                        )
                      } else if (item.type === 'odds_radio') {
                        return (
                          <div className="odds" style={{width: item.width}} key={index}>
                            <span>{odds[cell.value]}</span>
                          </div>
                        )
                      } else if (item.type === 'radio') {
                        return (
                          <div className="radio" style={{width: item.width}} key={index}
                            onClick={e => { this.props.setBetResult(cell.name, cell.value) }}>
                            <i className={`iconfont ${this.props.betResult[cell.name] === cell.value ? 'icon-radio-check' : 'icon-radio-uncheck'}`}/>
                          </div>
                        )
                      } else {
                        return item
                      }
                    }
                  )
                }
                </div>
              )
            }
          )
        }
        </div>
      )
    )
  }

}
