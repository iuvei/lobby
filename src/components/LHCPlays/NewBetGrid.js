import React from 'react'
import { connect } from 'react-redux'
import { SetCurrentBetData, SetShowBetData, setPopupInfo, SetOrderMoney } from '../../redux/actions'
import Immutable from 'immutable'
import { BALLS, NUMS } from '../common/Balls.jsx'
import { getCombinationOfSets, HeXiaoMethod } from '../../helpers/utils'

class NewBetGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuickFill: {},
      betData: [],
      showBetData: {},
    }
    this.TDTitleWidth = 10
    this.ODTitleWidth = 90
  }

  componentWillUpdate(nextProps, nextState) {
    const { lhcBetData } = nextProps
    const { tabIndex, playWay, currentBetData } = lhcBetData
    const { id } = this.props.lhcBetData.playWay
    if (!Immutable.is(Immutable.fromJS(this.props.lhcBetData.tabIndex), Immutable.fromJS(nextProps.lhcBetData.tabIndex)) && id === '52' && nextProps.lhcBetData.playWay.id === '52') {
      if (tabIndex === 0) {
        this.SetHexiaoData(HeXiaoMethod.yeshou, playWay, currentBetData)
      } else if (tabIndex === 1) {
        this.SetHexiaoData(HeXiaoMethod.jiaqin, playWay, currentBetData)
      } else if (tabIndex === 2) {
        this.SetHexiaoData(HeXiaoMethod.dan, playWay, currentBetData)
      } else if (tabIndex === 3) {
        this.SetHexiaoData(HeXiaoMethod.shuang, playWay, currentBetData)
      } else if (tabIndex === 4) {
        this.SetHexiaoData(HeXiaoMethod.qianxiao, playWay, currentBetData)
      } else if (tabIndex === 5) {
        this.SetHexiaoData(HeXiaoMethod.houxiao, playWay, currentBetData)
      } else if (tabIndex === 6) {
        this.SetHexiaoData(HeXiaoMethod.tianxiao, playWay, currentBetData)
      } else if (tabIndex === 7) {
        this.SetHexiaoData(HeXiaoMethod.dixiao, playWay, currentBetData)
      }
    }
  }

  SetHexiaoData = (data, playWay, currentData) => {
    let playId = [], name = [], betData = currentData, maxOdds = [], minOdds = []
    Object.keys(data).map((item, index) => {
      const NumItem = Number(item)-1
      playId.push(playWay.play[0].detail[NumItem].id)
      name.push(playWay.play[0].detail[NumItem].name)
      minOdds.push(playWay.play[0].detail[NumItem].minOdds)
      maxOdds.push(playWay.play[0].detail[NumItem].maxOdds)
      return betData = [{
              playId: playId.join(','),
              number: name.join(','),
              maxOdds,
              minOdds,
            }]
    })
    this.props.SetShowBetData(data)
    this.props.SetCurrentBetData(betData)
  }

  renderTitle(layout, cellStyle) {
    if(!layout.hideTitle){
      return (
        <div className="row title" style={layout.TDTitle ? {backgroundColor: '#FFFCFA', color: '#333333'} : null}>
        {
          layout.TDTitle ? (
            <div className="cell" style={{width: this.TDTitleWidth + '%'}}>
              <div className="td-title">
                {layout.TDTitle[0]}
              </div>
            </div>
          ) : null
        }
        {
          Array.from({length: layout.cols}).map((item, index) =>
            <div className="cell" style={cellStyle} key={index}>
            {
              layout.title.map((item, index) =>
                {
                  let itemStyle = {width: item.width}
                  if (layout.TDTitle) {
                    itemStyle = Object.assign(itemStyle, {color: '#333'})
                  }
                  if (item.type === 'number') {
                    return <div style={itemStyle} key={index}>号码</div>
                  } else if (item.type === 'wx') {
                    return <div style={itemStyle} key={index}>号码</div>
                  } else if (item.type === 'shengXiao') {
                    return <div style={itemStyle} key={index}>号码</div>
                  } else if (item.type === 'checkbox') {
                    return <div style={itemStyle} key={index}>选择</div>
                  }
                  else if (item.type === 'odds' || item.type === 'odds_radio') {
                    return <div style={itemStyle} key={index}>赔率</div>
                  }
                  else if (item.type === 'weishu') {
                    return <div style={itemStyle} key={index}>号码</div>
                  }
                  else if (item.type === 'checkLabel' || item.type === 'odds_radio') {
                    return <div style={itemStyle} key={index}>生肖</div>
                  }
                  else if (item.type === 'checkLabelW' || item.type === 'odds_radio') {
                    return <div style={itemStyle} key={index}>尾数</div>
                  }
                  else if (item.type === 'money') {
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
    if (cell.name === null) {
      return null
    } else {
      const { goldList, data, showBetData } = this.props
      let play_id
      if (data[`${Number(cell.number)-1}`]) {
        play_id = data[`${Number(cell.number)-1}`].id
      } else {
        play_id = null
      }
      return (
        <div onMouseLeave={this.handleMouseLeave.bind(this)}>
          <input name={play_id} key={play_id} min="1"
            onChange={ e => {
              this.handleChange(e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,''), play_id, cell.number)
            }}
            onBlur={ e => this.MoneyCheck(e, cell.number) }
            value={showBetData[cell.number] || ''}
            onClick={this.handleMoney.bind(this, play_id)}/>
          {
            goldList && this.state.showQuickFill[play_id] ? (
              <div className="quick-fill">
              {
                goldList.map((item, index) =>
                  <div key={index} onClick={this.handleMoneySelect.bind(this, item, play_id, cell.number)}>{`${item} 元`}</div>
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

  handleMoneySelect(val, name, number) {
    let showBetData = this.props.showBetData ? Immutable.fromJS(this.props.showBetData).toJS() : {}
    showBetData[`${number}`] = val
    this.props.SetShowBetData(showBetData)
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

  MoneyCheck = (e, number) => {
    this.props.SetOrderMoney(e.target.value)
  }

  handleChange = (value, playId, number) => {
    const { SetShowBetData } = this.props
    let showBetData = this.props.showBetData ? Immutable.fromJS(this.props.showBetData).toJS() : {}
    if (value !== '') {
      showBetData[`${number}`] = value
    } else if (value === ''){
      delete showBetData[`${number}`]
    }
    SetShowBetData(showBetData)
  }

  radioCheck = (playId, number) => {
    let showBetData = this.props.showBetData ?  Immutable.fromJS(this.props.showBetData).toJS() : {}
    let currentBetData = []
    if (Number(number) < 14) {
      for (var i = 1; i < 14; i++) {
        if (i !== number) {
          delete showBetData[i]
        }
      }
    } else if (Number(number) < 27) {
      for (var j = 14; j < 27; j++) {
        if (j !== number) {
          delete showBetData[j]
        }
      }
    } else if (Number(number) < 40) {
      for (var k = 27; k < 40; k++) {
        if (k !== number) {
          delete showBetData[k]
        }
      }
    } else if (Number(number) < 53) {
      for (var l = 40; l < 53; l++) {
        if (l !== number) {
          delete showBetData[l]
        }
      }
    } else if (Number(number) < 66) {
      for (var m = 53; m < 66; m++) {
        if (m !== number) {
          delete showBetData[m]
        }
      }
    } else if (Number(number) < 79) {
      for (var n = 66; n < 79; n++) {
        if (n !== number) {
          delete showBetData[n]
        }
      }
    }
    const { SetShowBetData, SetCurrentBetData, data } = this.props
    let play_id = [], maxOdds = 1, minOdds = 1, name = []
    showBetData[`${number}`] = ''
    Object.keys(showBetData).map((item, index) => {
      name.push(`${data[item-1].groupName}    ${data[item-1].name}`)
      play_id.push(data[item-1].id)
      maxOdds = maxOdds * data[item-1].maxOdds
      minOdds = minOdds * data[item-1].minOdds
      return true
    })
    currentBetData.push({
      playId: play_id.join(','),
      number: name.join(`,`),
      maxOdds,
      minOdds,
    })
    SetShowBetData(showBetData)
    SetCurrentBetData(currentBetData)
  }

  handleClick = (item) => {
    const { lhcBetData, SetShowBetData, SetCurrentBetData, setPopupInfo } = this.props
    const { playWay, tabIndex, size } = lhcBetData
    let showBetData = lhcBetData.showBetData || {}
    if (Object.keys(showBetData).includes(item)) {
      delete showBetData[`${item}`]
    } else {
      showBetData[`${item}`] = ''
    }
    let betData = []
    if (playWay.id === '49') { // 连肖连尾
      if (Object.keys(showBetData).length > 6) {
        delete showBetData[`${item}`]
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '玩法个数2-6',
          action: {
            '确定': 'cancel'
          }
        })
      }
      getCombinationOfSets(Object.keys(showBetData), size).map((item, index) => {
        let maxOdds = [], minOdds = [], number = [], playId = []
        item.map((subItem, subIndex) => {
          maxOdds.push(playWay.play[tabIndex].detail[Number(subItem)-1].maxOdds)
          minOdds.push(playWay.play[tabIndex].detail[Number(subItem)-1].minOdds)
          number.push(playWay.play[tabIndex].detail[Number(subItem)-1].name)
          playId.push(playWay.play[tabIndex].detail[Number(subItem)-1].id)
          return true
        })
        return betData.push({
                playId: playId.join(','),
                number,
                maxOdds,
                minOdds,
              })
      })
    }
    else if (playWay.id === '50' || playWay.id === '56') { // 自选不中 中一
      if (tabIndex < 3 && Object.keys(showBetData).length > 10) {
        delete showBetData[`${item}`]
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '玩法个数最多选择10个',
          action: {
            '确定': 'cancel'
          }
        })
      } else if (tabIndex === 3 && Object.keys(showBetData).length > 11) {
        delete showBetData[`${item}`]
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '玩法个数最多选择11个',
          action: {
            '确定': 'cancel'
          }
        })
      } else if (tabIndex === 4 && Object.keys(showBetData).length > 12) {
        delete showBetData[`${item}`]
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '玩法个数最多选择12个',
          action: {
            '确定': 'cancel'
          }
        })
      } else if ((tabIndex === 6 || tabIndex === 5) && Object.keys(showBetData).length > 13) {
        delete showBetData[`${item}`]
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '玩法个数最多选择13个',
          action: {
            '确定': 'cancel'
          }
        })
      } else if (tabIndex === 7 && Object.keys(showBetData).length > 14) {
        delete showBetData[`${item}`]
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '玩法个数最多选择14个',
          action: {
            '确定': 'cancel'
          }
        })
      }
      getCombinationOfSets(Object.keys(showBetData), size).map((item, index) =>
        betData.push({
          content: item.toString(),
          playId: playWay.play[0].detail[tabIndex].id,
          number: item.toString(),
          maxOdds: playWay.play[0].detail[tabIndex].maxOdds,
          minOdds: playWay.play[0].detail[tabIndex].minOdds,
        }))
    }
    else if (playWay.id === '52') { // 合肖
      let playId = [], name = [], maxOdds = [], minOdds = []
      if (Object.keys(showBetData).length > 11) {
        delete showBetData[`${item}`]
        setPopupInfo({
          type: 'WARN',
          title: '温馨提示',
          content: '玩法生肖个数小于11',
          action: {
            '确定': 'cancel'
          }
        })
      }
      Object.keys(showBetData).map((item, index) => {
        const NumItem = Number(item)
        playId.push(playWay.play[0].detail[NumItem-1].id)
        name.push(playWay.play[0].detail[NumItem-1].name)
        minOdds.push(playWay.play[0].detail[NumItem-1].minOdds)
        maxOdds.push(playWay.play[0].detail[NumItem-1].maxOdds)
        return  betData = [{
                  playId: playId.join(','),
                  number: name.join(','),
                  maxOdds: maxOdds,
                  minOdds: minOdds,
                }]
      })
    }
    SetShowBetData(showBetData)
    SetCurrentBetData(betData)
  }

  renderTbody(layout, data, cellStyle) {
    const { lhcBetData, SliderValue } = this.props
    const { showBetData, playWay } = lhcBetData
    const shengXiao = this.props.currentLottery.newAnimals || {}
    const wuxing = this.props.currentLottery.wuxing || {}
    let cellsLength = layout.cells.length
    let cols = layout.cols
    let rows = (cellsLength % cols) === 0 ? (cellsLength / cols) :  (cellsLength / cols ) + 1
    return (
      Array.from({length: rows}).map((row, rowIndex) =>
        <div key={rowIndex} className="row">
        {
          layout.TDTitle ? (
            <div className="cell" style={{width: this.TDTitleWidth + '%'}}>
              <div className="td-title">
                {layout.TDTitle[rowIndex + 1]}
              </div>
            </div>
          ) : null
        }
        {
          Array.from({length: cols}).map((col, colIndex) =>
            {
              let cell = layout.cells[rowIndex * cols + colIndex]
              return (
                <div key={colIndex} className="cell" style={cellStyle}>
                {
                  layout.title.map((item, index) =>
                    {
                      let oddData = data[`${Number(cell.number)-1}`]
                      if (item.type === 'number') {
                        return (
                          <div className="number" style={{width: item.width}} key={index}>
                            <span style={BALLS[cell.number]} key={index}>{cell.number}</span>
                          </div>
                        )
                      } else if (item.type === 'wx') {
                        return (
                          <div className="wu-xing" style={{width: item.width}} key={index}>
                            <span key={index}>
                              {Object.keys(wuxing).filter(n => wuxing[n] === cell.label).join(', ')}
                            </span>
                          </div>
                        )
                      }
                      else if (item.type === 'checkbox') {
                        return (
                          <div className="checkbox"
                            style={{width: item.width}}
                            key={index}
                            onClick = { e => {
                                this.handleClick(String(cell.number))
                              }}
                            >
                              {
                                cell.number ? <i className={`iconfont ${Object.keys(showBetData).includes(cell.number) ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/> : null
                              }

                          </div>
                        )
                      }
                      else if (item.type === 'checkLabel') {
                        return (
                          <div className="select"
                            style={{width: item.width}}
                            key={index}
                            onClick = { e => {
                                this.handleClick(String(cell.number))
                              }}
                            >
                              <i className={`iconfont ${Object.keys(showBetData).includes(String(cell.number)) ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
                              <span key={index}>{playWay.play[0].detail[cell.number-1].name}</span>
                          </div>
                        )
                      }
                      else if (item.type === 'checkLabelW') {
                        return (
                          <div className="select"
                            style={{width: item.width}}
                            key={index}
                            onClick = { e => {
                                this.handleClick(String(cell.number))
                              }}
                            >
                              <i className={`iconfont ${Object.keys(showBetData).includes(String(cell.number)) ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
                            <span key={index}>{cell.name}</span>
                          </div>
                        )
                      }
                      else if (item.type === 'shengXiao') {
                        return (
                          <div className="numbers" style={{width: item.width}} key={index}>
                              {
                                Object.keys(shengXiao).filter(n => shengXiao[n] === playWay.play[0].detail[cell.number-1].name).map((num, index) =>
                                <div className="num" key={index}>
                                  <span style={Object.keys(showBetData).includes(String(cell.number)) ? BALLS[num] : null}>{num}</span>
                                </div>
                                )
                              }
                          </div>
                        )
                      }
                      else if (item.type === 'weishu') {
                        return (
                          <div className="numbers" style={{width: item.width}} key={index}>
                              {
                                NUMS[cell.name].map((num, index) =>
                                <div className="num" key={index}>
                                  <span style={Object.keys(showBetData).includes(String(cell.number)) ? BALLS[num] : null}>{ num }</span>
                                </div>
                                )
                              }
                          </div>
                        )
                      }
                      else if (item.type === 'odds') {
                        if (cell.number && oddData) {
                          return (
                            <div className={`odds ${Object.keys(showBetData).includes(cell.number) && 'item-selected'}`} style={{width: item.width}} key={index}>
                              <span>{parseFloat(Number(oddData.maxOdds-(oddData.maxOdds-oddData.minOdds)*SliderValue/100).toFixed(3))}</span>
                            </div>
                          )
                        } else {
                          return (
                            <div style={{width: item.width}} key={index}>
                              <span></span>
                            </div>
                          )
                        }
                      }
                      else if (item.type === 'money') {
                        if (cell.number) {
                          return (
                            <div className={`money ${Object.keys(showBetData).includes(cell.number) && 'item-selected'}`} style={{width: item.width}} key={index}>
                              {this.renderIn(cell)}
                            </div>
                          )
                        } else {
                          return (
                            <div style={{width: item.width}} key={index}>
                            </div>
                          )
                        }
                      }
                      else if (item.type === 'label') {
                        return <div className="label" style={{width: item.width}} key={index}>{cell.label}</div>
                      }
                      else if (item.type === 'balls') {
                        return (
                          <div className="balls" style={{width: item.width}} key={index}>
                          {
                            cell.balls.map((ball, index) =>
                              <span style={BALLS[ball]} key={index}>{ball}</span>
                            )
                          }
                          </div>
                        )
                      }
                      else if (item.type === 'odds_radio') {
                        return (
                          <div className="odds" style={{width: item.width}} key={index}>
                            <span>{parseFloat(Number(oddData.maxOdds-(oddData.maxOdds-oddData.minOdds)*SliderValue/100).toFixed(3))}</span>
                          </div>
                        )
                      }
                      else if (item.type === 'radio') {
                        let play_id
                        if (data[`${Number(cell.number)-1}`]) {
                          play_id = data[`${Number(cell.number)-1}`].id
                        } else {
                          play_id = null
                        }
                        return (
                          <div className="radio" style={{width: item.width}} key={index}
                            onClick={e => {
                              this.radioCheck(play_id, cell.number)
                            }}>
                            <i className={`iconfont ${Object.keys(showBetData).includes(cell.number) ? 'icon-radio-check' : 'icon-radio-uncheck'}`}/>
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

  render() {
    const { data } = this.props
    const layout = Immutable.fromJS(this.props.layout.items[0]).toJS()
    let cellWidth = this.getWidth(layout.cols, layout.TDTitle)
    let cellStyle = {
      width: cellWidth
    }
    return (
      <div className="bet-grid">
        {
          layout.mainTitle ? <div className="row title main-title">{layout.mainTitle}</div> : null
        }
        {
          layout.totleTitle ? (
            <div className="row title totle-title">
              <div style={{width: this.TDTitleWidth + '%'}}></div>
              {
                layout.totleTitle.map((title, index) =>
                  <div key={index} style={cellStyle}>{title}</div>
                )
              }
            </div>
          ) : null
        }
        {
          layout.title ? this.renderTitle(layout, cellStyle) : null
        }
        {
          this.renderTbody(layout, data, cellStyle)
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { layout, lhcBetData, currentLottery } = state
  return {
    layout,
    currentLottery,
    lhcBetData,
    showBetData: lhcBetData.showBetData,
    currentBetData: lhcBetData.currentBetData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetCurrentBetData: (betData) => {
      dispatch(SetCurrentBetData(betData))
    },
    SetShowBetData: (betData) => {
      dispatch(SetShowBetData(betData))
    },
    setPopupInfo: (betData) => {
      dispatch(setPopupInfo(betData))
    },
    SetOrderMoney: (value) => {
      dispatch(SetOrderMoney(value))
    },
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NewBetGrid);
