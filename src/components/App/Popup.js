import React, { Component } from 'react'


export default class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cd: 5
    }
    this.isSpollingCD = false
  }

  componentWillMount() {
    if (this.props.info.autoShutDown && !this.isSpollingCD) {
      this.intervalCD = setInterval(this.countdown.bind(this), 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalCD)
  }

  countdown() {
    const { info, action } = this.props
    let cd = this.state.cd - 1
    if (cd < 0) {
      action(info.action[info.autoShutDown], info.callBack)
      clearInterval(this.intervalCD)
      return false
    }
    this.setState({
      cd: cd
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.info !== this.props.info || this.state.cd !== nextState.cd) {
      return true
    }
    return false
  }

  render() {
    const { info, action } = this.props
    let iconType = ''
    if (info.type === 'SUCCESS') {
      iconType = 'success'
    } else if (info.type === 'ERROR') {
      iconType = 'error'
    } else if (info.type === 'WARN') {
      iconType = 'warn'
    }
    return (
      <div className="popup">
        <div className="win">
          <div className="title">
            <span>{info.title}</span>
            <i className="iconfont"
              onClick={ e => action(info.cancel || 'cancel', info.callBack)}>
              &#xe63d;
            </i>
          </div>
          <div className="content">
            <i className={`iconfont icon-${iconType}`}/>
            <span>{info.content}</span>
          </div>
          <div className="action">
            {
              Object.keys(info.action).map((item, index) =>
                <button key={index} onClick={ e => {
                    action(info.action[item], info.callBack)
                    if (this.props.info.callBack) {
                      this.props.info.callBack()
                    }
                  }}>
                  {
                    info.autoShutDown && item === info.autoShutDown ? `${item} (${this.state.cd})` : item
                  }
                </button>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
