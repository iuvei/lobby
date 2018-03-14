import React from 'react'
import uuid from 'node-uuid'
import Register from '../../components/StatusBar/Register'
import FreeTrial from '../../components/StatusBar/FreeTrial'

export default class StatusBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd:'',
      verfyCode: '',
      verfyCodeImg: '/Base/verify',
      showRegisterWin: false,
      showFreeTrialWin: false
    }
    this.isGuest = false
    this.intervalUserInfo = -1
  }

  componentWillMount() {
    this.props.getUserInfo()
  }

  componentWillUnmount() {
    clearInterval(this.intervalUserInfo)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo && nextProps.userInfo.userName) {
      if (this.intervalUserInfo === -1) {
        this.intervalUserInfo = setInterval(() => {
          nextProps.getUserInfo()
        }, 60000)
      }
      this.setState({
        showRegisterWin: false,
        showFreeTrialWin: false
      })
    } else {
      clearInterval(this.intervalUserInfo)
    }
  }

  winJump(url, winName) {
    // Utils.getWin().open(url, winName)
    window.open(url, 'new_window', 'width=1270px, height=950px', true).focus()
  }

  loginCallBack(status) {
    if (status === 9000007) {
      this.setState({
        verfyCodeImg: `/Base/verify/${uuid.v4()}`
      })
    }
  }

  render() {
    const { userInfo, userLogin, logout, setPopupInfo, register, registerFreeTrial, getUserInfo } = this.props
    if (userInfo && userInfo.userName) {
      if (userInfo.userName.indexOf('Guest') !== -1) {
        this.isGuest = true
      }
    }
    return (
      <div className="status-bar">
        <div className="left">
          {
            userInfo && userInfo.userName ? (
              <div className="landed">
                <div className="user-info">
                  <span>
                    您好，
                    {userInfo.userName}
                    &nbsp;&nbsp;
                    可用余额
                    <span>
                      {`¥${userInfo.accountBalance}`}
                    </span>
                    <i className="iconfont refresh" onClick={e => {getUserInfo()}}>&#xe657;</i>
                  </span>
                </div>
                <div onClick={e => { this.winJump('/User/index.html', '安全中心') }}>会员中心</div>
                {
                  !this.isGuest && (
                    <div className="recharge"  onClick={e => { this.winJump('/Finance/index.html', '充值')}}>充值</div>
                  )
                }
                {
                  !this.isGuest && (
                    <div onClick={e => { this.winJump('/Finance/withdraw.html', '提现')}}>提现</div>
                  )
                }
                <div onClick={e => { this.winJump('/Log/bettingRecord.html', '投注记录')}}>投注记录</div>
                <div onClick={e => { logout() }}>退出</div>
              </div>
            ) : (
              <div className="login" onKeyDown={e => {
                  if (e.key === 'Enter') {
                    userLogin(this.state.userName, this.state.pwd, this.state.verfyCode, this.loginCallBack.bind(this))
                  }
                }}>
                <div className="input-group">
                  <div className="icon-wrap">
                    <i className="iconfont" style={{fontSize: '26px', paddingTop: '2px'}}>&#xe612;</i>
                  </div>
                  <input
                    name="userName"
                    value={this.state.userName}
                    placeholder="请输入用户名"
                    onChange={(e) => {
                      this.setState({
                        userName: e.target.value
                      })
                    }}/>
                </div>
                <div className="input-group">
                  <div className="icon-wrap">
                    <i className="iconfont" style={{fontSize: '22px', paddingTop: '1px'}}>&#xe680;</i>
                  </div>
                  <input
                    name="pwd"
                    value={this.state.pwd}
                    type="password"
                    placeholder="请输入密码"
                    onChange={(e) => {
                      this.setState({
                        pwd: e.target.value
                      })
                    }}/>
                </div>
                <div className="verfy-code">
                  <img
                    alt=''
                    src={this.state.verfyCodeImg}
                    onClick={e => {
                      this.setState({
                        verfyCodeImg: `/Base/verify/${uuid.v4()}`
                      })
                    }}/>
                  <input
                    name="verfyCode"
                    value={this.state.verfyCode}
                    maxLength="4"
                    onChange={(e) => {
                      this.setState({
                        verfyCode: e.target.value
                      })
                    }}/>
                </div>
                <button
                  onClick={e => {
                    userLogin(this.state.userName, this.state.pwd, this.state.verfyCode, this.loginCallBack.bind(this))
                  }}>
                  登录
                </button>
                <button onClick={e => {
                    this.setState({
                      showRegisterWin: true
                    })
                  }}>
                  注册
                </button>
                <button onClick={e => {
                    this.setState({
                      showFreeTrialWin: true
                    })
                  }}>
                  免费试玩
                </button>
              </div>
            )
          }
        </div>
        <div className="right" onClick={e => {
            window.open('/#phone', 'home', null, true).focus()
          }}>
          <i className="iconfont" style={{color: '#696969', fontSize: '25px', paddingBottom: '5px'}}>&#xe65a;</i>
          <i className="iconfont" style={{color: '#696969', fontSize: '25px'}}>&#xe600;</i>
          <span>
            手机app下载
          </span>
        </div>
        {
          this.state.showRegisterWin ? (
            <Register
              close={this.closeRegisterWin.bind(this)}
              setPopupInfo={setPopupInfo}
              register={register}/>
          ) : null
        }
        {
          this.state.showFreeTrialWin ? (
            <FreeTrial
              close={this.closeFreeTrialWin.bind(this)}
              setPopupInfo={setPopupInfo}
              registerFreeTrial={registerFreeTrial}/>
          ) : null
        }
      </div>
    )
  }
  closeRegisterWin() {
    this.setState({
      showRegisterWin: false
    })
  }
  closeFreeTrialWin() {
    this.setState({
      showFreeTrialWin: false
    })
  }
}
