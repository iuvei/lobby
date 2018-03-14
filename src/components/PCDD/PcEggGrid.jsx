import React, { Component } from 'react'
import { COLOR } from '../../helpers/pcEgg'

class PcEggGrid extends Component {
  render() {
    const { data, moneyChange, SliderValue, showBetData } = this.props
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
                        const odds = (cell.maxOdds-(cell.maxOdds-cell.minOdds)*SliderValue/100).toFixed(2)
                        let labelStyle = Object.assign({}, COLOR[cell.name])
                        labelStyle['width'] = '54px'
                        labelStyle['borderRadius'] = '24px'
                        let money = ''
                        if (showBetData[cell.id]) {
                          money = showBetData[cell.id].money
                        }
                        return (
                          <div className="body-row" key={rowIndex}>
                            <div className="option">
                              <div style={labelStyle} >{cell.name}</div>
                            </div>
                            <div className="lucky-odds">
                              <span>{odds}</span>
                            </div>
                            <div className="money">
                              {
                                <input
                                  name={cell.label}
                                  maxLength={6}
                                  value={money}
                                  onChange={e => {
                                    moneyChange(
                                      cell.id,
                                      cell.maxOdds,
                                      cell.minOdds,
                                      cell.name,
                                      cell.stakeBetMaxMoney,
                                      cell.stakeBetMinMoney,
                                      e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,''),
                                      item.label
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

export default PcEggGrid
