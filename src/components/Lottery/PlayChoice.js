import React from 'react'


export default class PlayChoice extends React.Component {
  render() {
    const { data, switchPlay, switchMethod, currentPlayId } = this.props
    if (!currentPlayId) {
      return null
    } else {
      return (
        <div className="play-choice animated shake">
          <div className="play-list">
          {
            data.map((item, index) =>
              <div
                key={index}
                className={item.selected ? "play-activity" : null}
                onClick={() => switchPlay(index) }>
                {item.label}
              </div>
            )
          }
          </div>
          <div className="method-list">
          {
            data.filter(pw => pw.selected)[0].detail.map((item, index) =>
              <div className="method-row" key={index}>
                <div className="group-label">{item.label}</div>
                {
                  item.method.map((method, index) =>
                    <div className="radio-group" key={index} onClick={e => switchMethod(method)}>
                      <i className={`iconfont ${method.play_id === currentPlayId ? 'icon-radio-check' : 'icon-radio-uncheck'}`}/>
                      <span>{method.label}</span>
                    </div>
                  )
                }
              </div>
            )
          }
          </div>
        </div>
      )
    }

  }
}
