import React from 'react'
import { connect } from 'react-redux'
import { SetBetData } from '../../redux/actions'
import Immutable from 'immutable'
import NewBetGrid from '../../components/LHCPlays/NewBetGrid'
import LianMa from '../LHCPlayLianMA/newLianMA.jsx'
import LhcChase from '../../components/BetArea/LhcChase.jsx'
import OrderList from '../../components/common/OrderList.jsx'

class NewLhcPlays extends React.Component {

  constructor(props){
  	super(props);
  	this.state = {
      getData: [],
      SliderValue: 0
    };
  }

  setMoney = (getData) => {
    this.setState({
      getData
    })
  }

  SetSliderValue = (value) => {
    this.setState({ SliderValue: value })
  }

  render() {
    const { lhcBetData, goldList, status } = this.props
    const { tabIndex, playWay, chaseState } = lhcBetData
    let oddData = []
    if (playWay.id === '48') {
      return <LianMa
              SetSliderValue={(value)=>this.SetSliderValue(value)}
              playWay={playWay} data={oddData}
              goldList={status === 1 ? goldList : null}/>
    } else if (playWay.id === '45' || playWay.id === '46' || playWay.id === '47') {
      playWay.play.map((item, index) => {
        item.detail.map((subItem, index) =>
          subItem.groupName = item.groupName
        )
        return oddData = [...oddData, ...item.detail]
      })
    } else if (playWay.id === '44' || playWay.id === '42' || playWay.id === '43' || playWay.id === '56') {
      oddData = Immutable.fromJS(playWay.play[0].detail).toJS()
    } else if (playWay.id === '55' || playWay.id === '49' || playWay.id === '51' || playWay.id === '54' || playWay.id === '53') {
      oddData = Immutable.fromJS(playWay.play[tabIndex].detail).toJS()
    }
      return (
        <div>
          {
            Array.from({length:1}).map(
            (item, index) =>
            <NewBetGrid
              SliderValue={this.state.SliderValue}
              data={oddData}
              setMoney={this.setMoney}
              key={index}
              goldList={status === 1 ? goldList : null} />)
          }
          <OrderList
            SetSliderValue={(value)=>this.SetSliderValue(value)}
            SliderValue={this.state.SliderValue}
            data={oddData}
            getData={this.state.getData}/>
          {
            chaseState ? <LhcChase/> : null
          }
        </div>
      )
    }

}

const mapStateToProps = (state) => {
  const { layout, lhcBetData } = state
  return {
    layout,
    lhcBetData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    SetBetData: (layout) => {
      dispatch(SetBetData(layout))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLhcPlays)
