import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPopupInfo, getUserInfo } from '../../redux/actions/index'
import '../../styles/scss/pcdd.scss'
import PCDDGrid from '../../components/PCDD/PCDDGrid'
import PCDDResult from '../../components/PCDD/PCDDResult'
import { COLOR } from '../../components/PCDD/PCDDColor'
import { Scrollbars } from 'react-custom-scrollbars'

class PCDD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      betResult: [],
      selectedItems: [],
      isShowSelectList: false,
      baoSan1: 0,
      baoSan2: 1,
      baoSan3: 2
    }
    this.handleChange = this.handleChange.bind(this)
    this.delItem = this.delItem.bind(this)
    this.delAll = this.delAll.bind(this)
    this.addOrder = this.addOrder.bind(this)
    this.handleSelectClick = this.handleSelectClick.bind(this)
    this.handleBaoSanSelect = this.handleBaoSanSelect.bind(this)
  }

  handleChange(typeName, playId, num, money) {
    let selectedItems = this.state.selectedItems
    if (money && money !== 0) {
      let isExist = false
      selectedItems.map(n => {
        if (n.playId === playId) {
          isExist = true
          n.money = money
        }
        return n
      })
      if (!isExist) {
        selectedItems.unshift({typeName, playId, num, money})
      }
    } else {
      if (selectedItems.findIndex(n => n.playId === playId) !== -1) {
        selectedItems.splice(selectedItems.findIndex(n => n.playId === playId), 1)
      }
    }

    this.setState({
      selectedItems
    })
  }

  delItem(index) {
    let betResult = this.state.betResult
    betResult.splice(index, 1)
    this.setState({
      betResult
    })
  }

  delAll() {
    const betResult = this.state.betResult
    if (betResult && betResult.length > 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '是否要删除全部注单？',
        action: {
          '取消': 'cancel',
          '确定': 'callBack'
        },
        callBack: () => {
          this.setState({
            betResult: []
          })
        }
      }
      this.props.setPopupInfo(info)
    }
  }

  handleSelectClick(curBaoSan, listLeft) {
    this.setState({
      isShowSelectList: true,
      curBaoSan,
      listLeft
    })
  }

  handleBaoSanSelect(item) {
    let { curBaoSan, baoSan1, baoSan2, baoSan3 } = this.state
    let isDoubleSelected = false
    if (curBaoSan === 'baoSan1') {
      if (item === baoSan2 || item === baoSan3) {
        isDoubleSelected = true
      }
    } else if (curBaoSan === 'baoSan2') {
      if (item === baoSan1 || item === baoSan3) {
        isDoubleSelected = true
      }
    } else if (curBaoSan === 'baoSan3') {
      if (item === baoSan1 || item === baoSan2) {
        isDoubleSelected = true
      }
    }

    if (isDoubleSelected) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '请重新选择号码（不可出现相同号码）',
        action: {
          '确定': 'cancel'
        }
      }
      this.props.setPopupInfo(info)
    } else {
      this.setState({
        [curBaoSan]: item,
        isShowSelectList: false
      })
    }

  }

  addOrder() {
    const { selectedItems, betResult } = this.state
    if (selectedItems && selectedItems.length <= 0) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: '您未选择任何号码',
        action: {
          '确定': 'cancel'
        }
      }
      this.props.setPopupInfo(info)
    } else {
      this.setState({
        betResult: selectedItems.concat(betResult),
        selectedItems: []
      })
    }

  }

  render() {
    const { data, lotteryId, currentIssue, setPopupInfo, getUserInfo } = this.props
    let selectedItems = this.state.selectedItems
    let baoSanMoney = ''
    if (selectedItems && selectedItems.length > 0) {
      let curRes = selectedItems.filter(n => n.playId === '203')
      if (curRes.length > 0) {
        baoSanMoney = curRes[0].money
      }
    }
    return(
      <div className="lucky-28">
        <PCDDGrid
          moneyChange={this.handleChange}
          selectedItems={selectedItems}
          data={[{label: data['36'].type_name, cols: 4, rows: 7, cells: data['36'].detail}]}
          />
        <div className="bao-san">
          <div className="label">{data['40'].type_name}</div>
          <div className="bs-odds">{data['40'].detail[0].odds}</div>
          <div className="bs-content" onMouseLeave={e => {this.setState({isShowSelectList: false})}}>
            <div className="item" onClick={e => {this.handleSelectClick('baoSan1', '0px')}}>
              <div className="num" style={COLOR[161 + this.state.baoSan1]}>
                {this.state.baoSan1}
              </div>
              <i className="iconfont">&#xe791;</i>
            </div>
            <div className="item" onClick={e => {this.handleSelectClick('baoSan2', '98px')}}>
              <div className="num" style={COLOR[161 + this.state.baoSan2]}>
                {this.state.baoSan2}
              </div>
              <i className="iconfont">&#xe791;</i>
            </div>
            <div className="item" onClick={e => {this.handleSelectClick('baoSan3', '196px')}}>
              <div className="num" style={COLOR[161 + this.state.baoSan3]}>
                {this.state.baoSan3}
              </div>
              <i className="iconfont">&#xe791;</i>
            </div>
            {
              this.state.isShowSelectList && (
                <div className="select-list" style={{left: this.state.listLeft}}>
                  <Scrollbars autoHide={false} style={{ flex: 1, width: '100%' }}>
                  {
                    Array.from({length: 28}).map((item, index) => {
                      return (
                        <div key={index}
                          className="select-list-item"
                          onClick={e => {this.handleBaoSanSelect(index)}}>
                          <div style={COLOR[161 + index]}>{index}</div>
                        </div>
                      )
                    })
                  }
                  </Scrollbars>
                </div>
              )
            }

          </div>
          <div className="bs-money">
            <span>下注金额：</span>
            <input
              maxLength={6}
              value={baoSanMoney}
              onChange={e => {
                this.handleChange(
                  '特码包三',
                  '203',
                  `${this.state.baoSan1}, ${this.state.baoSan2}, ${this.state.baoSan3}`,
                  e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                )
              }}/>
            <span>元</span>
          </div>
        </div>
        <PCDDGrid
          moneyChange={this.handleChange}
          selectedItems={selectedItems}
          data={[
            {label: data['37'].type_name, cols: 2, rows: 5, cells: data['37'].detail},
            {label: data['38'].type_name, cols: 1, rows: 5, cells: data['38'].detail},
            {label: data['39'].type_name, cols: 1, rows: 5, cells: data['39'].detail}
          ]}
          />
        <PCDDResult
          addOrder={this.addOrder}
          delItem={this.delItem}
          delAll={() => {
            this.setState({
              betResult: []
            })
          }}
          data={this.state.betResult}
          lotteryId={lotteryId}
          currentIssue={currentIssue}
          setPopupInfo={setPopupInfo}
          getUserInfo={getUserInfo}
          />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPopupInfo: (info) => {
      dispatch(setPopupInfo(info))
    },
    getUserInfo: () => {
      dispatch(getUserInfo())
    }
  }
}
export default connect(state => {return {}}, mapDispatchToProps)(PCDD)
