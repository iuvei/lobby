import React, { Component } from 'react'
import uuid from 'node-uuid'
import { fetchUtil } from '../../helpers/utils'

export default class FreeTrial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '生成账号中...',
      pwd: '',
      confirmPwd: '',
      verfyCode: '',
      verfyCodeImg: '/Base/verify',
      protocol: true
    }
    this.remarks = [
      '每个试玩帐号初始金额为2000RMB，不允许充值。',
      '每个IP每天仅允许有3个试玩帐号。每个试玩帐号从注册开始,有效时间为72小时超过时间系统自动收回。',
      '试玩帐号仅供玩家熟悉游戏，不允许充值提款。',
      '试玩帐号不享有参加优惠活动的权利。',
      '试玩帐号的赔率仅供参考，可能与正式帐号赔率不相符。'
    ]
  }

  componentWillMount() {
    fetchUtil({act: 212})
    .then((res) => {
      if (res.status === 0) {
        this.setState({
          userName: res.user_name
        })
      }
    })
  }

  handleClick() {
    let { userName, pwd, confirmPwd, verfyCode, protocol } = this.state
    let msg = ''
    if (!pwd) {
      msg = '密码不能为空！'
    } else if (!confirmPwd) {
      msg = '密码确认不能为空！'
    } else if (!verfyCode) {
      msg = '验证码不能为空！'
    } else if (pwd !== confirmPwd) {
      msg = '密码和确认密码不相同！'
    } else if (!protocol) {
      msg = '请同意服务协议'
    }
    if (msg) {
      let info = {
        type: 'WARN',
        title: '温馨提示',
        content: msg,
        action: {
          '确定': 'cancel'
        }
      }
      this.props.setPopupInfo(info)
    } else {
      this.props.registerFreeTrial(userName, pwd, confirmPwd, verfyCode, () => {
        this.setState({
          verfyCodeImg: `/Base/verify/${uuid.v4()}`
        })
      })
    }

  }

/*eslint-disable */

  render() {
    const { close } =this.props
    let checkedProtocol = 'icon-checkbox-uncheck'
    if (this.state.protocol) {
      checkedProtocol = 'icon-checkbox-check'
    }
    return(
      <div className="register-wrap">
        <div className="register-win">
          <div className="register-top">
            <span>免费试玩</span>
            <i className="iconfont" onClick={e => close()}>&#xe63d;</i>
          </div>
          <div className="register-content" onKeyDown={e => {
              if (e.key === 'Enter') {
                this.handleClick()
              }
            }}>
            <div className="form-row">
              <label className="label">试玩账号</label>
              <div className="typeCt">
                <input className="trialName" value={this.state.userName} readOnly
                  onChange={e => {this.setState({ userName: e.target.value })}}/>
              </div>
            </div>
            <div className="form-row">
              <label className="label"><b>*</b>登录密码</label>
              <div className="typeCt">
                <input placeholder="请输入登录密码" value={this.state.pwd} type="password"
                  onChange={e => {this.setState({ pwd: e.target.value })}}/>
              </div>
            </div>
            <div className="form-row">
              <label className="label"><b>*</b>确认密码</label>
              <div className="typeCt">
                <input placeholder="请确认密码" value={this.state.confirmPwd} type="password"
                  onChange={e => {this.setState({ confirmPwd: e.target.value })}}/>
              </div>
            </div>
            <div className="form-row">
              <label className="label"><b>*</b>验证码</label>
              <div className="typeCt">
                <input className="verfyCodeInput"
                  placeholder="请输入验证码"
                  value={this.state.verfyCode}
                  onChange={e => {this.setState({ verfyCode: e.target.value })}}/>
                <img
                  alt=''
                  className="verfyCode"
                  src={this.state.verfyCodeImg}
                  onClick={e => {
                    e.target.src = `/Base/verify/${uuid.v4()}`
                }}/>
              </div>
            </div>
            <div className="form-row">
              <label className="label"></label>
              <div className="typeCt">
                <i className={`iconfont ${checkedProtocol} protocol`} onClick={e => {
                  this.setState({
                    protocol: !this.state.protocol
                  })}}>
                </i>
                <label onClick={e => {
                  this.setState({
                    protocol: !this.state.protocol
                  })}}>我已经满合法博彩年龄，且同意各项开户条约，
                </label>

                <a href="javascript:;"
                   onClick={e=>{
                     window.open('/Base/regAgreement.html','_reg_xieyi','width=1040,height=653').focus()
                   }} width="1000" height="653">“开户协议”
                 </a>
              </div>
            </div>
            <div className="form-row fn">
              <label className="label"></label>
              <div className="typeCt">
                <button onClick={e => this.handleClick()}>立即注册</button>
              </div>
            </div>
            <div className="remarks">
              <div className="remarks-title">
                备注：
              </div>
              <div className="remarks-list">
              {
                this.remarks.map((item, index) =>
                  <div className="remarks-item" key={index}>
                    <span className="item-index">{`${index + 1}.`}</span>
                    <span className="item-content">{item}</span>
                  </div>
                )
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

/*eslint-disable */
}
