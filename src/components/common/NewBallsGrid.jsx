import React from 'react'
import { connect } from 'react-redux'
import { SetBetData, SetShowBetData, SetCurrentBetData, setPopupInfo } from '../../redux/actions'
import { BALLS } from './Balls.jsx'
import { getCombinationOfSets, zhengfuhao } from '../../helpers/utils'

class BallsGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  renderHeader(titles, cols, cellStyle) {
    if(titles != null ){
      return (
        <div className="row title">
        {
          Array.from({length: cols}).map((item, index) =>
            <div className="cell" style={cellStyle} key={index}>
              <div className="number" style={{width: '50%', color: '#333'}}>{titles[0]}</div>
            <div className="checkbox" style={{width: '50%', color: '#333'}}>{titles[1]}</div>
            </div>
          )
        }
        </div>
      )
    } else {
      return null
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  renderIn(num) {
    const { lhcBetData } = this.props
    if(!num){
      return null
    } else {
      let showBetData = lhcBetData.showBetData || []
      return <i className={`iconfont ${Object.keys(showBetData).includes(num) ? 'icon-checkbox-check' : 'icon-checkbox-uncheck'}`}/>
    }
  }

  getWidth(cols) {
    let num = 1 / cols
    return (num * 100).toFixed(3) + '%'
  }

  handleClick = (num) => {
    const { lhcBetData, SetShowBetData, SetCurrentBetData } = this.props
    const { playWay, tabIndex, size } = lhcBetData
    let showBetData = lhcBetData.showBetData || {}
    if (Object.keys(showBetData).includes(num)) {
      delete showBetData[`${num}`]
    } else if (!Object.keys(showBetData).includes(num)) {
      showBetData[`${num}`] = num
    }
    if (Object.keys(showBetData).filter(n=>!!Number(n) === true).length > 10) {
      delete showBetData[`${num}`]
      this.props.setPopupInfo({
        type: 'WARN',
        title: '温馨提示',
        content: `连码个数不超过10个`,
        autoShutDown: '取消',
        action: {
          '确定': 'cancel',
        }
      })
    }
    let betData = []
    getCombinationOfSets(Object.keys(showBetData), size).map((item, index) =>
      betData.push({
        content: item.toString(),
        number: item.toString(),
        playId: playWay.play[0].detail[tabIndex].id,
      }))
    SetShowBetData(showBetData)
    SetCurrentBetData(betData)
    this.props.handleSelect(num)
  }

  render() {
    var cellWidth = this.getWidth(zhengfuhao.cols)
    var cellStyle = {
      width: cellWidth
    }
    return (
      <div className="balls-grid">
      {
        this.renderHeader(zhengfuhao.title, zhengfuhao.cols, cellStyle)
      }
      {
        zhengfuhao.rows.map((row, index) =>
          <div key={index} className="row">
          {
            row.map((num, index) =>
              <div key={index} className="cell" style={cellStyle}>
                <div className="number" style={{width: '50%'}}>
                  <span style={BALLS[num]}>{num}</span>
                </div>
                <div className="checkbox" style={{width: '50%'}} onClick={e => {
                    this.handleClick(num)
                  }}>
                  {this.renderIn(num)}
                </div>
              </div>
            )
          }
          </div>
        )
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { lhcBetData } = state
  return {
    lhcBetData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetBetData: (layout) => {
      dispatch(SetBetData(layout))
    },
    SetShowBetData: (showBetData) => {
      dispatch(SetShowBetData(showBetData))
    },
    SetCurrentBetData: (currentBetData) => {
      dispatch(SetCurrentBetData(currentBetData))
    },
    setPopupInfo: (value) => {
      dispatch(setPopupInfo(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BallsGrid)
