import React, { Component } from 'react'
import Immutable from 'immutable'

export default class QuickMoneySetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goldList: Immutable.fromJS(props.goldList).toJS(),
      status: props.status
    }
  }
  render() {
    const { closeWin, setting } = this.props
    return(
      <div className="quick-setting-wrap">
        <div className="quick-setting-win">
          <div className="quick-setting-title">
            <span>快捷金额设置</span>
            <i className="iconfont" onClick={e => closeWin()}>&#xe63d;</i>
          </div>
          <div className="quick-setting-content">
            {
              Array.from({length: 5}).map((item, index) =>
                <input key={index}
                  value={this.state.goldList[index] || ''}
                  onChange={e => {
                    let goldList = this.state.goldList
                    goldList[index] = e.target.value.replace(/[^\d{1,}|\d{1,}]|^0{1,}\d{1,}|[,,.]{1,}/g,'')
                    this.setState({goldList: goldList})}
                  }/>
              )
            }
            <div className="status" onClick={e => {
                let status = this.state.status
                if (status === 1) {
                  status = 0
                } else {
                  status = 1
                }
                this.setState({
                  status: status
                })
              }}>
              {
                this.state.status === 1 ? (
                  <i className="iconfont" style={{color: '#34BAF1'}}>&#xe606;</i>
                ) : (
                  <i className="iconfont" style={{color: '#DBDBDB'}}>&#xe605;</i>
                )
              }
              <span>启用</span>
            </div>
          </div>
          <div className="quick-setting-bottom">
            <button className="cancel" onClick={e => closeWin()}>取消</button>
            <button className="confirm"  onClick={e => {
                let goldList = this.state.goldList.filter(n => n !== '' && n !== '0' && n !== 0)
                if (this.state.status === 1 && goldList.length < 1) {
                  this.props.setPopupInfo({
                    type: 'WARN',
                    title: '温馨提示',
                    content: '快捷金额设置不能为空',
                    autoShutDown: '取消',
                    action: {
                      '确定': 'cancel',
                    }
                  })
                } else {
                  setting(goldList, this.state.status)}
                }
              }>
              确定
            </button>
          </div>
        </div>
      </div>
    )
  }
}
