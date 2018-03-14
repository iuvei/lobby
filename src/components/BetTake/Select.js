import React, { Component } from 'react'
import Immutable from 'immutable'

class Select extends Component {
  constructor(props) {
    super(props)
    this.cols = 16
  }



  handleClick(action, val, label, event) {
    const { orderInfo, data} = this.props;
    let selected = {}, arr = [];

    if (orderInfo && orderInfo.selected && Object.keys(orderInfo.selected).length > 0) {
      selected = orderInfo.selected;
      arr = selected[label] || [];
    } else {
      for (let item of data) {
        selected[item.label] = [];
      }
    }
    if (!action) {
      let playId = String(orderInfo.playId)

      if (playId === '99') {
        if (selected[label].includes(val)) {
          arr = []
        } else {
          arr = ['111', '222', '333', '444', '555', '666']
        }
      } else if (playId === '100') {
        if (selected[label].includes(val)) {
          arr = []
        } else {
          arr = ['123', '234', '345', '456']
        }
      } else if (['2044', '2043', '2042', '2040', '2041'].includes(playId)) {
        arr = [val]
      }  else {
        if (arr.includes(val)) {
          arr.splice(arr.indexOf(val), 1);
        } else {
          arr.push(val);
        }

        if (playId === '92') {
          if (label === '胆码') {
            arr = []
            arr.push(val)
            if (selected['拖码'].includes(val)) {
              selected['拖码'].splice(selected['拖码'].indexOf(val), 1)
            }
          }
          if (label === '拖码' && selected['胆码'].includes(val)) {
            selected['胆码'].splice(selected['胆码'].indexOf(val), 1)
          }
        }
      }

      if (playId === '93') {
        if (label === '二同号') {
          arr = []
          arr.push(val)
          if (selected['不同号'].includes(val)) {
            selected['不同号'].splice(selected['不同号'].indexOf(val), 1)
          }
        }
        if (label === '不同号' && selected['二同号'].includes(val)) {
          selected['二同号'].splice(selected['二同号'].indexOf(val), 1)
        }
      }

    } else {
      arr = val
    }

    selected[label] = arr
    this.props.selected(selected)
  }

  /**
   * 判断内容是否是大于1个字的中文或者大于两个字的数字
   * @param  {String}  val [展示内容]
   * @return {Boolean}
   */
  verifySpecialContent = (val) => {
    let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
    if (val.length > 2 || (reg.test(val) && val.length >= 2)) {
      return true
    } else {
      return false
    }
  }

  adaptiveLayout(currentOdds) {
    const { data, orderInfo } = this.props
    const isSpecialContent = this.verifySpecialContent(data[0]['content'][0].toString())
    if (isSpecialContent) {
      this.cols = 13
    } else {
      this.cols = 16
    }
    return (
      data.map((item, index) => {
        let rows = Math.ceil(item.content.length / this.cols);
        return (
          Array.from({length: rows}).map((row, rowIndex) =>
            <div key={rowIndex}>
              <div className="select-row" key={rowIndex}>
                {
                  item.label ? (
                    <div className="unit" style={rowIndex > 0 ? {visibility: 'hidden'} : null}>
                      {item.label}
                    </div>
                  ) : null
                }
                <div className="items">
                {
                  item.content.map((cell, index) => {
                    let cellIndex = this.cols * rowIndex + index;
                    if (item.content[cellIndex] != null && cellIndex < this.cols * (rowIndex + 1)) {
                      let ct = item.content[cellIndex]
                      let isChinese = new RegExp('[\\u4E00-\\u9FFF]+', 'g').test(ct)
                      let val = item.values ? item.values[cellIndex] : ct
                      let ballClass = ''
                      if (isSpecialContent) {
                        ballClass += 'wrap'
                      }
                      if (orderInfo.selected && orderInfo.selected[item.label] && orderInfo.selected[item.label].includes(val)) {
                        ballClass += ' active'
                      }
                      return (
                        <div key={index} onClick={this.handleClick.bind(this, null, val, item.label)} className={ballClass} style={isChinese ? {fontSize: '18px'} : null}>
                          {ct}
                        </div>
                      )
                    } else {
                      return null
                    }
                  })
                }
                </div>
                {
                  item.tools ? (
                    <div className="select-tools">
                      <span onClick={this.handleClick.bind(this, 'quan',
                        item.content.filter( f =>
                          f != null
                        ),
                        item.label)}>全</span>
                      <span onClick={this.handleClick.bind(this, 'da',
                        item.content.filter( f =>
                          item.content.indexOf(f) >= item.content.length / 2
                        ),
                        item.label)}>大</span>
                      <span onClick={this.handleClick.bind(this, 'xiao',
                        item.content.filter( f =>
                          item.content.indexOf(f) < item.content.length / 2
                        ),
                        item.label)}>小</span>
                      <span onClick={this.handleClick.bind(this, 'dan',
                        item.content.filter( f =>
                          (f % 2) !== 0
                        ),
                        item.label)}>单</span>
                      <span onClick={this.handleClick.bind(this, 'shuang',
                        item.content.filter( f =>
                          (f % 2) === 0
                        ),
                        item.label)}>双</span>
                      <span onClick={this.handleClick.bind(this, 'qing', [], item.label)}>清</span>
                    </div>
                  ) : null
                }
              </div>
              {
                orderInfo && (orderInfo.playId === '101' || orderInfo.playId === '205' || orderInfo.playId === '2034') ? (
                  <div className="current-odds" style={orderInfo.playId === '2034' ? {paddingLeft: '103px'} : null}>
                  {
                    currentOdds && currentOdds.length > 0 && (
                      currentOdds.map((item, index) => {
                        let cellIndex = this.cols * rowIndex + index
                        let ct = currentOdds[cellIndex]
                        if (ct && cellIndex < this.cols * (rowIndex + 1)) {
                          return (
                            <div key={index} style={orderInfo.playId === '2034' ? {marginLeft: '21px'} : null}>{ct}</div>
                          )
                        } else {
                          return null
                        }
                      })
                    )
                  }
                  </div>
                ) : null
              }
            </div>
          )

        )
      })
    )
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (!Immutable.is(nextProps.data, this.props.data)
      || !Immutable.is(nextProps.orderInfo.selected, this.props.orderInfo.selected)
      || ((nextProps.orderInfo.playId === '101' || nextProps.orderInfo.playId === '205' || nextProps.orderInfo.playId === '2034') && nextProps.orderInfo.currentOdds && Array.isArray(nextProps.orderInfo.currentOdds))) {
      return true
    }

    return false
  }

  render() {
    const { orderInfo, currentMethod } = this.props
    let currentOdds = []
    if (orderInfo.playId === '101') {
      if (Array.isArray(orderInfo.currentOdds)) {
        currentOdds = Immutable.fromJS(orderInfo.currentOdds).toJS().concat(Immutable.fromJS(orderInfo.currentOdds).toJS().reverse())
      } else {
        let curOdds = currentMethod.max_odds.split(',')
        currentOdds = Immutable.fromJS(curOdds).toJS().concat(Immutable.fromJS(curOdds).toJS().reverse())
      }
    } else if (orderInfo.playId === '205' || orderInfo.playId === '2034') {
      if (Array.isArray(orderInfo.currentOdds)) {
        currentOdds = Immutable.fromJS(orderInfo.currentOdds).toJS()
      } else {
        let curOdds = currentMethod.max_odds.split(',')
        currentOdds = Immutable.fromJS(curOdds).toJS()
      }
    }

    return(
      <div className="select animated bounceInRight">
      {
        this.adaptiveLayout(currentOdds)
      }
      </div>
    )
  }
}

export default Select;
