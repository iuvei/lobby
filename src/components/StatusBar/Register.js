import React, { Component } from 'react'
import uuid from 'node-uuid'
import { fetchUtil } from '../../helpers/utils'
import { matchUserName, matchPassword, matchPhoneNum, matchEmail } from '../../helpers/string'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      invitationcode: '',
      userName: '',
      pwd: '',
      confirmPwd: '',
      verfyCode: '',
      verfyCodeImg: `/Base/verify/${uuid.v4()}`,
      protocol: true,
      regExtend: {},
      email: '',
      phoneNum: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    fetchUtil({act: 508}).then(res => {
      if (res) {
        this.setState({
          regExtend: res.reg_extend
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  handleClick() {
    let { invitationcode, userName, pwd, confirmPwd, verfyCode, protocol, email, phoneNum, regExtend } = this.state
    console.log(invitationcode, userName, pwd, confirmPwd, verfyCode, protocol, email, phoneNum, regExtend);
    let msg = ''
    if (!userName) {
      msg = '用户名不能为空！'
    } else if (!pwd) {
      msg = '密码不能为空！'
    } else if (!confirmPwd) {
      msg = '密码确认不能为空！'
    } else if (!verfyCode) {
      msg = '验证码不能为空！'
    } else if (pwd !== confirmPwd) {
      msg = '密码和确认密码不相同！'
    } else if (!protocol) {
      msg = '请同意服务协议'
    } else if (!matchUserName(userName)) {
      msg = '用户名长度为6-16之间，只能由字母、数字或者下划线组成!'
    } else if (!matchPassword(pwd)) {
      msg = '密码长度为6-12个字符之间,至少要有1个字母及数字!'
    } else if (regExtend.need_mobile === 1 && !phoneNum) {
      msg = '手机号码不能为空!'
    } else if (phoneNum && !matchPhoneNum(phoneNum)) {
      msg = '手机号码格式不正确!'
    } else if (regExtend.need_email === 1 && !email) {
      msg = '电子邮件不能为空!'
    } else if (email && !matchEmail(email)) {
      msg = '电子邮件格式不正确!'
    } else if (regExtend.need_reg_code === 1 && !invitationcode) {
      msg = '推荐人ID必填!'
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
      // console.log(111111);
      this.props.register({
        invitationcode, userName, pwd, confirmPwd, verfyCode, phoneNum, email
      }, () => {
        this.setState({
          verfyCodeImg: `/Base/verify/${uuid.v4()}`
        })
      })
    }

  }

/*eslint-disable */
  render() {
    const { close } = this.props
    const  { regExtend } = this.state
    let checkedProtocol = 'icon-checkbox-uncheck'
    if (this.state.protocol) {
      checkedProtocol = 'icon-checkbox-check'
    }
    return(
      <div className="register-wrap">
        <div className="register-win">
          <div className="register-top">
            <span>会员注册</span>
            <i className="iconfont" onClick={e => close()}>&#xe63d;</i>
          </div>
          <div className="register-content" onKeyDown={e => {
              if (e.key === 'Enter') {
                this.handleClick()
              }
            }}>
            {
              regExtend.need_reg_code && (
                <div className="form-row">
                  <label className="label">
                    {
                      regExtend.need_reg_code === 1 && (<b>*</b>)
                    }
                    推荐人ID
                  </label>
                  <div className="typeCt">
                    <input
                      placeholder={`请输入推荐人ID（${regExtend.need_reg_code === 1 ? '必填' : '选填'}）`}
                      value={this.state.invitationcode}
                      onChange={e => {this.setState({ invitationcode: e.target.value })}}/>
                  </div>
                </div>
              )
            }
            <div className="form-row">
              <label className="label"><b>*</b>用户名</label>
              <div className="typeCt">
                <input placeholder="请输入用户名" value={this.state.userName}
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
            {
              regExtend.need_mobile && (
                <div className="form-row">
                  <label className="label">
                    {
                      regExtend.need_mobile === 1 && (<b>*</b>)
                    }
                    手机号码
                  </label>
                  <div className="typeCt">
                    <input placeholder="请输入手机号码" value={this.state.phoneNum} type="text"
                      onChange={e => {this.setState({ phoneNum: e.target.value })}}/>
                  </div>
                </div>
              )
            }
            {
              regExtend.need_email && (
                <div className="form-row">
                  <label className="label">
                    {
                      regExtend.need_email === 1 && (<b>*</b>)
                    }
                    电子邮箱
                  </label>
                  <div className="typeCt">
                    <input placeholder="请输入电子邮箱" value={this.state.email} type="text"
                      onChange={e => {this.setState({ email: e.target.value })}}/>
                  </div>
                </div>
              )
            }
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
                  })}}>我已经满合法博彩年龄，且同意各项开户条约，</label>
                <a href="javascript:;" onClick={e=>{
                  window.open('/Base/regAgreement.html','_reg_xieyi','width=1040,height=653').focus()
                }} width="1000" height="653">“开户协议”</a>
              </div>
            </div>
            <div className="form-row">
              <label className="label"></label>
              <div className="typeCt">
                <button onClick={e => { this.handleClick() }}>立即注册</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
/*eslint-disable */
}
