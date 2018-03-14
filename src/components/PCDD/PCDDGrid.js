import React, { Component } from 'react'
import { COLOR } from './PCDDColor'

class LuckyGrid extends Component {
  render() {
    const { data, selectedItems, moneyChange } = this.props
    return(
      <div className="lucky-grid">
        <div className="grid-header">
          {
            data.map((item, index) =>
              <div key={index} style={{width: `${item.cols / 4 * 100}%`}}>
                <div className="label">{item.label}</div>
              </div>
            )
          }

        </div>
        <div className="grid-title">
          {
            Array.from({length: 4}).map((col, index) =>
              <div key={index} className='title-col'>
                <div className="option">选项</div>
                <div className="lucky-odds">赔率</div>
                <div className="money">金额</div>
              </div>
            )
          }
        </div>
        <div className="grid-body">
          {
            data.map((item, index) => {
              return (
                Array.from({length: item.cols}).map((col, colIndex) =>
                  <div className="body-col" key={colIndex}>
                  {
                    Array.from({length: item.rows}).map((row, rowIndex) => {
                      let cell = item.cells[colIndex * item.rows + rowIndex]
                      if (cell) {
                        let labelStyle = Object.assign({}, COLOR[cell.play_id])
                        if (isNaN(cell.label)) {
                          labelStyle['fontSize'] = '0.875rem'
                          if (cell.label.length > 1) {
                            labelStyle['width'] = '54px'
                            labelStyle['borderRadius'] = '24px'
                          }
                        }
                        let money = ''
                        if (selectedItems && selectedItems.length > 0) {
                          let curRes = selectedItems.filter(n => n.playId === cell.play_id)
                          if (curRes.length > 0) {
                            money = curRes[0].money
                          }
                        }
                        return (
                          <div className="body-row" key={rowIndex}>
                            <div className="option">
                              <div style={labelStyle} >{cell.label}</div>
                            </div>
                            <div className="lucky-odds">
                              <span>{cell.odds}</span>
                            </div>
                            <div className="money">
                              {
                                <input
                                  name={cell.label}
                                  maxLength={6}
                                  value={money}
                                  onChange={e => {
                                    moneyChange(
                                      item.label,
                                      cell.play_id,
                                      cell.label,
                                      e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                                    )
                                  }}
                                  />
                              }
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div className="body-row" key={rowIndex}>
                            <div className="option"></div>
                            <div className="lucky-odds"></div>
                            <div className="money"></div>
                          </div>
                        )
                      }

                    })
                  }
                  </div>
                )
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default LuckyGrid
