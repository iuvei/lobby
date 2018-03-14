import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  initLhcPlan,
  modifyPlanMultiple,
  initAdvancedPlanOne,
  initAdvancedPlanTwo,
  setWinStop, handlePlanChecked
} from '../../redux/actions/index'
import { Scrollbars } from 'react-custom-scrollbars'

class BetChase extends Component {
  constructor(props) {
    super(props)
    this.selectedAllIssue = true
    this.selectedIssue = {}
    this.chaseMode = 'normal'
    this.state = {
      issueCount: 10,
      multiple: 1,
      advancedMode: 'double',
      startIssue: 0, //开始期数
      advancedIssueCount: 10,  //追号期数
      startMultiple: 1, //开始倍数
      interval: 2, //每隔期数
      intervalMultiple: 2, //倍数
      beforeChase: 5, //前几期
      afterMultiple: 3, //之后倍数
      doubleChaseCase: 1 //翻倍追号方案
    }
    for (let i = 1; i <= this.state.issueCount; i++) {
      this.selectedIssue[i] = true
    }
  }

  componentWillMount() {
    this.props.handleInitPlan(this.state.issueCount, this.state.multiple)
  }

  handleIssueCount(count) {
    const { handleInitPlan } = this.props
    for (let i = 1; i <= count; i++) {
      this.selectedIssue[i] = true
    }
    this.selectedAllIssue = true
    handleInitPlan(count, this.state.multiple)
    this.setState({
      issueCount: count
    })
  }

  handleSelectIssuce(index) {
    const { handlePlanChecked } = this.props
    let checked = !this.selectedIssue[index]
    this.selectedIssue[index] = checked
    handlePlanChecked(index - 1, checked)
  }

  handleAllIssue() {
    const { handleInitPlan } = this.props;
    let checked = !this.selectedAllIssue
    this.selectedAllIssue = checked
    if (checked === true && this.chaseMode !== 'normal') {
      this.handleGeneratePlan()
    } else {
      if (this.chaseMode === 'normal') {
        for (let i = 1; i <= this.state.issueCount; i++) {
          this.selectedIssue[i] = checked
        }
        handleInitPlan(Number(this.state.issueCount), checked ? this.state.multiple : 0)
      } else {
        for (let i = 1; i <= this.state.advancedIssueCount; i++) {
          this.selectedIssue[i] = checked
        }
        handleInitPlan(Number(this.state.advancedIssueCount), checked ? this.state.multiple : 0)
      }
    }
  }

  handleChaseMode(mode) {
    const { handleInitPlan } = this.props
    this.chaseMode = mode
    if (mode === 'normal') {
      handleInitPlan(this.state.issueCount, this.state.multiple)
    } else {
      handleInitPlan(0, 0)
    }
  }

  handleAdvancedChaseMode(mode) {
    this.setState({
      advancedMode: mode
    })
  }

  handleGeneratePlan = (event) => {
    const { handleInitAdvancedPlanOne, handleInitAdvancedPlanTwo } = this.props
    if (this.state.doubleChaseCase === 1) {
      handleInitAdvancedPlanOne(this.state.startIssue, this.state.advancedIssueCount,
        this.state.startMultiple, this.state.interval, this.state.intervalMultiple)
    } else {
      handleInitAdvancedPlanTwo(this.state.startIssue, this.state.advancedIssueCount,
        this.state.startMultiple, this.state.beforeChase, this.state.afterMultiple)
    }
    if (this.chaseMode === 'normal') {
      for (let i = 1; i <= this.state.issueCount; i++) {
        this.selectedIssue[i] = true
      }
    } else {
      for (let i = 1; i <= this.state.advancedIssueCount; i++) {
        this.selectedIssue[i] = true
      }
    }
    this.selectedAllIssue = true
  }

  handleAdvancedIssueCount(event) {
    let value = event.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
    if (value > 100) {
      value = 100
    }
    for (let i = 1; i <= value; i++) {
      this.selectedIssue[i] = true
    }
    this.setState({
      advancedIssueCount: value
    })
  }

  render() {
    const { planList, handleInitPlan, handlePlanMultiple, issueList, lhcBetData, setWinStop } = this.props
    if (lhcBetData.betData.length <= 0) {
      return null
    }

    return(
      <div className="chase-number">
        <div className="chase-ntable">
          <div className="ct-header">
            <div className="h-label">
              <div className="chase-tabs">
                <div className="tab" onClick={this.handleChaseMode.bind(this, 'normal')}
                  style={this.chaseMode === 'normal' ?
                    {backgroundColor: '#fff', borderRight: '1px solid #F4E9DE'} : null}>
                  普通追号
                </div>
                <div className="tab" onClick={this.handleChaseMode.bind(this, 'advanced')}
                  style={this.chaseMode === 'advanced' ?
                    {backgroundColor: '#fff', borderRight: '1px solid #F4E9DE', borderLeft: '1px solid #F4E9DE'} : null}>
                  高级追号
                </div>
              </div>
              <div className="h-control" onClick={e => setWinStop(!lhcBetData.WinStop)}>
                <i className={`iconfont ${lhcBetData.WinStop ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
                <span>中奖后停止追号</span>
              </div>
            </div>
            <div className="normal-chase"
              style={this.chaseMode === 'normal' ? {display: 'flex'} : {display: 'none'}}>
              <span>连续追：</span>
              <div className="issue-list">
                <div className={this.state.issueCount === 5 ? 'issue-activity' : null}
                  onClick={this.handleIssueCount.bind(this, 5)}>5期</div>
                <div className={this.state.issueCount === 10 ? 'issue-activity' : null}
                  onClick={this.handleIssueCount.bind(this, 10)}>10期</div>
                <div className={this.state.issueCount === 15 ? 'issue-activity' : null}
                  onClick={this.handleIssueCount.bind(this, 15)}>15期</div>
                <div className={this.state.issueCount === 20 ? 'issue-activity' : null}
                  onClick={this.handleIssueCount.bind(this, 20)}>20期</div>
              </div>
              <input
                type="text"
                value={this.state.issueCount}
                onChange={ e => {
                  let value = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                  if (value > 100) {
                    value = 100
                  }
                  this.handleIssueCount(value)
                }}/>
              &nbsp;&nbsp;
              <span>期</span>
              <span style={{marginLeft: '50px'}}>倍数：</span>
                <input type="text" value={this.state.multiple}
                  onChange={ e => {
                    let value = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                    if (value > 100) {
                      value = 100
                    }
                    handleInitPlan(this.state.issueCount, value)
                    this.setState({
                      multiple: value
                    })
                  }}/>
            </div>
            <div className="advanced-chase"
              style={this.chaseMode === 'advanced' ? {display: 'flex'} : {display: 'none'}}>
              <div className="query-conditions">
                <div className="query-title">
                  基本参数
                </div>
                <div className="basic-query">
                  <div>
                    <span>
                      起始期号：
                    </span>
                    <select className="start-issue" value={this.state.startIssue}
                      onChange={ e => {
                        this.setState({
                          startIssue: e.target.value
                        })
                      }}>
                      {
                        issueList.map((item, index) =>
                          <option value={index} key={index}>{item.issue_no}</option>
                        )
                      }
                    </select>
                  </div>
                  <div>
                    <span>
                      追号期数：
                    </span>
                    <input className="text-input" maxLength="3" value={this.state.advancedIssueCount}
                      onChange={this.handleAdvancedIssueCount.bind(this)}/>
                    <span>期</span>
                  </div>
                  <div>
                    <span>
                      起始倍数：
                    </span>
                    <input className="text-input" maxLength="3" value={this.state.startMultiple}
                      onChange={ e => {
                        let value = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                        this.setState({
                          startMultiple: value
                        })
                      }}/>
                    <span>倍</span>
                  </div>
                </div>
                <div className="query-title">
                  高级参数
                </div>
                <div className="advanced-query">
                  <div className="advanced-label">
                    <div className="label-list">
                      <div style={this.state.advancedMode === 'double' ?
                        {backgroundColor: '#fff', borderRight: '1px solid #F4E9DE'} : null}
                        onClick={this.handleAdvancedChaseMode.bind(this, 'double')}>
                        翻倍追号
                      </div>
                    </div>
                  </div>
                  <div className="advanced-content">
                    <div className="crow">
                      <i onClick={e => {this.setState({doubleChaseCase: 1})}}
                        className={`iconfont ${this.state.doubleChaseCase === 1 ? 'icon-radio-check' : 'icon-radio-uncheck'}`}/>
                      <span>每隔</span>
                      <input className="text-input" style={{marginLeft: '5px'}} maxLength="3"
                        value={this.state.interval} onChange={ e => {
                          let value = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                          this.setState({
                            interval: value
                          })
                        }}/>
                      <span>期 倍数x</span>
                      <input className="text-input" style={{marginLeft: '5px'}} maxLength="3"
                        value={this.state.intervalMultiple} onChange={ e => {
                          let value = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                          this.setState({
                            intervalMultiple: value
                          })
                        }}/>
                    </div>
                    <div className="crow">
                      <i onClick={e => {this.setState({doubleChaseCase: 2})}}
                          className={`iconfont ${this.state.doubleChaseCase === 2 ? 'icon-radio-check' : 'icon-radio-uncheck'}`}/>
                      <span>前</span>
                      <input className="text-input" style={{marginLeft: '5px'}} maxLength="3"
                        value={this.state.beforeChase} onChange={ e => {
                          let value = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                          this.setState({
                            beforeChase: value
                          })
                        }}/>
                      <span>期 倍数=起始倍数，之后倍数=</span>
                      <input className="text-input" style={{marginLeft: '5px'}} maxLength="3"
                        value={this.state.afterMultiple} onChange={ e => {
                          let value = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                          this.setState({
                            afterMultiple: value
                          })
                        }}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="generate">
                <button onClick={this.handleGeneratePlan.bind(this)}>生成追号计划</button>
              </div>
            </div>
          </div>
          <div className="ct-body">
            <div className="theader">
              <div className="ct-index">序号</div>
              <div className="ct-issue" onClick={e => {this.handleAllIssue()}}>
                <i className={`iconfont ${this.selectedAllIssue ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
                <span>追号期次</span>
              </div>
              <div className="ct-multiple">倍数</div>
              <div className="ct-amount">金额</div>
              <div className="expected-time">预计开奖时间</div>
            </div>
            <div className="tbody">
              <Scrollbars autoHide={true} style={{ flex: 1, width: '100%' }}>
              {
                planList.map((plan ,index) => {
                  const planMoney = (plan.multiple * lhcBetData.totalCost).toFixed(2)
                  return (
                    <div className="trow" key={index}>
                      <div className="ct-index">{index + 1}</div>
                      <div className="ct-issue" onClick={e => {this.handleSelectIssuce(index + 1)}}>
                        <i className={`iconfont ${this.selectedIssue[index + 1] ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
                        <span>{plan.issue_no}</span>
                      </div>
                      <div className="ct-multiple">
                      <input value={plan.checked === false ? 0 : plan.multiple} maxLength="4"
                        readOnly={!this.selectedIssue[index + 1]}
                        onChange={e => {
                          let value = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                          handlePlanMultiple(index, value)
                        }}/>
                      </div>
                      <div className="ct-amount">
                        {plan.checked === false ? 0 : planMoney} 元
                      </div>
                      <div className="expected-time">{plan.end_time}</div>
                    </div>
                  )
                })
              }
              </Scrollbars>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { orderList, planList, issueList, lhcBetData } = state
  return {
    orderList,
    planList,
    issueList,
    lhcBetData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setWinStop: (WinStop) => {
      dispatch(setWinStop(WinStop))
    },
    handlePlanChecked: (index, checked) => {
      dispatch(handlePlanChecked(index, checked))
    },
    handleInitPlan: (issueCount, multiple) => {
      dispatch(initLhcPlan(issueCount, multiple))
    },
    handlePlanMultiple: (index, multiple) => {
      dispatch(modifyPlanMultiple(index, multiple))
    },
    handleInitAdvancedPlanOne: (startIssue, issueCount, startMultiple, interval, intervalMultiple) => {
      dispatch(initAdvancedPlanOne(startIssue, issueCount, startMultiple, interval, intervalMultiple))
    },
    handleInitAdvancedPlanTwo: (startIssue, issueCount, startMultiple, beforeChase, afterMultiple) => {
      dispatch(initAdvancedPlanTwo(startIssue, issueCount, startMultiple, beforeChase, afterMultiple))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetChase)
