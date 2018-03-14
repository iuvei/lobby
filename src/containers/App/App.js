import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Menu from '../../components/App/Menu'
import StatusBar from '../StatusBar/StatusBar'
import Popup from '../../components/App/Popup'
import { popupAction, setPopupInfo, getUserInfo, userLogin, logout, register, registerFreeTrial } from '../../redux/actions/index'
import { fetchUtil } from '../../helpers/utils'
import Spinner from '../../components/common/Spinner'
import { Scrollbars } from 'react-custom-scrollbars'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainLogo: ''
    }
  }

  componentWillMount() {
    fetchUtil({act: 304})
    .then((res) => {
      if (res) {
        this.setState({
          mainLogo: res.logo
        })
      }
    })
  }

  render(){
    const { userInfo, popupInfo, handlePopupAction, setPopupInfo,
      userLogin, getUserInfo, sysInfo, logout, register, registerFreeTrial } = this.props

    return (
      <div className="app-wrap">
        <div className="top">
          <div className="logo" onClick={e => {
              window.open('/', 'home', null, true).focus()
            }}>
            <img src={this.state.mainLogo} alt="LOGO" style={{width: '227px', height: '68px'}}/>
          </div>
          <StatusBar
            userInfo={userInfo}
            getUserInfo={getUserInfo}
            userLogin={userLogin}
            logout={logout}
            register={register}
            registerFreeTrial={registerFreeTrial}
            setPopupInfo={setPopupInfo}/>
        </div>
        <div className="main">
          <Menu lotteryId={this.props.match.params.lotteryId}/>
          <div className="content">
            <div className="notice">
              <i className="iconfont">&#xe60f;</i>
            <span>Hi, 欢迎来到彩票大厅</span>
            </div>
            <Scrollbars style={{ flex: 1, width: '100%' }} autoHide={true}>
              {this.props.children}
            </Scrollbars>
          </div>
        </div>
        {
          popupInfo &&  popupInfo.type ? (
            <Popup info={popupInfo} action={handlePopupAction}/>
          ) : null
        }
        {
          sysInfo && sysInfo.showLoading ? (<Spinner />) : null
        }
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  const { popupInfo, userInfo, sysInfo } = state
  return {
    popupInfo,
    userInfo,
    sysInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getUserInfo: () => {
      dispatch(getUserInfo())
    },
    handlePopupAction: (action, callBack) => {
      dispatch(popupAction(action, callBack))
    },
    setPopupInfo: (info) => {
      dispatch(setPopupInfo(info))
    },
    userLogin: (userName, pwd, verfyCode, callBack) => {
      dispatch(userLogin(userName, pwd, verfyCode, callBack))
    },
    logout: () => {
      dispatch(logout())
    },
    register: (data, callBack) => {
      dispatch(register(data, callBack))
    },
    registerFreeTrial: (userName, pwd, confirmPwd, verfyCode, callBack) => {
      dispatch(registerFreeTrial(userName, pwd, confirmPwd, verfyCode, callBack))
    }

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
