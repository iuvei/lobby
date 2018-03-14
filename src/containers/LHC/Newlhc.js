import React, { Component } from 'react'
import '../../styles/scss/newlhc.scss'
import layoutNew from '../../components/lhc/layoutNew.js'
import NewlhcBetArea from '../LHCBetArea/NewlhcBetArea'
import { layoutSet, oddSet, SetPlayWay, SetTabIndex, SetCurrentBetData, setAnimals,
  SetShowBetData, SetBetData } from '../../redux/actions'
import { connect } from 'react-redux'
import { fetchUtil } from '../../helpers/utils'

class Newlhc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabshow: false,
      playWay: props.typeList[1],
      playWayChild: null,
      selectedPW: props.typeList[1].name,
      hexiaoIndex: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lhcBetData.OrderConfirm !== nextProps.lhcBetData.OrderConfirm) {
      this.setState({hexiaoIndex: null})
    }
  }

  componentWillMount() {
    this.props.layoutSet(layoutNew[1])
  }

  componentDidMount() {
    fetchUtil({act: 206, lottery_id: this.props.currentLottery.lotteryId})
    .then(res => {
      if (res.config) {
        this.props.setAnimals(res.config)
      }
    })
  }

  SetHexiaoIndex = (index) => {
    this.setState({ hexiaoIndex: index })
  }

  handleClick = (playWay, index) => {
    const { SetPlayWay, SetTabIndex, layoutSet, oddSet, SetCurrentBetData, SetShowBetData } = this.props
    this.setState({
      playWay,
      selectedPW: playWay.name,
      hexiaoIndex: null
    })
    SetCurrentBetData([])
    SetShowBetData({})
    SetPlayWay(playWay)
    if (playWay.id === '52') {
      SetTabIndex(null)
    } else {
      SetTabIndex(0)
    }
    oddSet()
    layoutNew.map((item, layoutIndex) => {
      if (String(playWay.id) === String(item.id) && !layoutNew[layoutIndex].tabs) {
        this.setState({tabshow:false})
        layoutSet(layoutNew[layoutIndex])
      } else if (String(playWay.id) === String(item.id) && layoutNew[layoutIndex].tabs) {
        this.setState({
          tabshow:true,
          playWayChild: layoutNew[layoutIndex]
        })
        layoutSet(layoutNew[layoutIndex].tabs[0])
      }
      return true
    })
  }

  render() {
    const { selectedPW, playWay, tabshow, playWayChild } = this.state
    return(
      <div>
        <div className="lhc-new animated shake">
          {
            this.props.typeList.map((playWay, index) =>
              <div key={index} onClick={()=>this.handleClick(playWay, index)}
                className={playWay.name === selectedPW ? 'play-selected' : 'false'}>
                {playWay.name}
              </div>
            )
          }
        </div>

        <NewlhcBetArea
          playWay={playWay}
          tabshow={tabshow}
          hexiaoIndex={this.state.hexiaoIndex}
          SetHexiaoIndex={this.SetHexiaoIndex}
          playWayChild={playWayChild} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { layout, lhcBetData, currentLottery } = state
  return {
    layout,
    lhcBetData,
    currentLottery,
    typeList: currentLottery.typeList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    layoutSet: (layout) => {
      dispatch(layoutSet(layout))
    },
    oddSet: (odd) => {
      dispatch(oddSet(odd))
    },
    SetPlayWay: (playWay) => {
      dispatch(SetPlayWay(playWay))
    },
    SetTabIndex: (tabIndex) => {
      dispatch(SetTabIndex(tabIndex))
    },
    SetBetData: (BetData) => {
      dispatch(SetBetData(BetData))
    },
    SetCurrentBetData: (CurrentBetData) => {
      dispatch(SetCurrentBetData(CurrentBetData))
    },
    SetShowBetData: (ShowBetData) => {
      dispatch(SetShowBetData(ShowBetData))
    },
    setAnimals: (value) => {
      dispatch(setAnimals(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Newlhc)
